import { Ionicons } from '@expo/vector-icons';
import { MACHINES } from './machines';

type IconName = keyof typeof Ionicons.glyphMap;

// Maps a guide's illustration archetype to a distinct Ionicon so cards and
// heroes vary by equipment type instead of all showing a barbell.
const ILLO_ICON: Record<string, IconName> = {
  band: 'pulse-outline',
  barbell: 'barbell-outline',
  bench: 'bed-outline',
  bodyweight: 'body-outline',
  cable: 'git-network-outline',
  calf: 'footsteps-outline',
  dumbbell: 'barbell-outline',
  kettlebell: 'fitness-outline',
  legpress: 'walk-outline',
  legseat: 'walk-outline',
  machine: 'construct-outline',
  pecdeck: 'contract-outline',
  press: 'arrow-up-circle-outline',
  row: 'swap-horizontal-outline',
  treadmill: 'walk-outline',
  elliptical: 'ellipse-outline',
  bike: 'bicycle-outline',
  rower: 'boat-outline',
  stairs: 'trending-up-outline',
};

export function iconForIllo(illo?: string): IconName {
  return (illo && ILLO_ICON[illo]) || 'barbell-outline';
}

/** Icon for a catalog key; falls back gracefully for custom/unknown machines. */
export function iconForKey(key?: string): IconName {
  return iconForIllo(key ? MACHINES[key]?.illo : undefined);
}
