import React from 'react';
import { Path, Circle, Line, Rect, Ellipse, Polyline } from 'react-native-svg';

// Glutes & hamstrings line-icon set. Same 24×24 grid / geometry-only contract as
// the core machine set: no stroke/fill props here — the parent <G> applies them.
// Each key reads as that specific movement or machine; sibling pairs are drawn to
// be visibly distinct (calf raises by stance, abductor/adductor by leg direction).

export const SHAPES_GLUTES_HAMS: Record<string, React.ReactNode> = {
  // Romanian deadlift — torso hinged forward, near-straight legs, barbell at shins
  'rdl': (
    <>
      <Circle cx={8} cy={5} r={1.6} />
      <Line x1={8} y1={6.6} x2={14} y2={10} />
      <Line x1={14} y1={10} x2={13} y2={20} />
      <Line x1={14} y1={10} x2={9} y2={16} />
      <Line x1={5} y1={16} x2={11} y2={16} />
      <Line x1={6} y1={14} x2={6} y2={18} />
      <Line x1={10} y1={14} x2={10} y2={18} />
    </>
  ),
  // Dumbbell RDL — hinged torso with a dumbbell hanging in each hand
  'dbrdl': (
    <>
      <Circle cx={8} cy={5} r={1.6} />
      <Line x1={8} y1={6.6} x2={14} y2={11} />
      <Line x1={14} y1={11} x2={13} y2={20} />
      <Line x1={14} y1={11} x2={10} y2={15} />
      <Line x1={5.5} y1={14} x2={5.5} y2={18} />
      <Line x1={10} y1={14} x2={10} y2={18} />
      <Line x1={7} y1={16} x2={8.5} y2={16} />
    </>
  ),
  // Standing calf raise — figure on the balls of the feet, heels lifted, up arrow
  'calf': (
    <>
      <Circle cx={9} cy={5} r={1.6} />
      <Line x1={9} y1={6.6} x2={9} y2={14} />
      <Line x1={9} y1={14} x2={9} y2={17} />
      <Line x1={7} y1={19} x2={11} y2={19} />
      <Line x1={7} y1={19} x2={9} y2={17} />
      <Line x1={18} y1={20} x2={18} y2={10} />
      <Polyline points="15.5 12.5 18 10 20.5 12.5" />
    </>
  ),
  // Seated calf raise — seated, thigh horizontal, knee pad on top, heel lifting
  'seatedcalf': (
    <>
      <Line x1={5} y1={7} x2={5} y2={13} />
      <Line x1={5} y1={13} x2={13} y2={13} />
      <Rect x={9} y={9} width={6} height={2.4} rx={1} />
      <Line x1={13} y1={13} x2={13} y2={18} />
      <Line x1={13} y1={18} x2={17} y2={18} />
      <Line x1={17} y1={18} x2={17} y2={15} />
    </>
  ),
  // Standing calf raise machine — shoulder pads on a column, person, heels raised
  'standcalf': (
    <>
      <Line x1={6} y1={5} x2={18} y2={5} />
      <Line x1={6} y1={4} x2={6} y2={6.5} />
      <Line x1={18} y1={4} x2={18} y2={6.5} />
      <Circle cx={12} cy={9.5} r={1.5} />
      <Line x1={12} y1={11} x2={12} y2={18} />
      <Line x1={10} y1={20} x2={14} y2={20} />
      <Line x1={10} y1={20} x2={12} y2={18} />
    </>
  ),
  // Calf press on leg press — angled platform, foot at top, toes pushing (arrow)
  'calfpress': (
    <>
      <Line x1={4} y1={18} x2={9} y2={18} />
      <Line x1={4} y1={14} x2={4} y2={18} />
      <Line x1={9} y1={18} x2={18} y2={8} />
      <Line x1={13} y1={11} x2={16.5} y2={14.5} />
      <Polyline points="14 7 18 6.5 17.5 10.5" />
    </>
  ),
  // Hip abductor — seated, knees together at hips then lower legs splayed OUT
  'abductor': (
    <>
      <Circle cx={12} cy={6} r={1.6} />
      <Line x1={12} y1={7.6} x2={12} y2={13} />
      <Line x1={12} y1={13} x2={8} y2={14} />
      <Line x1={12} y1={13} x2={16} y2={14} />
      <Line x1={8} y1={14} x2={5} y2={19} />
      <Line x1={16} y1={14} x2={19} y2={19} />
    </>
  ),
  // Hip adductor — seated, lower legs squeezed IN toward the centerline
  'adductor': (
    <>
      <Circle cx={12} cy={6} r={1.6} />
      <Line x1={12} y1={7.6} x2={12} y2={13} />
      <Line x1={12} y1={13} x2={7} y2={14} />
      <Line x1={12} y1={13} x2={17} y2={14} />
      <Line x1={7} y1={14} x2={10.5} y2={19} />
      <Line x1={17} y1={14} x2={13.5} y2={19} />
    </>
  ),
  // Hip thrust — back on bench pad, hips bridged up, barbell across the lap
  'hipthrust': (
    <>
      <Line x1={3} y1={10} x2={9} y2={10} />
      <Line x1={3} y1={10} x2={3} y2={13} />
      <Line x1={8} y1={11} x2={13} y2={16} />
      <Line x1={13} y1={16} x2={18} y2={19} />
      <Line x1={13} y1={10} x2={13} y2={16} />
      <Circle cx={13} cy={9} r={1.3} />
      <Line x1={11} y1={13} x2={15} y2={13} />
    </>
  ),
  // Glute kickback — figure on all-fours, one leg kicking back/up on a cable
  'glutekick': (
    <>
      <Circle cx={6} cy={8} r={1.5} />
      <Line x1={6} y1={9.5} x2={6} y2={18} />
      <Line x1={6} y1={11} x2={11} y2={11} />
      <Line x1={11} y1={11} x2={11} y2={18} />
      <Line x1={6} y1={18} x2={11} y2={18} />
      <Line x1={11} y1={14} x2={18} y2={9} />
      <Circle cx={19} cy={8} r={1.2} />
    </>
  ),
  // Cable pull-through — hinge over a low cable running between the legs to a pulley
  'pullthrough': (
    <>
      <Circle cx={7} cy={6} r={1.5} />
      <Line x1={7} y1={7.5} x2={11} y2={11} />
      <Line x1={11} y1={11} x2={10} y2={19} />
      <Line x1={11} y1={11} x2={14} y2={15} />
      <Line x1={9} y1={13} x2={19} y2={18} />
      <Circle cx={20} cy={18.5} r={1.2} />
    </>
  ),
  // Glute bridge — lying on floor, hips lifted into a bridge, feet planted
  'glutebridge': (
    <>
      <Circle cx={5} cy={14} r={1.5} />
      <Line x1={6} y1={14.5} x2={11} y2={16} />
      <Path d="M11 16 Q15 9 17 16" />
      <Line x1={17} y1={16} x2={17} y2={19} />
      <Line x1={4} y1={19} x2={19} y2={19} />
    </>
  ),
  // Kettlebell swing — kettlebell swung up to chest height on an arc, hinge stance
  'kbswing': (
    <>
      <Path d="M3 18 Q8 9 12 13" />
      <Path d="M10.5 6.5 C10.5 5 14 5 14 6.5" />
      <Circle cx={12.5} cy={9.5} r={2.6} />
      <Polyline points="14 5.5 16.5 5 16.5 7.5" />
    </>
  ),
  // Reverse hyper — face-down torso on a high pad, legs swinging up behind
  'reversehyper': (
    <>
      <Rect x={4} y={11} width={8} height={2.4} rx={1} />
      <Line x1={6} y1={13.4} x2={6} y2={18} />
      <Line x1={10} y1={13.4} x2={10} y2={18} />
      <Circle cx={3.5} cy={11} r={1.3} />
      <Line x1={12} y1={12} x2={18} y2={9} />
      <Line x1={18} y1={9} x2={20} y2={5} />
    </>
  ),
};
