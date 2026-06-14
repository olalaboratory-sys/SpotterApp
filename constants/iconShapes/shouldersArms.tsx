import React from 'react';
import { Path, Circle, Line, Rect, Ellipse, Polyline } from 'react-native-svg';

export const SHAPES_SHOULDERS_ARMS: Record<string, React.ReactNode> = {
  // Shoulder Press machine — seat + backrest with two overhead press handles
  'shoulder': (
    <>
      <Line x1={6} y1={20} x2={6} y2={11} />
      <Line x1={6} y1={20} x2={11} y2={20} />
      <Line x1={6} y1={11} x2={10} y2={11} />
      <Line x1={8} y1={8} x2={16} y2={8} />
      <Line x1={9} y1={8} x2={9} y2={5} />
      <Line x1={15} y1={8} x2={15} y2={5} />
      <Circle cx={9} cy={4.5} r={1.1} />
      <Circle cx={15} cy={4.5} r={1.1} />
    </>
  ),
  // Lateral Raise machine — central pivot with two padded arms raised out to the sides
  'latraise': (
    <>
      <Line x1={12} y1={20} x2={12} y2={13} />
      <Circle cx={12} cy={13} r={1.3} />
      <Line x1={12} y1={13} x2={5} y2={9} />
      <Line x1={12} y1={13} x2={19} y2={9} />
      <Rect x={3} y={7} width={3} height={3} rx={0.8} />
      <Rect x={18} y={7} width={3} height={3} rx={0.8} />
    </>
  ),
  // Reverse Pec Deck — pivot with arms swept backward, rear-delt accents behind
  'revpec': (
    <>
      <Circle cx={12} cy={13} r={1.3} />
      <Path d="M12 13 C9 11 6 11 4 13" />
      <Path d="M12 13 C15 11 18 11 20 13" />
      <Circle cx={4} cy={13} r={1.1} />
      <Circle cx={20} cy={13} r={1.1} />
      <Line x1={12} y1={13} x2={12} y2={20} />
    </>
  ),
  // Cable Lateral Raise — low cable column, single arm raised out to the side
  'cablelat': (
    <>
      <Line x1={4} y1={20} x2={4} y2={6} />
      <Circle cx={4} cy={6} r={1.1} />
      <Path d="M4 6 C7 9 9 11 13 11" />
      <Line x1={13} y1={11} x2={20} y2={7} />
      <Circle cx={20.5} cy={6.5} r={1.1} />
    </>
  ),
  // Iso-Lateral Shoulder Press — plate-loaded frame, two angled overhead handles + weight plate
  'isoshoulderpress': (
    <>
      <Line x1={6} y1={20} x2={6} y2={6} />
      <Line x1={6} y1={12} x2={10} y2={9} />
      <Line x1={6} y1={12} x2={10} y2={15} />
      <Circle cx={10.5} cy={8.5} r={1.1} />
      <Circle cx={10.5} cy={15.5} r={1.1} />
      <Rect x={15} y={8} width={5} height={8} rx={1} />
    </>
  ),
  // Dumbbell Shoulder Press — seated figure pressing two dumbbells overhead
  'dbpress': (
    <>
      <Line x1={5} y1={6} x2={9} y2={6} />
      <Line x1={7} y1={6} x2={7} y2={11} />
      <Line x1={15} y1={6} x2={19} y2={6} />
      <Line x1={17} y1={6} x2={17} y2={11} />
      <Path d="M7 11 C9 14 15 14 17 11" />
      <Line x1={12} y1={13} x2={12} y2={20} />
    </>
  ),
  // Dumbbell Lateral Raise — standing figure, two dumbbells held out to the sides
  'dblat': (
    <>
      <Circle cx={12} cy={5.5} r={1.4} />
      <Line x1={12} y1={7} x2={12} y2={14} />
      <Line x1={4} y1={11} x2={12} y2={9} />
      <Line x1={12} y1={9} x2={20} y2={11} />
      <Circle cx={3.5} cy={11} r={1.1} />
      <Circle cx={20.5} cy={11} r={1.1} />
    </>
  ),
  // Face Pull — high cable pulley, rope split toward the face
  'facepull': (
    <>
      <Circle cx={5} cy={5} r={1.2} />
      <Line x1={5} y1={6} x2={11} y2={11} />
      <Path d="M11 11 L17 8" />
      <Path d="M11 11 L17 14" />
      <Circle cx={17.5} cy={7.5} r={1} />
      <Circle cx={17.5} cy={14.5} r={1} />
    </>
  ),
  // Overhead Press — standing barbell pressed overhead with plates
  'ohp': (
    <>
      <Circle cx={12} cy={16} r={1.4} />
      <Line x1={12} y1={14} x2={12} y2={9} />
      <Line x1={9} y1={9} x2={15} y2={9} />
      <Line x1={4} y1={6} x2={20} y2={6} />
      <Line x1={6} y1={4} x2={6} y2={8} />
      <Line x1={18} y1={4} x2={18} y2={8} />
    </>
  ),
  // Band Pull-Apart — elastic band stretched across the chest between two hands
  'bandpull': (
    <>
      <Path d="M5 12 C9 8 15 8 19 12" />
      <Path d="M5 12 C9 16 15 16 19 12" />
      <Circle cx={4.5} cy={12} r={1.2} />
      <Circle cx={19.5} cy={12} r={1.2} />
      <Line x1={12} y1={9} x2={12} y2={15} />
    </>
  ),
  // Dumbbell Shrug — shoulders shrugged up with up-arrows, two dumbbells hanging
  'shrug': (
    <>
      <Path d="M7 12 C9 9 15 9 17 12" />
      <Line x1={7} y1={12} x2={7} y2={19} />
      <Line x1={17} y1={12} x2={17} y2={19} />
      <Polyline points="9 7 12 4 15 7" />
      <Circle cx={7} cy={20} r={1.2} />
      <Circle cx={17} cy={20} r={1.2} />
    </>
  ),
  // Shrug Machine — upright frame, two side handles, traps lifting (arrows)
  'shrugmachine': (
    <>
      <Rect x={9} y={6} width={6} height={12} rx={1} />
      <Line x1={9} y1={11} x2={5} y2={11} />
      <Line x1={15} y1={11} x2={19} y2={11} />
      <Polyline points="4 8 5 5 6 8" />
      <Polyline points="18 8 19 5 20 8" />
    </>
  ),
  // Cable Triceps Pushdown — high pulley, straight bar pushed down
  'tri': (
    <>
      <Circle cx={12} cy={4} r={1.2} />
      <Line x1={12} y1={5} x2={12} y2={13} />
      <Line x1={7} y1={13} x2={17} y2={13} />
      <Line x1={9} y1={13} x2={9} y2={17} />
      <Line x1={15} y1={13} x2={15} y2={17} />
      <Polyline points="10 19 12 21 14 19" />
    </>
  ),
  // Bicep Curl Machine — seat, angled support pad, curl handle pivoting up
  'bicep': (
    <>
      <Line x1={5} y1={20} x2={5} y2={13} />
      <Line x1={5} y1={20} x2={10} y2={20} />
      <Line x1={5} y1={13} x2={14} y2={17} />
      <Circle cx={15} cy={13} r={1.2} />
      <Path d="M15 13 C16 10 18 9 20 9" />
      <Circle cx={20.5} cy={8.5} r={1.1} />
    </>
  ),
  // Preacher Curl — steep angled arm pad with a curling forearm + dumbbell
  'preacher': (
    <>
      <Line x1={4} y1={20} x2={12} y2={7} />
      <Line x1={4} y1={20} x2={9} y2={20} />
      <Line x1={12} y1={7} x2={18} y2={11} />
      <Path d="M18 11 C20 12 20 15 18 16" />
      <Circle cx={17.5} cy={16.5} r={1.2} />
    </>
  ),
  // Seated Dip Machine — seat, back support, two press-down handles
  'dipmachine': (
    <>
      <Line x1={6} y1={20} x2={6} y2={9} />
      <Line x1={6} y1={20} x2={11} y2={20} />
      <Line x1={6} y1={13} x2={11} y2={13} />
      <Line x1={9} y1={9} x2={18} y2={9} />
      <Line x1={18} y1={9} x2={18} y2={15} />
      <Circle cx={18} cy={8} r={1.1} />
    </>
  ),
  // Assisted Dip — parallel bars with a knee assist pad below
  'assisteddip': (
    <>
      <Line x1={4} y1={7} x2={11} y2={7} />
      <Line x1={13} y1={7} x2={20} y2={7} />
      <Line x1={5} y1={7} x2={5} y2={16} />
      <Line x1={19} y1={7} x2={19} y2={16} />
      <Rect x={9} y={14} width={6} height={3} rx={1} />
    </>
  ),
  // Barbell Curl — standing barbell curled up to the chest with plates
  'bbcurl': (
    <>
      <Circle cx={12} cy={5} r={1.4} />
      <Path d="M7 14 C7 10 9 9 12 9 C15 9 17 10 17 14" />
      <Line x1={5} y1={14} x2={19} y2={14} />
      <Line x1={6} y1={12} x2={6} y2={16} />
      <Line x1={18} y1={12} x2={18} y2={16} />
    </>
  ),
  // Dumbbell Curl — standing figure curling a single dumbbell up to the shoulder
  'dbcurl': (
    <>
      <Circle cx={9} cy={5} r={1.4} />
      <Line x1={9} y1={6} x2={9} y2={20} />
      <Path d="M9 12 C9 9 14 8 16 11" />
      <Line x1={14} y1={6} x2={18} y2={10} />
      <Circle cx={13.5} cy={5.5} r={1.1} />
      <Circle cx={18.5} cy={10.5} r={1.1} />
    </>
  ),
  // Cable Bicep Curl — low cable column, cable curled up toward a hand
  'cablecurl': (
    <>
      <Line x1={4} y1={20} x2={4} y2={18} />
      <Line x1={2} y1={20} x2={6} y2={20} />
      <Circle cx={4} cy={17} r={1.1} />
      <Path d="M4 17 C4 13 6 12 9 12" />
      <Path d="M9 12 C13 12 16 11 17 7" />
      <Circle cx={17.5} cy={6.5} r={1.1} />
    </>
  ),
  // Cable Overhead Triceps Extension — low pulley, rope raised overhead behind the head
  'overheadcableext': (
    <>
      <Circle cx={12} cy={20} r={1.2} />
      <Line x1={12} y1={19} x2={12} y2={11} />
      <Path d="M12 11 C10 8 9 6 11 4" />
      <Path d="M12 11 C14 8 15 6 13 4" />
      <Circle cx={11} cy={3.5} r={1} />
      <Circle cx={13} cy={3.5} r={1} />
    </>
  ),
  // Dip Station — two parallel bars on uprights
  'dipstation': (
    <>
      <Line x1={4} y1={8} x2={10} y2={8} />
      <Line x1={14} y1={8} x2={20} y2={8} />
      <Line x1={5} y1={8} x2={5} y2={20} />
      <Line x1={9} y1={8} x2={9} y2={20} />
      <Line x1={15} y1={8} x2={15} y2={20} />
      <Line x1={19} y1={8} x2={19} y2={20} />
    </>
  ),
};
