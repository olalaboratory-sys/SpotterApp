import React from 'react';
import Svg, { G, Path, Circle, Line, Rect, Ellipse } from 'react-native-svg';
import { MACHINES } from '../constants/machines';
import { Colors } from '../constants/colors';

// A cohesive, app-owned line-icon set for gym equipment. Every icon is drawn on
// the same 24×24 grid with one stroke weight and round caps, so the whole catalog
// feels unified. Icons are keyed by each machine's `illo` archetype (with a few
// per-key overrides); anything unknown falls back to the generic machine icon.
// Color is applied once via <G>, so the shapes themselves are static.

const ICONS: Record<string, React.ReactNode> = {
  // Selectorized weight-stack machine + seat
  machine: (
    <>
      <Rect x={4} y={5} width={6} height={13} rx={1.2} />
      <Line x1={5.5} y1={9} x2={8.5} y2={9} />
      <Line x1={5.5} y1={12} x2={8.5} y2={12} />
      <Line x1={5.5} y1={15} x2={8.5} y2={15} />
      <Line x1={14} y1={13} x2={19} y2={13} />
      <Line x1={19} y1={7} x2={19} y2={13} />
      <Line x1={14} y1={13} x2={14} y2={18} />
    </>
  ),
  // Seated press — backrest, seat, two handles
  press: (
    <>
      <Line x1={7} y1={5} x2={7} y2={17} />
      <Line x1={7} y1={17} x2={12} y2={17} />
      <Line x1={9} y1={9} x2={15} y2={9} />
      <Line x1={9} y1={13} x2={15} y2={13} />
      <Circle cx={15.5} cy={9} r={1.1} />
      <Circle cx={15.5} cy={13} r={1.1} />
    </>
  ),
  // Pec deck — central pivot with two wings
  pecdeck: (
    <>
      <Circle cx={12} cy={12} r={1.4} />
      <Line x1={12} y1={12} x2={6} y2={8} />
      <Line x1={12} y1={12} x2={18} y2={8} />
      <Circle cx={5.5} cy={7.5} r={1.3} />
      <Circle cx={18.5} cy={7.5} r={1.3} />
    </>
  ),
  // Seated row — seat, cable, vertical handle, pulley
  row: (
    <>
      <Line x1={4} y1={11} x2={4} y2={17} />
      <Line x1={4} y1={17} x2={9} y2={17} />
      <Line x1={9} y1={12} x2={16} y2={12} />
      <Line x1={16} y1={9} x2={16} y2={15} />
      <Circle cx={19} cy={12} r={1.2} />
    </>
  ),
  // Cable column — upright, pulley, cable to a handle
  cable: (
    <>
      <Line x1={6} y1={4} x2={6} y2={20} />
      <Line x1={4} y1={20} x2={9} y2={20} />
      <Circle cx={6} cy={7} r={1.2} />
      <Line x1={7.2} y1={7} x2={15} y2={7} />
      <Line x1={15} y1={7} x2={15} y2={12} />
      <Line x1={13} y1={12} x2={17} y2={12} />
    </>
  ),
  // 45° leg press — seat + angled sled + footplate
  legpress: (
    <>
      <Line x1={3} y1={17} x2={8} y2={17} />
      <Line x1={3} y1={13} x2={3} y2={17} />
      <Line x1={8} y1={17} x2={17} y2={7} />
      <Line x1={13} y1={4} x2={19} y2={9} />
    </>
  ),
  // Seated leg machine — seat + lower-leg lever pad
  legseat: (
    <>
      <Line x1={5} y1={7} x2={5} y2={13} />
      <Line x1={5} y1={13} x2={11} y2={13} />
      <Line x1={11} y1={13} x2={15} y2={13} />
      <Line x1={15} y1={13} x2={17} y2={18} />
      <Circle cx={17.5} cy={18} r={1.3} />
    </>
  ),
  // Calf raise — step block + up arrow
  calf: (
    <>
      <Rect x={4} y={15} width={9} height={4} rx={1} />
      <Line x1={18} y1={18} x2={18} y2={7} />
      <Path d="M15.5 9.5 L18 7 L20.5 9.5" />
    </>
  ),
  // Barbell
  barbell: (
    <>
      <Line x1={3} y1={12} x2={21} y2={12} />
      <Line x1={7} y1={8} x2={7} y2={16} />
      <Line x1={9} y1={9.5} x2={9} y2={14.5} />
      <Line x1={15} y1={9.5} x2={15} y2={14.5} />
      <Line x1={17} y1={8} x2={17} y2={16} />
    </>
  ),
  // Dumbbell
  dumbbell: (
    <>
      <Line x1={10} y1={12} x2={14} y2={12} />
      <Line x1={6} y1={9} x2={6} y2={15} />
      <Line x1={8} y1={10.5} x2={8} y2={13.5} />
      <Line x1={16} y1={10.5} x2={16} y2={13.5} />
      <Line x1={18} y1={9} x2={18} y2={15} />
    </>
  ),
  // Kettlebell
  kettlebell: (
    <>
      <Path d="M9 9 C9 6 15 6 15 9" />
      <Circle cx={12} cy={14.5} r={4.5} />
    </>
  ),
  // Resistance band — single wave
  band: (
    <>
      <Path d="M3 12 Q6 7 9 12 T15 12 T21 12" />
    </>
  ),
  // Bodyweight — person
  bodyweight: (
    <>
      <Circle cx={12} cy={5.5} r={2} />
      <Line x1={12} y1={7.5} x2={12} y2={14} />
      <Line x1={8} y1={10} x2={16} y2={10} />
      <Line x1={12} y1={14} x2={9} y2={19} />
      <Line x1={12} y1={14} x2={15} y2={19} />
    </>
  ),
  // Bench — side profile
  bench: (
    <>
      <Line x1={4} y1={11} x2={20} y2={11} />
      <Line x1={6} y1={11} x2={5} y2={17} />
      <Line x1={18} y1={11} x2={19} y2={17} />
      <Line x1={11} y1={11} x2={11} y2={16} />
    </>
  ),
  // Treadmill — belt + upright console
  treadmill: (
    <>
      <Rect x={3} y={15} width={12} height={3.5} rx={1.7} />
      <Line x1={15} y1={16} x2={18} y2={7} />
      <Line x1={16} y1={7} x2={20} y2={7} />
    </>
  ),
  // Elliptical — pedal arc + upright
  elliptical: (
    <>
      <Ellipse cx={12} cy={15} rx={7} ry={2.5} />
      <Circle cx={5} cy={15} r={1} />
      <Circle cx={19} cy={15} r={1} />
      <Line x1={12} y1={15} x2={12} y2={5} />
      <Line x1={12} y1={6} x2={9} y2={8} />
    </>
  ),
  // Stationary bike
  bike: (
    <>
      <Circle cx={7} cy={16} r={3} />
      <Circle cx={17} cy={16} r={3} />
      <Line x1={7} y1={16} x2={11} y2={9} />
      <Line x1={11} y1={9} x2={17} y2={16} />
      <Line x1={11} y1={16} x2={11} y2={9} />
      <Line x1={9} y1={8} x2={12.5} y2={8} />
      <Line x1={11} y1={9} x2={14} y2={7} />
    </>
  ),
  // Rowing machine — rail + seat + handle
  rower: (
    <>
      <Line x1={3} y1={18} x2={21} y2={18} />
      <Circle cx={11} cy={16} r={1.4} />
      <Line x1={5} y1={11} x2={11} y2={16} />
      <Line x1={4} y1={13} x2={6} y2={18} />
    </>
  ),
  // Stairs / climber
  stairs: (
    <>
      <Path d="M4 18 H8 V14 H12 V10 H16 V6 H20" />
    </>
  ),
  // --- per-key overrides ---
  _ropes: (
    <>
      <Path d="M3 9 Q6 6 9 9 T15 9" />
      <Path d="M3 14 Q6 17 9 14 T15 14" />
      <Circle cx={17.5} cy={11.5} r={1.4} />
    </>
  ),
  _pullup: (
    <>
      <Line x1={4} y1={5} x2={20} y2={5} />
      <Line x1={8} y1={5} x2={8} y2={9} />
      <Line x1={16} y1={5} x2={16} y2={9} />
      <Circle cx={12} cy={11} r={1.6} />
      <Line x1={12} y1={12.6} x2={12} y2={17} />
      <Line x1={9} y1={9} x2={12} y2={12.6} />
      <Line x1={15} y1={9} x2={12} y2={12.6} />
    </>
  ),
  _dip: (
    <>
      <Line x1={4} y1={9} x2={10} y2={9} />
      <Line x1={14} y1={9} x2={20} y2={9} />
      <Line x1={6} y1={9} x2={6} y2={18} />
      <Line x1={18} y1={9} x2={18} y2={18} />
    </>
  ),
};

const KEY_OVERRIDE: Record<string, string> = {
  battleropes: '_ropes',
  pullubar: '_pullup',
  dipstation: '_dip',
  tbarrowstation: 'row',
  versaclimber: 'stairs',
};

function archetypeFor(key?: string, illo?: string): string {
  if (key && KEY_OVERRIDE[key]) return KEY_OVERRIDE[key];
  const arch = illo ?? (key ? MACHINES[key]?.illo : undefined);
  return arch && ICONS[arch] ? arch : 'machine';
}

export default function MachineIcon({
  machineKey, illo, size = 24, color = Colors.greenDeep,
}: {
  machineKey?: string;
  illo?: string;
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {ICONS[archetypeFor(machineKey, illo)]}
      </G>
    </Svg>
  );
}
