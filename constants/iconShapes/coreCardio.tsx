import React from 'react';
import { Path, Circle, Line, Rect, Ellipse, Polyline } from 'react-native-svg';

export const SHAPES_CORE_CARDIO: Record<string, React.ReactNode> = {
  // ---------- CORE ----------

  // Ab Crunch Machine: seated frame, torso crunching forward over a pad, shoulder handles
  'abcrunch': (
    <>
      <Line x1="4" y1="21" x2="20" y2="21" />
      <Line x1="6" y1="21" x2="6" y2="9" />
      <Polyline points="6,9 13,9 16,13" />
      <Path d="M16 13 C 14 16, 11 18, 8 18" />
      <Circle cx="6" cy="9" r="1.3" />
      <Line x1="13" y1="9" x2="13" y2="13" />
    </>
  ),

  // Plank: person holding forearm plank on the floor
  'plank': (
    <>
      <Line x1="3" y1="20" x2="21" y2="20" />
      <Circle cx="6" cy="11" r="1.3" />
      <Polyline points="7,12 18,15 18,20" />
      <Line x1="7" y1="12" x2="7" y2="20" />
      <Line x1="7" y1="20" x2="5" y2="20" />
    </>
  ),

  // Cable Crunch: kneeling person, high cable from top pulley, crunching down
  'cablecrunch': (
    <>
      <Line x1="6" y1="3" x2="18" y2="3" />
      <Line x1="9" y1="3" x2="9" y2="9" />
      <Circle cx="9" cy="10.5" r="1.3" />
      <Path d="M9 12 C 9 14, 11 15, 12 17" />
      <Polyline points="12,17 9,20 14,20" />
      <Line x1="9" y1="3" x2="9" y2="3" />
    </>
  ),

  // Rotary Torso: seated twist machine, top-down rotating torso arc + arm lever
  'rotary': (
    <>
      <Circle cx="12" cy="14" r="1.3" />
      <Line x1="12" y1="20" x2="12" y2="14" />
      <Line x1="6" y1="20" x2="18" y2="20" />
      <Path d="M5 9 A 8 8 0 0 1 19 9" />
      <Line x1="12" y1="14" x2="18" y2="9" />
      <Circle cx="18" cy="9" r="1" />
    </>
  ),

  // Captain's Chair: vertical frame, forearm pads, knees raised
  'captainschair': (
    <>
      <Line x1="6" y1="3" x2="6" y2="21" />
      <Line x1="6" y1="11" x2="11" y2="11" />
      <Circle cx="6" cy="7" r="1.3" />
      <Path d="M7 8 C 9 9, 10 11, 10 13 L 15 13 L 15 16" />
      <Line x1="10" y1="13" x2="10" y2="16" />
    </>
  ),

  // Ab Coaster: kneeling on a curved track, knees curl up along the arc
  'abcoaster': (
    <>
      <Path d="M3 20 Q 12 20, 20 8" />
      <Line x1="20" y1="4" x2="20" y2="9" />
      <Circle cx="9" cy="12" r="1.3" />
      <Polyline points="9,13 11,16 8,18" />
      <Line x1="9" y1="13" x2="6" y2="15" />
    </>
  ),

  // Cable Woodchop: diagonal cable chop across the body, high pulley to low hands
  'cablewoodchop': (
    <>
      <Line x1="19" y1="3" x2="19" y2="8" />
      <Line x1="17" y1="3" x2="21" y2="3" />
      <Line x1="19" y1="8" x2="7" y2="16" />
      <Circle cx="11" cy="6" r="1.3" />
      <Polyline points="11,8 11,13 8,18" />
      <Line x1="11" y1="13" x2="14" y2="18" />
      <Line x1="11" y1="10" x2="7" y2="16" />
    </>
  ),

  // ---------- CARDIO ----------

  // Treadmill: running belt deck (with rollers) + upright console
  'treadmill': (
    <>
      <Path d="M3 18 L 17 18 L 19 15 L 5 15 Z" />
      <Circle cx="4.5" cy="18" r="1" />
      <Circle cx="16" cy="18" r="1" />
      <Line x1="17" y1="15" x2="20" y2="6" />
      <Line x1="20" y1="6" x2="20" y2="9" />
      <Line x1="20" y1="6" x2="17" y2="6" />
    </>
  ),

  // Elliptical: pedal arc at base + tall handles crossing
  'elliptical': (
    <>
      <Path d="M3 18 Q 8 12, 14 18" />
      <Circle cx="3" cy="18" r="1" />
      <Line x1="6" y1="16" x2="18" y2="4" />
      <Line x1="11" y1="14" x2="20" y2="4" />
      <Line x1="14" y1="18" x2="20" y2="18" />
      <Line x1="20" y1="4" x2="20" y2="18" />
    </>
  ),

  // Upright Bike: upright frame, vertical post, high seat, handlebars up front
  'uprightbike': (
    <>
      <Circle cx="6" cy="19" r="3" />
      <Circle cx="6" cy="19" r="1" />
      <Line x1="6" y1="19" x2="11" y2="8" />
      <Line x1="9" y1="13" x2="16" y2="13" />
      <Line x1="11" y1="8" x2="9" y2="6" />
      <Line x1="16" y1="13" x2="17" y2="6" />
      <Line x1="17" y1="6" x2="19" y2="6" />
    </>
  ),

  // Recumbent Bike: reclined seat with backrest, pedals out front, low long frame
  'recumbentbike': (
    <>
      <Circle cx="19" cy="17" r="2.5" />
      <Circle cx="19" cy="17" r="1" />
      <Line x1="4" y1="17" x2="19" y2="17" />
      <Polyline points="4,17 4,11 9,11" />
      <Line x1="4" y1="11" x2="2" y2="9" />
      <Line x1="19" y1="17" x2="13" y2="13" />
      <Circle cx="13" cy="13" r="1" />
    </>
  ),

  // Rowing Machine: long rail + sliding seat + pull handle, flywheel at one end
  'rowingerg': (
    <>
      <Line x1="3" y1="16" x2="20" y2="16" />
      <Circle cx="20" cy="13" r="2.5" />
      <Rect x="9" y="13" width="4" height="2" />
      <Line x1="3" y1="13" x2="3" y2="19" />
      <Line x1="3" y1="13" x2="6" y2="13" />
      <Line x1="17.5" y1="13" x2="6" y2="13" />
    </>
  ),

  // Stair Climber: rotating steps (staircase) on a frame with handle
  'stairclimber': (
    <>
      <Polyline points="3,20 3,16 7,16 7,12 11,12 11,8 15,8" />
      <Line x1="3" y1="20" x2="11" y2="20" />
      <Line x1="15" y1="8" x2="15" y2="4" />
      <Line x1="13" y1="4" x2="17" y2="4" />
      <Circle cx="15" cy="8" r="1" />
    </>
  ),

  // Air Bike (Assault): bike with big fan wheel (spokes) + moving arm handles
  'assaultbike': (
    <>
      <Circle cx="9" cy="13" r="6" />
      <Line x1="9" y1="7" x2="9" y2="19" />
      <Line x1="3" y1="13" x2="15" y2="13" />
      <Line x1="5" y1="9" x2="13" y2="17" />
      <Line x1="5" y1="17" x2="13" y2="9" />
      <Line x1="17" y1="20" x2="20" y2="4" />
      <Line x1="18" y1="20" x2="16" y2="20" />
    </>
  ),

  // Vertical Climber: vertical ladder-climb rails with rungs/handles
  'versaclimber': (
    <>
      <Line x1="9" y1="3" x2="9" y2="21" />
      <Line x1="15" y1="3" x2="15" y2="21" />
      <Line x1="6" y1="7" x2="9" y2="7" />
      <Line x1="15" y1="11" x2="18" y2="11" />
      <Line x1="6" y1="15" x2="9" y2="15" />
      <Circle cx="6" cy="7" r="1" />
      <Circle cx="18" cy="11" r="1" />
    </>
  ),

  // Battle Ropes: two thick wavy ropes anchored at a post
  'battleropes': (
    <>
      <Line x1="20" y1="4" x2="20" y2="20" />
      <Path d="M20 9 C 15 7, 13 12, 9 10 S 4 12, 3 10" />
      <Path d="M20 15 C 15 13, 13 18, 9 16 S 4 18, 3 16" />
      <Circle cx="20" cy="4" r="1" />
    </>
  ),

  // Functional Trainer: dual upright frame with two adjustable cable pulleys + bar
  'functionaltrainer': (
    <>
      <Line x1="4" y1="3" x2="4" y2="21" />
      <Line x1="20" y1="3" x2="20" y2="21" />
      <Line x1="4" y1="3" x2="20" y2="3" />
      <Line x1="4" y1="21" x2="20" y2="21" />
      <Circle cx="7" cy="8" r="1.3" />
      <Circle cx="17" cy="8" r="1.3" />
      <Line x1="7" y1="9.3" x2="9" y2="15" />
      <Line x1="17" y1="9.3" x2="15" y2="15" />
    </>
  ),
};
