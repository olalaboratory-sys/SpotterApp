import { allMachines, getMachine } from '../constants/machines';
import { isFreeWeight, isCardio } from '../constants/catalog';
import { Routine } from '../constants/routines';

const overlap = (mapKeys: string[], focus: string[]) =>
  focus.length === 0 ? 0 : mapKeys.filter(k => focus.includes(k)).length;

/**
 * Turn a routine into a concrete list of machine keys. Prefers machines from the
 * given place (placeKeys); falls back to the beginner catalog. Filters by the
 * routine's area / machine-only flag and ranks by muscle-focus overlap.
 */
export function buildRoutineKeys(routine: Routine, placeKeys: string[] = []): string[] {
  const inPlace = placeKeys.map(getMachine);
  const fallback = allMachines().filter(m => m.beginner);
  const seed = inPlace.length ? inPlace : fallback;

  const passes = (m: ReturnType<typeof getMachine>) =>
    !isCardio(m) && (!routine.area || m.area === routine.area) && (!routine.machineOnly || !isFreeWeight(m));

  let cands = seed.filter(passes);

  // Supplement from the full catalog if the place doesn't have enough.
  if (cands.length < routine.count) {
    const have = new Set(cands.map(m => m.key));
    const extra = allMachines().filter(m => m.beginner && passes(m) && !have.has(m.key));
    cands = [...cands, ...extra];
  }

  if (routine.focus.length) {
    cands = cands.slice().sort((a, b) => overlap(b.map, routine.focus) - overlap(a.map, routine.focus));
  }

  return cands.slice(0, routine.count).map(m => m.key);
}
