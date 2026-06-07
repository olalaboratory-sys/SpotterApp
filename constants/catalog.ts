// Catalog helpers: grouping the 65-machine library by equipment family and body
// area, plus a synonym-aware search. Shared by the Library screens and the
// workout builder. Built on top of constants/machines.ts.

import { Machine, allMachines } from './machines';

export type Family = 'Machine' | 'Cable' | 'Barbell' | 'Dumbbell' | 'Kettlebell' | 'Bands' | 'Bodyweight';
export type BodyArea = 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Legs' | 'Glutes' | 'Core' | 'Cable';

export const FREE_WEIGHT_FAMILIES: Family[] = ['Barbell', 'Dumbbell', 'Kettlebell', 'Bands', 'Bodyweight'];
export const MACHINE_AREAS: BodyArea[] = ['Chest', 'Back', 'Shoulders', 'Arms', 'Legs', 'Glutes', 'Core', 'Cable'];

const FREE_WEIGHT_SET = new Set(['Barbell', 'Dumbbell', 'Kettlebell', 'Band', 'Bodyweight']);

/** Equipment family, derived from the leading token of `cat`. */
export function familyOf(m: Machine): Family {
  const lead = m.cat.split('·')[0].trim();
  if (lead === 'Band') return 'Bands';
  if (FREE_WEIGHT_SET.has(lead)) return lead as Family;
  if (lead === 'Cable') return 'Cable';
  return 'Machine';
}

export function isFreeWeight(m: Machine): boolean {
  return FREE_WEIGHT_FAMILIES.includes(familyOf(m) as Family);
}

const MUSCLE_AREA: { test: RegExp; area: BodyArea }[] = [
  { test: /chest|pec/i, area: 'Chest' },
  { test: /lat|back|trap|rhomb/i, area: 'Back' },
  { test: /delt|shoulder/i, area: 'Shoulders' },
  { test: /bicep|tricep|forearm|arm/i, area: 'Arms' },
  { test: /glute/i, area: 'Glutes' },
  { test: /quad|hamstring|calf|calves|leg|thigh/i, area: 'Legs' },
  { test: /ab|core|oblique/i, area: 'Core' },
];

/** Best-guess body area for a machine (used by the "by body area" grid). */
export function bodyAreaOf(m: Machine): BodyArea {
  if (familyOf(m) === 'Cable') return 'Cable';
  // Try the second token of cat first (e.g. "Machine · Legs").
  const tokens = m.cat.split('·').map(s => s.trim());
  const tail = tokens[1] ?? tokens[0];
  for (const { test, area } of MUSCLE_AREA) if (test.test(tail)) return area;
  // Fall back to the primary muscle names.
  const primary = m.muscles.filter(x => x.primary).map(x => x.n).join(' ') || m.muscles.map(x => x.n).join(' ');
  for (const { test, area } of MUSCLE_AREA) if (test.test(primary)) return area;
  return 'Back';
}

export function machinesInArea(area: BodyArea): Machine[] {
  return allMachines().filter(m => !isFreeWeight(m) && bodyAreaOf(m) === area);
}

export function machinesInFamily(fam: Family): Machine[] {
  return allMachines().filter(m => familyOf(m) === fam);
}

export function countInArea(area: BodyArea): number { return machinesInArea(area).length; }
export function countInFamily(fam: Family): number { return machinesInFamily(fam).length; }

export function beginnerMachines(limit = 8): Machine[] {
  return allMachines().filter(m => m.beginner).slice(0, limit);
}

// --- Synonym-aware search -------------------------------------------------

const SYNONYMS: Record<string, string> = {
  butt: 'glutes', booty: 'glutes', bum: 'glutes',
  abs: 'core', tummy: 'core', stomach: 'core', belly: 'core',
  thighs: 'legs', thigh: 'legs', quads: 'legs', hamstrings: 'legs', calves: 'legs',
  arms: 'arms', biceps: 'arms', triceps: 'arms',
  back: 'back', lats: 'back',
  chest: 'chest', pecs: 'chest',
  shoulders: 'shoulders', delts: 'shoulders',
};

export function expandQuery(q: string): string {
  const t = q.trim().toLowerCase();
  return SYNONYMS[t] ?? t;
}

/** The body-area routine suggestion for a query, if it maps to one. */
export function areaForQuery(q: string): BodyArea | null {
  const t = expandQuery(q);
  const found = MACHINE_AREAS.find(a => a.toLowerCase() === t);
  return found ?? null;
}

export function searchMachines(q: string): Machine[] {
  const raw = q.trim().toLowerCase();
  if (!raw) return [];
  const expanded = expandQuery(raw);
  const terms = Array.from(new Set([raw, expanded]));
  return allMachines().filter(m => {
    const hay = [
      m.name, m.cat, m.area,
      m.muscles.map(x => x.n).join(' '),
      m.map.join(' '),
      bodyAreaOf(m),
    ].join(' ').toLowerCase();
    return terms.some(t => hay.includes(t));
  });
}
