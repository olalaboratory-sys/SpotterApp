import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Thin, crash-proof wrappers. Haptics are a native-only nicety, so calls are
// swallowed on web and if the platform has no taptic engine.
const ok = Platform.OS === 'ios' || Platform.OS === 'android';

export const tap = () => {
  if (ok) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
};

export const success = () => {
  if (ok) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
};

export const warn = () => {
  if (ok) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
};
