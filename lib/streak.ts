const DAY = 86400000;
const dayKey = (d: Date) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x.getTime(); };

/** Consecutive-day workout streak ending today or yesterday. */
export function workoutStreak(dates: (Date | null)[]): number {
  const days = new Set(dates.filter(Boolean).map(d => dayKey(d as Date)));
  if (!days.size) return 0;
  let cursor = dayKey(new Date());
  if (!days.has(cursor)) {
    cursor -= DAY; // allow the streak to count up to yesterday
    if (!days.has(cursor)) return 0;
  }
  let streak = 0;
  while (days.has(cursor)) { streak++; cursor -= DAY; }
  return streak;
}
