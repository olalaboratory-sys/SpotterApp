import AsyncStorage from '@react-native-async-storage/async-storage';

// Daily scan caps. Free & trial users get a small allowance; paid plans get more.
// Tracked locally per device/day (resets at local midnight).
export const FREE_DAILY_SCANS = 10;
export const PREMIUM_DAILY_SCANS = 100;

const KEY = 'spotter.scans.v1';
const today = () => new Date().toISOString().slice(0, 10);

export const dailyScanLimit = (isPremium: boolean) => (isPremium ? PREMIUM_DAILY_SCANS : FREE_DAILY_SCANS);

export async function scansUsedToday(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return 0;
    const { date, count } = JSON.parse(raw);
    return date === today() ? count : 0;
  } catch {
    return 0;
  }
}

export async function recordScan(): Promise<number> {
  const used = await scansUsedToday();
  const next = used + 1;
  await AsyncStorage.setItem(KEY, JSON.stringify({ date: today(), count: next })).catch(() => {});
  return next;
}
