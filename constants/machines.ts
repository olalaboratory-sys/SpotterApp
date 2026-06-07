export const MACHINES: Record<string, Machine> = {
  lat: {
    key: 'lat',
    name: 'Lat Pulldown',
    muscle: 'Back · Lats',
    category: 'Back',
    difficulty: 'Beginner',
    summary:
      'A back machine that trains your lats and upper back while you sit down — great for building a strong, healthy posture.',
    setup: [
      'Sit down and adjust the thigh pad so it rests snugly on your thighs.',
      'Stand up and grab the bar with your hands slightly wider than shoulder-width apart, palms facing away.',
      'Sit back down — the thigh pad should keep you in place.',
      'Adjust the weight to something you can move for 10 reps while staying in control.',
    ],
    movement: [
      'Take a breath, brace your core gently.',
      'Pull the bar down toward your upper chest — lead with your elbows, not your hands.',
      'Squeeze your lats at the bottom for a moment.',
      'Let the bar rise slowly under control — take 2–3 seconds going back up.',
      'Do 10 reps, rest 60–90 seconds, then repeat for 2–3 sets.',
    ],
    mistakes: [
      {
        t: 'Pulling to the back of the neck',
        w: 'This puts stress on your cervical spine and can cause injury.',
        f: 'Always pull to your upper chest — chin up, chest tall.',
      },
      {
        t: 'Using momentum to swing the weight',
        w: "Rocking forward and back means the weight is too heavy or you're rushing.",
        f: 'Slow down. Control both directions. Drop the weight if you need to.',
      },
      {
        t: 'Not adjusting the thigh pad',
        w: "If the pad isn't snug, your body will rise off the seat mid-rep.",
        f: 'Set the pad before you start so it holds you firmly in place.',
      },
    ],
    alternatives: [
      { n: 'Seated Cable Row', muscle: 'Back · Mid-back', tag: 'Similar' },
      { n: 'Assisted Pull-Up Machine', muscle: 'Back · Lats', tag: 'Similar' },
      { n: 'Resistance Band Pull-Down', muscle: 'Back · Lats', tag: 'No machine' },
      { n: 'Dumbbell Row', muscle: 'Back · Lats', tag: 'Easier' },
    ],
    muscles: [
      { n: 'Latissimus Dorsi', primary: true },
      { n: 'Rhomboids', primary: true },
      { n: 'Biceps', primary: false },
      { n: 'Rear Deltoids', primary: false },
    ],
    quick: [
      { k: 'Seat', v: 'Thigh pad snug', ic: 'seat' },
      { k: 'Grip', v: 'Wider than shoulders', ic: 'grip' },
      { k: 'Weight', v: 'Start light', ic: 'weight' },
      { k: 'Reps', v: '2–3 sets of 10', ic: 'reps' },
    ],
    safetyNotes:
      'Stop if you feel sharp pain in your shoulder or neck. Always pull to your chest — never behind your head.',
  },
};

export type Machine = {
  key: string;
  name: string;
  muscle: string;
  category: string;
  difficulty: string;
  summary: string;
  setup: string[];
  movement: string[];
  mistakes: { t: string; w: string; f: string }[];
  alternatives: { n: string; muscle: string; tag: string }[];
  muscles: { n: string; primary: boolean }[];
  quick: { k: string; v: string; ic: string }[];
  safetyNotes: string;
};
