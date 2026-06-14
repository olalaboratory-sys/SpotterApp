import React from 'react';
import { Path, Circle, Line, Rect, Ellipse, Polyline } from 'react-native-svg';

// Back-day line icons on the shared 24×24 grid (geometry kept within 2..22).
// Stroke, fill and weight are applied globally by the parent renderer, so these
// shapes carry geometry only. Each icon highlights the machine's defining
// feature — cable angle, handle height, seat orientation or body position.
export const SHAPES_BACK: Record<string, React.ReactNode> = {
  // Lat Pulldown — overhead wide bar, cable straight down to a low seat
  'lat': (
    <>
      <Line x1={6} y1={5} x2={18} y2={5} />
      <Line x1={12} y1={5} x2={12} y2={12} />
      <Circle cx={12} cy={13.4} r={1.4} />
      <Line x1={8} y1={19} x2={16} y2={19} />
      <Line x1={10} y1={16} x2={10} y2={19} />
    </>
  ),
  // Seated Cable Row — low horizontal cable from floor pulley to torso, seat at right
  'row': (
    <>
      <Circle cx={4} cy={16} r={1.2} />
      <Line x1={5} y1={16} x2={14} y2={16} />
      <Line x1={14} y1={13} x2={14} y2={19} />
      <Line x1={18} y1={11} x2={18} y2={18} />
      <Line x1={18} y1={18} x2={20} y2={18} />
    </>
  ),
  // Assisted Pull-Up — overhead bar, person, and a knee/assist platform below
  'assisted': (
    <>
      <Line x1={6} y1={4} x2={18} y2={4} />
      <Circle cx={12} cy={7.2} r={1.5} />
      <Line x1={9} y1={4} x2={12} y2={8.7} />
      <Line x1={15} y1={4} x2={12} y2={8.7} />
      <Line x1={12} y1={8.7} x2={12} y2={14} />
      <Rect x={8} y={15} width={8} height={3} rx={1} />
    </>
  ),
  // Chest-Supported Row — incline chest pad, handles pulled back behind
  'csrow': (
    <>
      <Line x1={6} y1={20} x2={6} y2={9} />
      <Line x1={6} y1={9} x2={14} y2={15} />
      <Line x1={6} y1={20} x2={11} y2={20} />
      <Line x1={16} y1={8} x2={20} y2={11} />
      <Circle cx={16.5} cy={8.5} r={1.2} />
    </>
  ),
  // T-Bar Row — angled bar pivoting from a floor corner, handle at top
  'tbar': (
    <>
      <Circle cx={4} cy={19} r={1.2} />
      <Line x1={5} y1={18} x2={17} y2={7} />
      <Line x1={15} y1={5} x2={19} y2={9} />
      <Line x1={16} y1={11} x2={20} y2={11} />
    </>
  ),
  // Pullover Machine — seated, arc bar sweeping overhead to front
  'pullover': (
    <>
      <Line x1={6} y1={20} x2={6} y2={11} />
      <Line x1={6} y1={20} x2={11} y2={20} />
      <Circle cx={6} cy={9} r={1.4} />
      <Path d="M6 9 A8 8 0 0 1 18 12" />
      <Circle cx={18} cy={12} r={1.2} />
    </>
  ),
  // Iso-Lateral Row — plate-loaded center post, two independent handles
  'isorow': (
    <>
      <Line x1={12} y1={6} x2={12} y2={18} />
      <Line x1={12} y1={10} x2={6} y2={8} />
      <Circle cx={5} cy={7.7} r={1.2} />
      <Line x1={12} y1={10} x2={18} y2={13} />
      <Circle cx={19} cy={13.4} r={1.2} />
    </>
  ),
  // High Row Machine — pull from a high pulley angle down toward seat
  'highrow': (
    <>
      <Circle cx={18} cy={6} r={1.3} />
      <Line x1={17} y1={6.6} x2={8} y2={13} />
      <Line x1={8} y1={13} x2={6} y2={13} />
      <Line x1={6} y1={9} x2={6} y2={19} />
      <Line x1={6} y1={19} x2={10} y2={19} />
    </>
  ),
  // Low Row Machine — pull from a low pulley angle up toward chest
  'lowrow': (
    <>
      <Circle cx={18} cy={18} r={1.3} />
      <Line x1={17} y1={17.4} x2={8} y2={11} />
      <Line x1={8} y1={11} x2={6} y2={11} />
      <Line x1={6} y1={5} x2={6} y2={15} />
      <Line x1={6} y1={5} x2={10} y2={5} />
    </>
  ),
  // Straight-Arm Pulldown — tall cable column, straight-arm arc to hips
  'straightarmpulldown': (
    <>
      <Line x1={6} y1={4} x2={6} y2={20} />
      <Circle cx={6} cy={6} r={1.2} />
      <Path d="M7 6 A11 11 0 0 1 17 17" />
      <Line x1={17} y1={17} x2={17} y2={20} />
    </>
  ),
  // Landmine T-Bar Row — barbell anchored in floor corner, plate at lifting end
  'tbarrowstation': (
    <>
      <Line x1={3} y1={20} x2={8} y2={20} />
      <Line x1={3} y1={20} x2={3} y2={16} />
      <Line x1={4} y1={20} x2={19} y2={8} />
      <Line x1={17} y1={6} x2={20} y2={9} />
      <Line x1={15.5} y1={7.5} x2={18.5} y2={10.5} />
    </>
  ),
  // Pull-Up Bar — top bar with mounts, person hanging full stretch
  'pullubar': (
    <>
      <Line x1={5} y1={5} x2={19} y2={5} />
      <Line x1={7} y1={5} x2={7} y2={8} />
      <Line x1={17} y1={5} x2={17} y2={8} />
      <Circle cx={12} cy={9} r={1.5} />
      <Line x1={12} y1={10.5} x2={12} y2={20} />
      <Line x1={9} y1={6} x2={12} y2={10.5} />
      <Line x1={15} y1={6} x2={12} y2={10.5} />
    </>
  ),
  // Back Extension — 45° hip pad with torso angling up over it
  'backext': (
    <>
      <Line x1={4} y1={20} x2={11} y2={11} />
      <Line x1={11} y1={11} x2={20} y2={6} />
      <Circle cx={20} cy={5.4} r={1.2} />
      <Line x1={8} y1={14} x2={8} y2={20} />
    </>
  ),
  // Barbell Row — bent-over torso pulling a barbell up to the waist
  'bbrow': (
    <>
      <Circle cx={8} cy={6.5} r={1.5} />
      <Line x1={8} y1={8} x2={11} y2={13} />
      <Line x1={11} y1={13} x2={16} y2={13} />
      <Line x1={11} y1={13} x2={11} y2={20} />
      <Line x1={4} y1={16} x2={20} y2={16} />
    </>
  ),
  // Dumbbell Row — one knee on a bench, dumbbell rowed at side
  'dbrow': (
    <>
      <Line x1={3} y1={17} x2={13} y2={17} />
      <Circle cx={9} cy={7} r={1.5} />
      <Line x1={9} y1={8.5} x2={6} y2={17} />
      <Line x1={9} y1={10} x2={17} y2={14} />
      <Line x1={16} y1={12} x2={16} y2={16} />
      <Line x1={18} y1={12} x2={18} y2={16} />
    </>
  ),
  // Barbell Deadlift — barbell on the floor, person standing to pull
  'deadlift': (
    <>
      <Circle cx={12} cy={5.5} r={1.5} />
      <Line x1={12} y1={7} x2={12} y2={14} />
      <Line x1={12} y1={14} x2={9} y2={19} />
      <Line x1={12} y1={14} x2={15} y2={19} />
      <Line x1={4} y1={11} x2={20} y2={11} />
      <Circle cx={5} cy={11} r={1.2} />
      <Circle cx={19} cy={11} r={1.2} />
    </>
  ),
  // Resistance-Band Row — wall anchor, band pulled back to torso
  'bandrow': (
    <>
      <Line x1={4} y1={5} x2={4} y2={19} />
      <Path d="M4 12 Q9 9 13 12 T20 12" />
      <Line x1={20} y1={9} x2={20} y2={15} />
      <Circle cx={4} cy={12} r={1.1} />
    </>
  ),
};
