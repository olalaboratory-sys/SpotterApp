import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MACHINES } from '../constants/machines';

// One cohesive icon family (MaterialCommunityIcons) for every machine. Icons are
// chosen to evoke the equipment/movement type. A true per-machine silhouette would
// need custom art; this maps each machine's `illo` archetype (with a few per-key
// overrides) to the most representative glyph, with a safe fallback so nothing is
// ever blank.

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

const ILLO_ICON: Record<string, IconName> = {
  machine: 'weight',                 // pin-loaded weight stack
  press: 'arm-flex',                 // chest/shoulder press
  pecdeck: 'arm-flex',
  row: 'rowing',                     // rowing/pulling motion
  cable: 'cable-data',               // cable column
  legpress: 'seat-legroom-extra',    // seated leg machine
  legseat: 'seat-legroom-extra',
  calf: 'arrow-up-bold-outline',     // calf raise (up)
  barbell: 'weight-lifter',
  dumbbell: 'dumbbell',
  kettlebell: 'kettlebell',
  band: 'arm-flex',
  bodyweight: 'gymnastics',
  bench: 'bench',
  // cardio
  treadmill: 'run',
  elliptical: 'walk',
  bike: 'bike',
  rower: 'rowing',
  stairs: 'stairs',
};

// Per-key overrides where a more specific glyph fits better than the archetype.
const KEY_ICON: Record<string, IconName> = {
  battleropes: 'jump-rope',
  tbarrowstation: 'rowing',
  versaclimber: 'stairs',
};

const FALLBACK: IconName = 'weight-lifter';

export function machineIconName(key?: string, illo?: string): IconName {
  if (key && KEY_ICON[key]) return KEY_ICON[key];
  const arch = illo ?? (key ? MACHINES[key]?.illo : undefined);
  return (arch && ILLO_ICON[arch]) || FALLBACK;
}

export default function MachineIcon({
  machineKey, illo, size = 24, color,
}: {
  machineKey?: string;
  illo?: string;
  size?: number;
  color?: string;
}) {
  return <MaterialCommunityIcons name={machineIconName(machineKey, illo)} size={size} color={color} />;
}
