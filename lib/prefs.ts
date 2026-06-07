import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'spotter.notifs';

export type Notifs = { reminders: boolean; restAlerts: boolean };
const DEFAULT: Notifs = { reminders: true, restAlerts: true };

export async function getNotifs(): Promise<Notifs> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}
