// Canonical profile taxonomy shared by onboarding and Settings so the two stay
// in sync. The `id` is what gets stored on the user document; labels here are the
// concise variants used in Settings (onboarding may show longer descriptions).

export type Option = { id: string; label: string };

export const EXPERIENCE_OPTIONS: Option[] = [
  { id: 'new', label: 'Brand new' },
  { id: 'few', label: 'Know a few' },
  { id: 'return', label: 'Returning' },
  { id: 'comfy', label: 'Confident' },
];

export const GOAL_OPTIONS: Option[] = [
  { id: 'confident', label: 'Feel confident' },
  { id: 'learn', label: 'Learn machines' },
  { id: 'workouts', label: 'Build workouts' },
  { id: 'legs', label: 'Legs & glutes' },
  { id: 'upper', label: 'Upper body' },
  { id: 'posture', label: 'Posture' },
];

// Back-compat: an earlier build stored a single `experience` of New/Some/Confident.
const LEGACY_EXPERIENCE: Record<string, string> = { New: 'new', Some: 'few', Confident: 'comfy' };

export function normalizeExperience(profile: { experienceLevel?: string | null; experience?: string | null }): string | null {
  if (profile.experienceLevel) return profile.experienceLevel;
  if (profile.experience && LEGACY_EXPERIENCE[profile.experience]) return LEGACY_EXPERIENCE[profile.experience];
  return null;
}

export function normalizeGoals(profile: { goals?: unknown; goal?: unknown }): string[] {
  if (Array.isArray(profile.goals)) return profile.goals.filter((g): g is string => typeof g === 'string');
  return [];
}

export const labelForGoal = (id: string) => GOAL_OPTIONS.find(o => o.id === id)?.label ?? id;
export const labelForExperience = (id: string | null) => EXPERIENCE_OPTIONS.find(o => o.id === id)?.label ?? '—';
