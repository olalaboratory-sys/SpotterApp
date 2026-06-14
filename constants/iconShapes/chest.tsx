import React from 'react';
import { Path, Circle, Line, Rect, Ellipse, Polyline } from 'react-native-svg';

export const SHAPES_CHEST: Record<string, React.ReactNode> = {
  // Chest Press machine — upright seat/backrest + two horizontal push handles going forward
  'chest': (
    <>
      <Line x1={6} y1={5} x2={6} y2={18} />
      <Line x1={6} y1={18} x2={11} y2={18} />
      <Line x1={8} y1={9} x2={16} y2={9} />
      <Line x1={8} y1={13} x2={16} y2={13} />
      <Circle cx={16.5} cy={9} r={1.2} />
      <Circle cx={16.5} cy={13} r={1.2} />
    </>
  ),

  // Pec Deck — central pivot with two wings closing toward the front
  'pec': (
    <>
      <Circle cx={12} cy={12} r={1.4} />
      <Path d="M12 12 Q9 8 6 7" />
      <Path d="M12 12 Q15 8 18 7" />
      <Circle cx={5.5} cy={6.5} r={1.3} />
      <Circle cx={18.5} cy={6.5} r={1.3} />
    </>
  ),

  // Incline Chest Press — inclined backrest + handles pressing up and forward
  'incline': (
    <>
      <Line x1={5} y1={18} x2={11} y2={7} />
      <Line x1={5} y1={18} x2={10} y2={18} />
      <Line x1={9} y1={13} x2={16} y2={9} />
      <Polyline points="14,6 17,8 16,11" />
      <Circle cx={16.5} cy={8.5} r={1.2} />
    </>
  ),

  // Iso-Lateral Chest Press — plate-loaded weight horns + two converging handles
  'isochestpress': (
    <>
      <Line x1={5} y1={6} x2={5} y2={18} />
      <Line x1={4} y1={9} x2={6} y2={9} />
      <Line x1={4} y1={12} x2={6} y2={12} />
      <Line x1={5} y1={9} x2={14} y2={11} />
      <Line x1={5} y1={15} x2={14} y2={13} />
      <Circle cx={14.5} cy={11} r={1.2} />
      <Circle cx={14.5} cy={13} r={1.2} />
    </>
  ),

  // Decline Chest Press — declined backrest (head low) + handles pressing down/forward
  'declinepress': (
    <>
      <Line x1={5} y1={8} x2={11} y2={17} />
      <Line x1={5} y1={8} x2={10} y2={8} />
      <Line x1={9} y1={11} x2={16} y2={15} />
      <Polyline points="14,18 17,16 16,13" />
      <Circle cx={16.5} cy={15.5} r={1.2} />
    </>
  ),

  // Cable Fly — two cables arcing inward to meet at the center
  'cablefly': (
    <>
      <Line x1={4} y1={4} x2={4} y2={9} />
      <Line x1={20} y1={4} x2={20} y2={9} />
      <Path d="M4 9 Q9 14 12 17" />
      <Path d="M20 9 Q15 14 12 17" />
      <Circle cx={12} cy={17.2} r={1.3} />
    </>
  ),

  // Cable Crossover — tall dual columns with cables crossing in the middle
  'cablecrossover': (
    <>
      <Line x1={4} y1={3} x2={4} y2={20} />
      <Line x1={20} y1={3} x2={20} y2={20} />
      <Line x1={4} y1={5} x2={15} y2={16} />
      <Line x1={20} y1={5} x2={9} y2={16} />
      <Circle cx={15} cy={16} r={1.2} />
      <Circle cx={9} cy={16} r={1.2} />
    </>
  ),

  // Barbell Bench Press — flat bench (side) + barbell bar with plates over chest
  'bench': (
    <>
      <Line x1={4} y1={16} x2={20} y2={16} />
      <Line x1={6} y1={16} x2={5} y2={20} />
      <Line x1={18} y1={16} x2={19} y2={20} />
      <Line x1={4} y1={8} x2={20} y2={8} />
      <Line x1={7} y1={6} x2={7} y2={10} />
      <Line x1={17} y1={6} x2={17} y2={10} />
    </>
  ),

  // Dumbbell Bench Press — flat bench + two dumbbells held above
  'dbbench': (
    <>
      <Line x1={4} y1={17} x2={20} y2={17} />
      <Line x1={6} y1={17} x2={5} y2={20} />
      <Line x1={18} y1={17} x2={19} y2={20} />
      <Line x1={6} y1={7} x2={6} y2={11} />
      <Line x1={10} y1={7} x2={10} y2={11} />
      <Line x1={14} y1={7} x2={14} y2={11} />
      <Line x1={18} y1={7} x2={18} y2={11} />
    </>
  ),

  // Incline Dumbbell Press — inclined bench + two dumbbells above
  'incdb': (
    <>
      <Line x1={5} y1={19} x2={13} y2={9} />
      <Line x1={5} y1={19} x2={12} y2={19} />
      <Line x1={5} y1={14} x2={5} y2={19} />
      <Line x1={9} y1={5} x2={9} y2={9} />
      <Line x1={13} y1={5} x2={13} y2={9} />
      <Line x1={16} y1={5} x2={16} y2={9} />
      <Line x1={20} y1={5} x2={20} y2={9} />
    </>
  ),

  // Push-Up — person in plank/push position (head, straight body, arms, legs)
  'pushup': (
    <>
      <Circle cx={6} cy={9} r={1.6} />
      <Line x1={7.4} y1={9.5} x2={19} y2={13} />
      <Line x1={9} y1={10} x2={8} y2={16} />
      <Line x1={19} y1={13} x2={19} y2={17} />
      <Line x1={8} y1={16} x2={19} y2={17} />
    </>
  ),
};
