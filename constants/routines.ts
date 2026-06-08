import { Ionicons } from '@expo/vector-icons';

// Curated workout routines the app ships with. Users can browse, search, favorite,
// and start these. `area` filters the machine pool (Upper/Lower/Core/null=full body)
// and `focus` muscle-map keys bias which machines are picked (see lib/buildWorkout).

export type RoutineArea = 'Upper' | 'Lower' | 'Core' | null;

export type Routine = {
  id: string;
  title: string;
  subtitle: string;
  goal: string;            // grouping label shown as a chip
  area: RoutineArea;
  count: number;
  time: string;
  difficulty: 'Beginner' | 'Intermediate';
  icon: keyof typeof Ionicons.glyphMap;
  focus: string[];         // muscle-map keys to prefer
  machineOnly?: boolean;
  tags: string[];          // extra search terms
};

export const ROUTINES: Routine[] = [
  { id: 'first-day', title: 'First day at the gym', subtitle: 'A gentle, full-body intro', goal: 'Beginner', area: null, count: 4, time: '25 min', difficulty: 'Beginner', icon: 'sparkles-outline', focus: [], tags: ['new', 'start', 'easy', 'intro'] },
  { id: 'full-body', title: 'Full Body Beginner', subtitle: 'Hit everything in one session', goal: 'Full body', area: null, count: 6, time: '35 min', difficulty: 'Beginner', icon: 'body-outline', focus: [], tags: ['whole', 'everything'] },
  { id: 'quick-15', title: 'Quick 15-min', subtitle: 'Short on time? Still count it', goal: 'Full body', area: null, count: 3, time: '15 min', difficulty: 'Beginner', icon: 'flash-outline', focus: [], tags: ['fast', 'busy', 'lunch'] },
  { id: 'machine-circuit', title: 'Machine-only circuit', subtitle: 'No free weights — just machines', goal: 'Full body', area: null, count: 6, time: '30 min', difficulty: 'Beginner', icon: 'cog-outline', focus: [], machineOnly: true, tags: ['machines', 'circuit', 'safe'] },
  { id: 'full-strength', title: 'Full Body Strength', subtitle: 'A longer, complete session', goal: 'Full body', area: null, count: 7, time: '45 min', difficulty: 'Intermediate', icon: 'barbell-outline', focus: [], tags: ['strong', 'long'] },

  { id: 'upper', title: 'Upper Body', subtitle: 'Chest, back, shoulders, arms', goal: 'Upper', area: 'Upper', count: 5, time: '30 min', difficulty: 'Beginner', icon: 'arrow-up-outline', focus: [], tags: ['top'] },
  { id: 'push', title: 'Push Day', subtitle: 'Chest, shoulders & triceps', goal: 'Upper', area: 'Upper', count: 5, time: '30 min', difficulty: 'Intermediate', icon: 'arrow-redo-outline', focus: ['chest', 'shoulders', 'delts', 'triceps'], tags: ['press', 'chest'] },
  { id: 'pull', title: 'Pull Day', subtitle: 'Back & biceps', goal: 'Upper', area: 'Upper', count: 5, time: '30 min', difficulty: 'Intermediate', icon: 'arrow-undo-outline', focus: ['lats', 'midback', 'biceps'], tags: ['back', 'rows'] },
  { id: 'back-posture', title: 'Back & Posture', subtitle: 'Stand taller, pull stronger', goal: 'Upper', area: 'Upper', count: 4, time: '25 min', difficulty: 'Beginner', icon: 'man-outline', focus: ['lats', 'midback'], tags: ['posture', 'back'] },
  { id: 'chest', title: 'Chest Focus', subtitle: 'Build your press', goal: 'Upper', area: 'Upper', count: 4, time: '25 min', difficulty: 'Intermediate', icon: 'body-outline', focus: ['chest'], tags: ['pecs', 'press'] },
  { id: 'arms', title: 'Arms', subtitle: 'Biceps & triceps', goal: 'Upper', area: 'Upper', count: 4, time: '20 min', difficulty: 'Beginner', icon: 'fitness-outline', focus: ['biceps', 'triceps'], tags: ['guns', 'curl'] },

  { id: 'lower', title: 'Lower Body & Glutes', subtitle: 'Legs and glutes', goal: 'Lower', area: 'Lower', count: 5, time: '30 min', difficulty: 'Beginner', icon: 'arrow-down-outline', focus: [], tags: ['legs', 'bottom'] },
  { id: 'leg-day', title: 'Leg Day', subtitle: 'Quads & hamstrings', goal: 'Lower', area: 'Lower', count: 5, time: '35 min', difficulty: 'Intermediate', icon: 'walk-outline', focus: ['quads', 'hamstrings'], tags: ['legs', 'squat'] },
  { id: 'glutes', title: 'Glutes Focus', subtitle: 'Build & shape your glutes', goal: 'Lower', area: 'Lower', count: 4, time: '25 min', difficulty: 'Beginner', icon: 'body-outline', focus: ['glutes'], tags: ['butt', 'booty', 'hips'] },

  { id: 'core', title: 'Core & Abs', subtitle: 'A strong, stable middle', goal: 'Core', area: 'Core', count: 4, time: '20 min', difficulty: 'Beginner', icon: 'ellipse-outline', focus: ['abs', 'core'], tags: ['abs', 'stomach', 'stability'] },
];

export function getRoutine(id: string | undefined): Routine | undefined {
  return ROUTINES.find(r => r.id === id);
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

/** Search routines by title, goal, subtitle, or tags. */
export function searchRoutines(query: string): Routine[] {
  const q = norm(query);
  if (!q) return ROUTINES;
  return ROUTINES.filter(r =>
    norm(r.title).includes(q) ||
    norm(r.goal).includes(q) ||
    norm(r.subtitle).includes(q) ||
    r.tags.some(t => norm(t).includes(q)),
  );
}

export const ROUTINE_GOALS = ['All', 'Full body', 'Upper', 'Lower', 'Core', 'Beginner'] as const;
