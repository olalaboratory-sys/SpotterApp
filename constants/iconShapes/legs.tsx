import React from 'react';
import { Path, Circle, Line, Rect, Ellipse, Polyline } from 'react-native-svg';

export const SHAPES_LEGS: Record<string, React.ReactNode> = {
  // Leg Press — 45° angled sled rail with footplate up top, seat at base
  'leg': (
    <>
      <Line x1={3} y1={19} x2={9} y2={19} />
      <Rect x={3} y={15} width={5} height={4} rx={0.8} />
      <Line x1={8} y1={17} x2={19} y2={6} />
      <Line x1={19} y1={6} x2={21} y2={9} />
      <Polyline points="19,6 21,4 18,3" />
      <Circle cx={6} cy={13} r={1.1} />
    </>
  ),
  // Leg Extension — seat with lower-leg lever swinging up, padded roller
  'ext': (
    <>
      <Line x1={4} y1={18} x2={11} y2={18} />
      <Line x1={4} y1={13} x2={4} y2={18} />
      <Line x1={4} y1={13} x2={11} y2={13} />
      <Line x1={11} y1={13} x2={16} y2={6} />
      <Circle cx={17} cy={5} r={1.4} />
      <Circle cx={11} cy={13} r={1.1} />
    </>
  ),
  // Hack Squat — steep angled back pad sled with shoulder rests, footplate low
  'hack': (
    <>
      <Line x1={3} y1={20} x2={14} y2={20} />
      <Line x1={6} y1={20} x2={13} y2={6} />
      <Line x1={13} y1={6} x2={16} y2={7} />
      <Line x1={9} y1={20} x2={20} y2={11} />
      <Line x1={20} y1={11} x2={20} y2={20} />
      <Circle cx={13} cy={6} r={1.1} />
    </>
  ),
  // Smith Machine — twin vertical rails with a barbell crossbar on them
  'smith': (
    <>
      <Line x1={6} y1={3} x2={6} y2={21} />
      <Line x1={18} y1={3} x2={18} y2={21} />
      <Line x1={4} y1={11} x2={20} y2={11} />
      <Circle cx={6} cy={11} r={1.2} />
      <Circle cx={18} cy={11} r={1.2} />
    </>
  ),
  // Pendulum Squat — pivot at top with swinging arc arm and a foot platform
  'pendulum': (
    <>
      <Circle cx={12} cy={4} r={1.4} />
      <Line x1={12} y1={5} x2={8} y2={17} />
      <Path d="M5 18 A 8 8 0 0 1 19 18" />
      <Line x1={5} y1={20} x2={11} y2={20} />
      <Rect x={5} y={16} width={5} height={2} rx={0.6} />
    </>
  ),
  // Belt Squat — standing figure with weight plate hanging between legs from hips
  'beltsquat': (
    <>
      <Circle cx={12} cy={5} r={1.4} />
      <Line x1={12} y1={6} x2={12} y2={13} />
      <Line x1={12} y1={13} x2={9} y2={20} />
      <Line x1={12} y1={13} x2={15} y2={20} />
      <Line x1={12} y1={11} x2={12} y2={16} />
      <Circle cx={12} cy={17} r={1.4} />
    </>
  ),
  // Seated Leg Press Horizontal — upright seat/back, horizontal sled pushing out
  'seatedlegpress': (
    <>
      <Line x1={4} y1={6} x2={4} y2={19} />
      <Line x1={4} y1={19} x2={9} y2={19} />
      <Line x1={4} y1={12} x2={15} y2={12} />
      <Rect x={15} y={9} width={4} height={6} rx={0.8} />
      <Line x1={20} y1={9} x2={20} y2={15} />
    </>
  ),
  // Squat Rack — two uprights with J-hooks holding a barbell across
  'squatrack': (
    <>
      <Line x1={6} y1={4} x2={6} y2={21} />
      <Line x1={18} y1={4} x2={18} y2={21} />
      <Line x1={4} y1={9} x2={20} y2={9} />
      <Polyline points="6,11 8,11 8,9" />
      <Polyline points="18,11 16,11 16,9" />
      <Circle cx={4} cy={9} r={1.2} />
      <Circle cx={20} cy={9} r={1.2} />
    </>
  ),
  // Barbell Back Squat — person squatting with a barbell across the shoulders
  'bbsquat': (
    <>
      <Circle cx={12} cy={5} r={1.4} />
      <Line x1={5} y1={8} x2={19} y2={8} />
      <Line x1={12} y1={7} x2={12} y2={13} />
      <Line x1={12} y1={13} x2={8} y2={16} />
      <Line x1={8} y1={16} x2={8} y2={20} />
      <Line x1={12} y1={13} x2={15} y2={16} />
      <Line x1={15} y1={16} x2={15} y2={20} />
    </>
  ),
  // Goblet Squat — squatting figure holding a single dumbbell at the chest
  'goblet': (
    <>
      <Circle cx={12} cy={5} r={1.4} />
      <Line x1={12} y1={6} x2={12} y2={12} />
      <Line x1={12} y1={12} x2={8} y2={19} />
      <Line x1={12} y1={12} x2={16} y2={19} />
      <Line x1={9} y1={9} x2={12} y2={9} />
      <Rect x={6.5} y={7.5} width={2.5} height={3} rx={0.5} />
    </>
  ),
  // Bulgarian Split Squat — front leg bent, rear foot up on a bench
  'bulgarian': (
    <>
      <Circle cx={9} cy={5} r={1.4} />
      <Line x1={9} y1={6} x2={9} y2={12} />
      <Line x1={9} y1={12} x2={8} y2={19} />
      <Line x1={9} y1={12} x2={15} y2={14} />
      <Line x1={15} y1={14} x2={18} y2={16} />
      <Line x1={16} y1={16} x2={21} y2={16} />
      <Line x1={18} y1={16} x2={18} y2={20} />
    </>
  ),
  // Bodyweight Squat — squatting figure, arms forward, no load
  'bwsquat': (
    <>
      <Circle cx={12} cy={5} r={1.4} />
      <Line x1={12} y1={6} x2={12} y2={12} />
      <Line x1={12} y1={8} x2={18} y2={8} />
      <Line x1={12} y1={12} x2={8} y2={15} />
      <Line x1={8} y1={15} x2={8} y2={20} />
      <Line x1={12} y1={12} x2={15} y2={15} />
      <Line x1={15} y1={15} x2={15} y2={20} />
    </>
  ),
  // Banded Squat — squatting figure with a looped resistance band under feet
  'bandsquat': (
    <>
      <Circle cx={12} cy={5} r={1.4} />
      <Line x1={12} y1={6} x2={12} y2={12} />
      <Line x1={12} y1={12} x2={8} y2={19} />
      <Line x1={12} y1={12} x2={16} y2={19} />
      <Path d="M8 19 C 9 13, 15 13, 16 19" />
      <Line x1={6} y1={20} x2={18} y2={20} />
    </>
  ),
  // Dumbbell Lunge — lunge stance with a dumbbell hanging from each hand
  'dblunge': (
    <>
      <Circle cx={11} cy={5} r={1.4} />
      <Line x1={11} y1={6} x2={11} y2={12} />
      <Line x1={11} y1={12} x2={7} y2={20} />
      <Line x1={11} y1={12} x2={16} y2={16} />
      <Line x1={16} y1={16} x2={16} y2={20} />
      <Line x1={6} y1={12} x2={8} y2={12} />
      <Line x1={14} y1={12} x2={16} y2={12} />
    </>
  ),
  // Sled Push — weighted sled with upright posts, hands pushing from behind
  'sled': (
    <>
      <Line x1={3} y1={19} x2={13} y2={19} />
      <Line x1={5} y1={19} x2={5} y2={11} />
      <Line x1={11} y1={19} x2={11} y2={11} />
      <Line x1={4} y1={11} x2={12} y2={11} />
      <Line x1={13} y1={19} x2={20} y2={13} />
      <Circle cx={20} cy={12} r={1.2} />
    </>
  ),
  // Seated Leg Curl — seat with lower-leg lever curling down behind, roller pad
  'curl': (
    <>
      <Line x1={4} y1={18} x2={11} y2={18} />
      <Line x1={4} y1={13} x2={4} y2={18} />
      <Line x1={4} y1={13} x2={11} y2={13} />
      <Line x1={11} y1={13} x2={16} y2={19} />
      <Circle cx={17} cy={20} r={1.4} />
      <Circle cx={11} cy={13} r={1.1} />
    </>
  ),
  // Lying Leg Curl — flat bench, body prone, heel lever curling up
  'lyingcurl': (
    <>
      <Line x1={3} y1={14} x2={16} y2={14} />
      <Line x1={5} y1={14} x2={5} y2={18} />
      <Line x1={14} y1={14} x2={14} y2={18} />
      <Line x1={16} y1={14} x2={19} y2={8} />
      <Circle cx={19} cy={7} r={1.4} />
      <Circle cx={16} cy={14} r={1.1} />
    </>
  ),
  // Standing Leg Curl — upright frame, one leg curling at the knee, roller pad
  'standinglegcurl': (
    <>
      <Line x1={6} y1={3} x2={6} y2={21} />
      <Line x1={6} y1={21} x2={11} y2={21} />
      <Line x1={11} y1={11} x2={11} y2={16} />
      <Line x1={11} y1={16} x2={16} y2={13} />
      <Circle cx={17} cy={12} r={1.4} />
      <Circle cx={11} cy={11} r={1.1} />
    </>
  ),
  // Glute-Ham Raise — angled GHD pad with foot brace, torso hinging down
  'ghr': (
    <>
      <Line x1={3} y1={20} x2={13} y2={20} />
      <Line x1={6} y1={20} x2={6} y2={14} />
      <Line x1={6} y1={14} x2={14} y2={10} />
      <Circle cx={18} cy={6} r={1.4} />
      <Line x1={14} y1={10} x2={17} y2={7} />
      <Circle cx={4} cy={17} r={1.1} />
    </>
  ),
};
