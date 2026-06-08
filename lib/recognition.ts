// Machine recognition.
//
// Uses Gemini Flash (vision) to identify the gym machine in a photo, constrained
// to our local catalog so it can only return real machine keys. If no Gemini API
// key is configured, falls back to a local stub so the scan flow stays interactive
// in development. The MatchResult shape is what the rest of the app consumes, so
// swapping providers (or moving the call behind a server proxy) is a one-file change.

import { getFunctions, httpsCallable } from 'firebase/functions';
import { allMachines, getMachine, keyForName, MACHINES } from '../constants/machines';
import { isFreeWeight } from '../constants/catalog';
import { geminiApiKey, geminiModel, useRecognitionProxy } from './firebaseConfig';
import { app } from './firebase';

export type Match = { key: string; confidence: number };
export type MatchResult = {
  top: Match;
  alternatives: Match[];
};

/** A captured/picked, downscaled image ready to send for recognition. */
export type ScanImage = { base64: string; mime: string };

/** Thrown when the server-side daily scan limit has been reached. */
export class ScanLimitError extends Error {
  constructor() { super('scan-limit'); this.name = 'ScanLimitError'; }
}

const keyConfigured = () => !!geminiApiKey && !geminiApiKey.startsWith('REPLACE');

export async function analyzePhoto(image?: ScanImage): Promise<MatchResult> {
  // Preferred: secure Cloud Function proxy (key hidden, limit enforced server-side).
  if (image && useRecognitionProxy) {
    return recognizeViaProxy(image);
  }
  // Dev/testing: call Gemini directly with a client key.
  if (image && keyConfigured()) {
    try {
      return await geminiRecognize(image);
    } catch {
      return stubResult();
    }
  }
  return stubResult();
}

// ---- Cloud Function proxy --------------------------------------------------

async function recognizeViaProxy(image: ScanImage): Promise<MatchResult> {
  try {
    const fn = httpsCallable(getFunctions(app), 'recognizeMachine');
    const catalog = scannableCatalog().map(m => ({ key: m.key, name: m.name }));
    const res = await fn({ image: image.base64, mime: image.mime, catalog });
    const data = res.data as MatchResult;
    if (!data?.top?.key || !MACHINES[data.top.key]) throw new Error('bad result');
    return data;
  } catch (e: any) {
    if (e?.code === 'functions/resource-exhausted' || e?.code === 'resource-exhausted') {
      throw new ScanLimitError();
    }
    // Other failures (network/parse) — degrade to stub rather than blocking.
    return stubResult();
  }
}

// ---- Gemini Flash ----------------------------------------------------------

function scannableCatalog() {
  return allMachines().filter(m => !isFreeWeight(m));
}

async function geminiRecognize(image: ScanImage): Promise<MatchResult> {
  const catalog = scannableCatalog();
  const list = catalog.map(m => `${m.key}: ${m.name}`).join('\n');

  const prompt =
    `You identify gym equipment from a photo. Choose the single best match and up to ` +
    `2 alternatives from THIS list only (use the exact key on the left):\n\n${list}\n\n` +
    `Respond with JSON: {"top":{"key":"<key>","confidence":<0-100>},` +
    `"alternatives":[{"key":"<key>","confidence":<0-100>}]}. ` +
    `confidence is how sure you are. If unsure, still pick the closest and use a low confidence.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: image.mime, data: image.base64 } }] }],
      generationConfig: { temperature: 0, responseMimeType: 'application/json' },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  const parsed = JSON.parse(text);

  const valid = (k: unknown): k is string => typeof k === 'string' && !!MACHINES[k];
  const clamp = (n: unknown) => Math.max(1, Math.min(100, Math.round(Number(n) || 0)));

  if (!valid(parsed?.top?.key)) throw new Error('No valid top match');

  const topKey = parsed.top.key as string;
  const alts: Match[] = Array.isArray(parsed.alternatives)
    ? parsed.alternatives
        .filter((a: any) => valid(a?.key) && a.key !== topKey)
        .slice(0, 2)
        .map((a: any) => ({ key: a.key, confidence: clamp(a.confidence) }))
    : [];

  return { top: { key: topKey, confidence: clamp(parsed.top.confidence) }, alternatives: alts };
}

// ---- Local stub (no API key / fallback) ------------------------------------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function stubResult(): MatchResult {
  const keys = scannableCatalog().map(m => m.key);
  const topKey = pick(keys);
  const topMachine = getMachine(topKey);

  const altKeys = topMachine.alts.map(a => keyForName(a.n)).filter(k => k !== topKey);
  const seen = new Set<string>([topKey]);
  const alternatives: Match[] = [];
  for (const k of altKeys) {
    if (seen.has(k)) continue;
    seen.add(k);
    alternatives.push({ key: k, confidence: 60 + Math.floor(Math.random() * 20) });
    if (alternatives.length >= 2) break;
  }
  while (alternatives.length < 2) {
    const k = pick(keys);
    if (seen.has(k)) continue;
    seen.add(k);
    alternatives.push({ key: k, confidence: 55 + Math.floor(Math.random() * 20) });
  }

  const lowConfidence = Math.random() < 0.25;
  const topConfidence = lowConfidence ? 55 + Math.floor(Math.random() * 14) : 88 + Math.floor(Math.random() * 11);
  return { top: { key: topKey, confidence: topConfidence }, alternatives };
}
