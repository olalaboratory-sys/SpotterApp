import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// Set with: firebase functions:secrets:set GEMINI_API_KEY
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');
const MODEL = 'gemini-2.0-flash';

const FREE_DAILY = 10;
const PREMIUM_DAILY = 100;

type CatalogItem = { key: string; name: string };
type Match = { key: string; confidence: number };
type MatchResult = { top: Match; alternatives: Match[] };
type NotMachine = { notMachine: true };

/**
 * Identifies a gym machine from a photo using Gemini Flash. The API key lives
 * only here (a secret), the caller must be signed in, and the daily scan cap is
 * enforced server-side per user — so the key can't be abused and the cap can't
 * be bypassed by tampering with the app.
 */
export const recognizeMachine = onCall(
  { secrets: [GEMINI_API_KEY], cors: true, enforceAppCheck: false },
  async (req): Promise<MatchResult | NotMachine> => {
    const uid = req.auth?.uid;
    if (!uid) throw new HttpsError('unauthenticated', 'Please sign in to scan.');

    const image = req.data?.image as string | undefined;
    const mime = (req.data?.mime as string | undefined) ?? 'image/jpeg';
    const catalog = (req.data?.catalog as CatalogItem[] | undefined) ?? [];
    if (!image) throw new HttpsError('invalid-argument', 'Missing image.');
    if (!catalog.length) throw new HttpsError('invalid-argument', 'Missing catalog.');

    // Limit depends on subscription status (active = paid → higher cap).
    const userSnap = await db.doc(`users/${uid}`).get();
    const status = (userSnap.get('subscriptionStatus') as string) ?? 'none';
    const limit = status === 'active' ? PREMIUM_DAILY : FREE_DAILY;

    // Authoritative per-user daily counter.
    const today = new Date().toISOString().slice(0, 10);
    const usageRef = db.doc(`users/${uid}/scanUsage/${today}`);
    const allowed = await db.runTransaction(async (tx) => {
      const snap = await tx.get(usageRef);
      const count = (snap.exists ? (snap.get('count') as number) : 0) ?? 0;
      if (count >= limit) return false;
      tx.set(usageRef, { count: count + 1, updatedAt: admin.firestore.FieldValue.serverTimestamp() }, { merge: true });
      return true;
    });
    if (!allowed) {
      throw new HttpsError('resource-exhausted', `Daily scan limit (${limit}) reached.`);
    }

    const keySet = new Set(catalog.map((c) => c.key));
    const list = catalog.map((c) => `${c.key}: ${c.name}`).join('\n');
    const prompt =
      `You identify gym equipment from a photo. First decide whether the main subject ` +
      `is a piece of gym or exercise equipment (a machine, rack, bench, cable station, ` +
      `or free weight). If it is NOT gym equipment — for example a person, food, an ` +
      `animal, a random household object, scenery, or an empty room — respond with ` +
      `exactly {"isMachine": false}. Otherwise choose the single best match and up to ` +
      `2 alternatives from THIS list only (use the exact key on the left):\n\n${list}\n\n` +
      `Respond with JSON: {"isMachine": true, "top":{"key":"<key>","confidence":<0-100>},` +
      `"alternatives":[{"key":"<key>","confidence":<0-100>}]}. ` +
      `If unsure which machine it is, still pick the closest and use a low confidence.`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY.value()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mime, data: image } }] }],
        generationConfig: { temperature: 0, responseMimeType: 'application/json' },
      }),
    });
    if (!res.ok) throw new HttpsError('internal', `Recognition failed (${res.status}).`);

    const data = (await res.json()) as any;
    const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new HttpsError('internal', 'Could not read recognition result.');
    }

    // The subject isn't gym equipment — tell the app so it can nudge the user.
    if (parsed?.isMachine === false) return { notMachine: true };

    const clamp = (n: unknown) => Math.max(1, Math.min(100, Math.round(Number(n) || 0)));
    const valid = (k: unknown): k is string => typeof k === 'string' && keySet.has(k);
    if (!valid(parsed?.top?.key)) throw new HttpsError('internal', 'No valid match.');

    const topKey = parsed.top.key as string;
    const alternatives: Match[] = Array.isArray(parsed.alternatives)
      ? parsed.alternatives
          .filter((a: any) => valid(a?.key) && a.key !== topKey)
          .slice(0, 2)
          .map((a: any) => ({ key: a.key as string, confidence: clamp(a.confidence) }))
      : [];

    return { top: { key: topKey, confidence: clamp(parsed.top.confidence) }, alternatives };
  },
);
