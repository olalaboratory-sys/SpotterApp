import React from 'react';
import { SvgXml } from 'react-native-svg';
import { MACHINE_SVGS } from '../constants/machineSvgs';
import { Colors } from '../constants/colors';

// Renders each machine's own custom icon (user-designed SVG, one per machine
// key) via react-native-svg. The SVGs use stroke="currentColor", so the `color`
// prop tints them per screen. Unknown keys (e.g. user-created custom machines)
// fall back to a generic dumbbell mark.

const FALLBACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><line x1="10" y1="12" x2="14" y2="12"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="8" y1="10.5" x2="8" y2="13.5"/><line x1="16" y1="10.5" x2="16" y2="13.5"/><line x1="18" y1="9" x2="18" y2="15"/></svg>`;

export default function MachineIcon({
  machineKey, illo, size = 24, color = Colors.greenDeep,
}: {
  machineKey?: string;
  illo?: string;
  size?: number;
  color?: string;
}) {
  const xml = (machineKey && MACHINE_SVGS[machineKey]) || (illo && MACHINE_SVGS[illo]) || FALLBACK;
  return <SvgXml xml={xml} width={size} height={size} color={color} />;
}
