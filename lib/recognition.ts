// Machine recognition — abstraction layer.
//
// Today this is a STUB that returns plausible matches from the local catalog so
// the scan flow is fully interactive. When the hosted vision API is ready,
// replace the body of `analyzePhoto` with a real request (send the image, get
// back machine ids + confidences, discard the photo server-side) — the shape of
// MatchResult is what the rest of the app already consumes.

import { allMachines, getMachine, keyForName } from '../constants/machines';
import { isFreeWeight } from '../constants/catalog';

export type Match = { key: string; confidence: number };
export type MatchResult = {
  top: Match;
  alternatives: Match[];
};

// Machines (not free weights) make for believable "scanned" results.
function scannableKeys(): string[] {
  return allMachines().filter(m => !isFreeWeight(m)).map(m => m.key);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Analyze a captured/uploaded photo and return the most likely machine plus a
 * couple of alternates. `uri` is accepted for API-compatibility with the real
 * implementation; the stub ignores it.
 */
export async function analyzePhoto(_uri?: string): Promise<MatchResult> {
  // Simulate network/inference latency.
  await new Promise(r => setTimeout(r, 600));

  const keys = scannableKeys();
  const topKey = pick(keys);
  const topMachine = getMachine(topKey);

  // Build alternatives from the machine's own listed alternatives, resolved to
  // real catalog keys, falling back to other random machines if needed.
  const altKeys = topMachine.alts
    .map(a => keyForName(a.n))
    .filter(k => k !== topKey);
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

  // ~1 in 4 scans is an uncertain "best guess" so the low-confidence flow is
  // exercised; the rest are confident matches. The real API will supply this.
  const lowConfidence = Math.random() < 0.25;
  const topConfidence = lowConfidence
    ? 55 + Math.floor(Math.random() * 14)  // 55–68%
    : 88 + Math.floor(Math.random() * 11); // 88–98%

  return {
    top: { key: topKey, confidence: topConfidence },
    alternatives,
  };
}
