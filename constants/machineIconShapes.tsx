import React from 'react';
import { SHAPES_BACK } from './iconShapes/back';
import { SHAPES_CHEST } from './iconShapes/chest';
import { SHAPES_SHOULDERS_ARMS } from './iconShapes/shouldersArms';
import { SHAPES_LEGS } from './iconShapes/legs';
import { SHAPES_GLUTES_HAMS } from './iconShapes/glutesHams';
import { SHAPES_CORE_CARDIO } from './iconShapes/coreCardio';

// Per-machine custom icon shapes (one unique drawing per machine key), merged
// from the body-area icon sets. Consumed by components/MachineIcon.
export const MACHINE_SHAPES: Record<string, React.ReactNode> = {
  ...SHAPES_BACK,
  ...SHAPES_CHEST,
  ...SHAPES_SHOULDERS_ARMS,
  ...SHAPES_LEGS,
  ...SHAPES_GLUTES_HAMS,
  ...SHAPES_CORE_CARDIO,
};
