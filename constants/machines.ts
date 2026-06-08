// AUTO-GENERATED from the Spotter design handoff catalog (project/app/machines*.js).
// 65 beginner-authored machine guides. To regenerate, see /tmp/gen-machines.js.
// Do not hand-edit individual entries here; edit the source data and re-run the generator.

import { EXTRA_MACHINES } from './machinesExtra';

export type QuickItem = { ic: string; k: string; v: string };
export type MuscleRef = { n: string; primary: boolean };
export type Mistake = { t: string; w: string; f: string };
export type Alt = { n: string; tag: string; muscle: string };

export type Machine = {
  key: string;
  name: string;
  /** e.g. "Back · Lats" or "Machine · Legs" — family/area label shown as a chip */
  cat: string;
  /** Coarse body region used for filtering: 'Upper' | 'Lower' | 'Core' */
  area: string;
  /** Whether the guide is flagged beginner-friendly */
  beginner: boolean;
  /** Illustration archetype key (pulldown, press, cable, barbell, dumbbell, ...) */
  illo: string;
  summary: string;
  muscles: MuscleRef[];
  /** Muscle-map highlight keys: lats, midback, delts, biceps, chest, shoulders, triceps, glutes, quads, hamstrings, calves */
  map: string[];
  quick: QuickItem[];
  setup: string[];
  movement: string[];
  mistakes: Mistake[];
  alts: Alt[];
};

export const MACHINES: Record<string, Machine> = {
  "lat": {
    "key": "lat",
    "name": "Lat Pulldown",
    "cat": "Back · Lats",
    "area": "Upper",
    "beginner": true,
    "summary": "An upper-body machine that builds your back and improves posture. You sit down and pull a bar toward your chest — your back does the work while the seat keeps you steady.",
    "muscles": [
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Rear delts",
        "primary": false
      },
      {
        "n": "Biceps",
        "primary": false
      }
    ],
    "map": [
      "lats",
      "midback",
      "delts",
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Thigh pads snug on your legs"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hands wider than shoulders"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light — about 15–20 kg"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Set the thigh pad so it sits snug on your legs — this stops you lifting off the seat.",
      "Pick a light weight to start. You can always add more once the movement feels easy.",
      "Stand up and grab the bar a bit wider than your shoulders, palms facing away.",
      "Sit down and tuck your thighs under the pads. Plant both feet flat on the floor.",
      "Lean back very slightly and lift your chest. This is your starting position."
    ],
    "movement": [
      "Pull the bar down smoothly toward the top of your chest.",
      "Lead with your elbows and squeeze your shoulder blades together.",
      "Keep your chest tall — don't swing your whole body to move the weight.",
      "Pause for a moment when the bar reaches your chest.",
      "Let the bar rise back up slowly and with control. Breathe out as you pull, in as you release."
    ],
    "mistakes": [
      {
        "t": "Swinging the body",
        "w": "Using momentum instead of your back.",
        "f": "Slow down and keep your torso steady — let your arms and back move, not your hips."
      },
      {
        "t": "Pulling behind the neck",
        "w": "Hard on the shoulders and easy to do wrong.",
        "f": "Always pull the bar to the front, to the top of your chest."
      },
      {
        "t": "Going too heavy",
        "w": "Form breaks down and you feel it in your arms, not your back.",
        "f": "Drop the weight until you can do 10 controlled reps."
      },
      {
        "t": "Shrugging shoulders",
        "w": "Lifting the shoulders up toward the ears.",
        "f": "Think about pulling your shoulders down and back as you start."
      }
    ],
    "alts": [
      {
        "n": "Assisted Pull-Up",
        "tag": "Similar",
        "muscle": "Back · Lats"
      },
      {
        "n": "Seated Cable Row",
        "tag": "Similar",
        "muscle": "Mid-back"
      },
      {
        "n": "Straight-Arm Pulldown",
        "tag": "Easier",
        "muscle": "Lats"
      },
      {
        "n": "Resistance-Band Pulldown",
        "tag": "No machine",
        "muscle": "Back"
      }
    ],
    "illo": "machine"
  },
  "chest": {
    "key": "chest",
    "name": "Chest Press",
    "cat": "Chest",
    "area": "Upper",
    "beginner": true,
    "summary": "A seated pushing machine that builds your chest, shoulders and the backs of your arms. The seat supports you so you can focus on a smooth, even push.",
    "muscles": [
      {
        "n": "Chest",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": false
      },
      {
        "n": "Triceps",
        "primary": true
      }
    ],
    "map": [
      "chest",
      "shoulders",
      "triceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Handles level with mid-chest"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Wrists straight, elbows ~45°"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light — about 10–15 kg"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Adjust the seat so the handles line up with the middle of your chest.",
      "Choose a light weight to learn the movement.",
      "Sit back with your whole back against the pad and feet flat on the floor.",
      "Grip the handles with straight wrists. Your elbows should be a little below shoulder height.",
      "Pull your shoulders down and back to brace before you push."
    ],
    "movement": [
      "Press the handles forward smoothly until your arms are almost straight.",
      "Stop just short of locking your elbows.",
      "Keep your back against the pad the whole time.",
      "Bring the handles back slowly until you feel a gentle stretch in your chest.",
      "Breathe out as you push, in as you return."
    ],
    "mistakes": [
      {
        "t": "Flaring the elbows",
        "w": "Elbows pointing straight out to the sides.",
        "f": "Tuck them to about 45° to protect your shoulders."
      },
      {
        "t": "Locking the elbows",
        "w": "Snapping the arms fully straight under load.",
        "f": "Stop just short of lock and stay in control."
      },
      {
        "t": "Lifting off the seat",
        "w": "Arching your back to push more weight.",
        "f": "Keep your back flat and lower the weight."
      }
    ],
    "alts": [
      {
        "n": "Pec Deck",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Incline Chest Press",
        "tag": "Similar",
        "muscle": "Upper chest"
      },
      {
        "n": "Push-Up",
        "tag": "No machine",
        "muscle": "Chest"
      },
      {
        "n": "Cable Chest Press",
        "tag": "Similar",
        "muscle": "Chest"
      }
    ],
    "illo": "machine"
  },
  "row": {
    "key": "row",
    "name": "Seated Cable Row",
    "cat": "Back · Mid-back",
    "area": "Upper",
    "beginner": true,
    "summary": "A seated pulling machine that strengthens your mid-back and improves posture. You pull a handle toward your stomach while sitting tall.",
    "muscles": [
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Rear delts",
        "primary": false
      },
      {
        "n": "Biceps",
        "primary": false
      }
    ],
    "map": [
      "midback",
      "lats",
      "delts",
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Feet",
        "v": "Flat on the platform, knees soft"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Both hands on the handle"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light — about 15 kg"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Sit down and place your feet flat on the foot platform with a slight bend in your knees.",
      "Pick a light weight to start.",
      "Reach forward and take the handle with both hands.",
      "Sit up tall with a straight back and your chest lifted.",
      "Pull your shoulders down away from your ears."
    ],
    "movement": [
      "Pull the handle toward your belly button, leading with your elbows.",
      "Squeeze your shoulder blades together at the end.",
      "Keep your back straight — don't lean way back.",
      "Let the handle travel forward slowly until your arms are straight.",
      "Breathe out as you pull, in as you return."
    ],
    "mistakes": [
      {
        "t": "Rowing with your body",
        "w": "Rocking back and forth to move the weight.",
        "f": "Keep your torso still and let your arms and back do the work."
      },
      {
        "t": "Rounding the back",
        "w": "Slumping forward at the start.",
        "f": "Keep your chest up and a slight arch in your lower back."
      },
      {
        "t": "Pulling too high",
        "w": "Bringing the handle to your chest.",
        "f": "Aim for your belly button to hit the mid-back."
      }
    ],
    "alts": [
      {
        "n": "Chest-Supported Row",
        "tag": "Easier",
        "muscle": "Mid-back"
      },
      {
        "n": "Lat Pulldown",
        "tag": "Similar",
        "muscle": "Lats"
      },
      {
        "n": "Assisted Pull-Up",
        "tag": "Harder",
        "muscle": "Back"
      },
      {
        "n": "Resistance-Band Row",
        "tag": "No machine",
        "muscle": "Back"
      }
    ],
    "illo": "machine"
  },
  "leg": {
    "key": "leg",
    "name": "Leg Press",
    "cat": "Legs · Glutes",
    "area": "Lower",
    "beginner": true,
    "summary": "A lower-body machine that trains your thighs and glutes while your back stays fully supported. Great for building leg strength without balancing a weight.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      },
      {
        "n": "Calves",
        "primary": false
      }
    ],
    "map": [
      "quads",
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Back",
        "v": "Hips and back flat on the pad"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Shoulder-width on the platform"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light — feel it out"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Sit down with your whole back and hips flat against the pad.",
      "Place your feet shoulder-width apart in the middle of the platform.",
      "Start with a light weight while you learn the range.",
      "Release the safety handles to the sides.",
      "Keep your knees pointing the same direction as your toes."
    ],
    "movement": [
      "Lower the platform by bending your knees until they reach about 90°.",
      "Keep your heels flat and your back against the pad.",
      "Push through your whole foot to straighten your legs.",
      "Stop just short of locking your knees at the top.",
      "Breathe in as you lower, out as you push."
    ],
    "mistakes": [
      {
        "t": "Locking the knees",
        "w": "Snapping the legs fully straight at the top.",
        "f": "Stop just short of lock to keep tension on the muscles, not the joint."
      },
      {
        "t": "Lifting the hips",
        "w": "Hips rolling up off the pad when you go too low.",
        "f": "Only go as deep as you can while keeping your hips down."
      },
      {
        "t": "Knees caving in",
        "w": "Knees drifting toward each other.",
        "f": "Push your knees out in line with your toes."
      }
    ],
    "alts": [
      {
        "n": "Hack Squat",
        "tag": "Harder",
        "muscle": "Quads"
      },
      {
        "n": "Leg Extension",
        "tag": "Easier",
        "muscle": "Quads"
      },
      {
        "n": "Goblet Squat",
        "tag": "No machine",
        "muscle": "Legs"
      },
      {
        "n": "Smith Machine Squat",
        "tag": "Similar",
        "muscle": "Legs"
      }
    ],
    "illo": "machine"
  },
  "ext": {
    "key": "ext",
    "name": "Leg Extension",
    "cat": "Legs · Quads",
    "area": "Lower",
    "beginner": true,
    "summary": "A seated machine that isolates the front of your thighs. You straighten your legs against a padded bar — simple and beginner-friendly.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      }
    ],
    "map": [
      "quads"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Knees line up with the pivot"
      },
      {
        "ic": "hand",
        "k": "Pad",
        "v": "Just above your ankles"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start very light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Sit back so your back is against the pad and your knees bend at the seat's edge.",
      "Set the ankle pad to rest just above your ankles, on your shins.",
      "Make sure your knees line up with the machine's pivot point.",
      "Choose a light weight — this exercise feels heavy quickly.",
      "Hold the side handles lightly to stay steady."
    ],
    "movement": [
      "Straighten your legs smoothly until they're nearly straight.",
      "Pause briefly at the top and squeeze your thighs.",
      "Don't kick or jerk the weight up.",
      "Lower slowly back to the start with control.",
      "Breathe out as you lift, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Kicking the weight",
        "w": "Using a fast jerk to swing it up.",
        "f": "Slow it down — control both directions."
      },
      {
        "t": "Pad on the wrong spot",
        "w": "Pad resting on the foot or too high on the shin.",
        "f": "Set it just above the ankle for comfort and safety."
      },
      {
        "t": "Going too heavy",
        "w": "Hips lift and you can't control the lower.",
        "f": "Drop the weight until the movement is smooth."
      }
    ],
    "alts": [
      {
        "n": "Leg Press",
        "tag": "Similar",
        "muscle": "Quads"
      },
      {
        "n": "Hack Squat",
        "tag": "Harder",
        "muscle": "Quads"
      },
      {
        "n": "Wall Sit",
        "tag": "No machine",
        "muscle": "Quads"
      }
    ],
    "illo": "machine"
  },
  "curl": {
    "key": "curl",
    "name": "Seated Leg Curl",
    "cat": "Legs · Hamstrings",
    "area": "Lower",
    "beginner": true,
    "summary": "A seated machine that trains the backs of your thighs. You curl a padded bar down with your heels while staying supported.",
    "muscles": [
      {
        "n": "Hamstrings",
        "primary": true
      },
      {
        "n": "Calves",
        "primary": false
      }
    ],
    "map": [
      "hamstrings",
      "calves"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Knees line up with the pivot"
      },
      {
        "ic": "hand",
        "k": "Pads",
        "v": "Lower pad just above heels"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Sit back with your thighs on the seat and your back against the pad.",
      "Set the lower pad to rest just above your heels.",
      "Lower the thigh pad so your legs are held snugly in place.",
      "Line your knees up with the machine's pivot.",
      "Pick a light weight to start."
    ],
    "movement": [
      "Curl the pad down by bending your knees as far as comfortable.",
      "Squeeze the backs of your thighs at the bottom.",
      "Keep your hips and back against the pads.",
      "Return slowly to the start without letting the weight drop.",
      "Breathe out as you curl, in as you return."
    ],
    "mistakes": [
      {
        "t": "Hips lifting",
        "w": "Bottom rising off the seat to help.",
        "f": "Keep your hips planted and lower the weight if needed."
      },
      {
        "t": "Rushing the return",
        "w": "Letting the pad snap back up.",
        "f": "Control the way back — that's half the work."
      },
      {
        "t": "Half reps",
        "w": "Only bending your knees a little.",
        "f": "Use a full, comfortable range of motion."
      }
    ],
    "alts": [
      {
        "n": "Lying Leg Curl",
        "tag": "Similar",
        "muscle": "Hamstrings"
      },
      {
        "n": "Glute Bridge",
        "tag": "No machine",
        "muscle": "Hamstrings"
      },
      {
        "n": "Romanian Deadlift",
        "tag": "Harder",
        "muscle": "Hamstrings"
      }
    ],
    "illo": "machine"
  },
  "shoulder": {
    "key": "shoulder",
    "name": "Shoulder Press",
    "cat": "Shoulders",
    "area": "Upper",
    "beginner": true,
    "summary": "A seated machine that builds your shoulders and the backs of your arms by pressing handles overhead. The back pad keeps you stable.",
    "muscles": [
      {
        "n": "Shoulders",
        "primary": true
      },
      {
        "n": "Triceps",
        "primary": true
      },
      {
        "n": "Upper chest",
        "primary": false
      }
    ],
    "map": [
      "shoulders",
      "triceps",
      "chest"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Handles near shoulder height"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Wrists stacked over elbows"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light — about 5–10 kg"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2 sets of 10"
      }
    ],
    "setup": [
      "Adjust the seat so the handles start around shoulder height.",
      "Sit back with your back flat against the pad.",
      "Choose a light weight — shoulders tire fast.",
      "Grip the handles with your wrists stacked over your elbows.",
      "Brace your core and keep your ribs down."
    ],
    "movement": [
      "Press the handles up smoothly until your arms are almost straight.",
      "Stop just short of locking your elbows.",
      "Keep your back against the pad — don't arch.",
      "Lower slowly back to shoulder height.",
      "Breathe out as you press, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Arching the back",
        "w": "Leaning back to press more weight overhead.",
        "f": "Keep your back flat and your ribs down; lower the weight."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders riding up to your ears.",
        "f": "Keep your shoulders down as you press."
      },
      {
        "t": "Going too heavy",
        "w": "The press stalls or your form breaks.",
        "f": "Start lighter than you think — shoulders are small muscles."
      }
    ],
    "alts": [
      {
        "n": "Pec Deck",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Lateral Raise",
        "tag": "Easier",
        "muscle": "Side delts"
      },
      {
        "n": "Pike Push-Up",
        "tag": "No machine",
        "muscle": "Shoulders"
      }
    ],
    "illo": "machine"
  },
  "pec": {
    "key": "pec",
    "name": "Pec Deck",
    "cat": "Chest",
    "area": "Upper",
    "beginner": true,
    "summary": "A seated machine that isolates your chest. You bring two padded arms together in front of you in a hugging motion — very easy to learn.",
    "muscles": [
      {
        "n": "Chest",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": false
      }
    ],
    "map": [
      "chest",
      "shoulders"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Handles at chest height"
      },
      {
        "ic": "hand",
        "k": "Arms",
        "v": "Soft bend in the elbows"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Set the seat so the handles sit around chest height.",
      "Sit back with your back flat against the pad.",
      "Place your forearms or hands on the pads with a soft bend in your elbows.",
      "Pick a light weight to learn the squeeze.",
      "Keep your shoulders down and relaxed."
    ],
    "movement": [
      "Bring the pads together in front of your chest in a smooth arc.",
      "Squeeze your chest at the middle for a moment.",
      "Keep the same soft bend in your elbows throughout.",
      "Let the pads open back slowly until you feel a gentle stretch.",
      "Breathe out as you close, in as you open."
    ],
    "mistakes": [
      {
        "t": "Using too much weight",
        "w": "Shoulders roll forward and you lose the chest.",
        "f": "Lighten up so you feel it in your chest, not your shoulders."
      },
      {
        "t": "Slamming the pads",
        "w": "Letting them snap open and closed.",
        "f": "Move slowly and stay in control both ways."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders creeping up.",
        "f": "Keep them pulled down and back."
      }
    ],
    "alts": [
      {
        "n": "Chest Press",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Cable Fly",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Push-Up",
        "tag": "No machine",
        "muscle": "Chest"
      }
    ],
    "illo": "machine"
  },
  "abductor": {
    "key": "abductor",
    "name": "Hip Abductor",
    "cat": "Glutes",
    "area": "Lower",
    "beginner": true,
    "summary": "A seated machine that trains your outer glutes by pushing your knees apart against pads. Friendly, low-pressure, and great for hip strength.",
    "muscles": [
      {
        "n": "Glutes",
        "primary": true
      }
    ],
    "map": [
      "glutes"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Back flat, knees on the pads"
      },
      {
        "ic": "hand",
        "k": "Pads",
        "v": "Outside of your knees"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Sit back with your back flat against the pad.",
      "Place your knees against the outside pads.",
      "Set the starting width so your knees begin close together.",
      "Choose a light weight to start.",
      "Hold the handles lightly and sit tall."
    ],
    "movement": [
      "Push your knees apart smoothly against the pads.",
      "Pause at the widest point and squeeze your glutes.",
      "Keep your back against the pad — don't lean forward.",
      "Bring your knees back together slowly.",
      "Breathe out as you push out, in as you return."
    ],
    "mistakes": [
      {
        "t": "Using momentum",
        "w": "Bouncing your knees out fast.",
        "f": "Move slowly and feel your glutes working."
      },
      {
        "t": "Leaning forward",
        "w": "Hunching to push harder.",
        "f": "Stay upright with your back on the pad."
      },
      {
        "t": "Half reps",
        "w": "Barely opening your knees.",
        "f": "Use a full, comfortable range."
      }
    ],
    "alts": [
      {
        "n": "Hip Adductor",
        "tag": "Opposite",
        "muscle": "Inner thigh"
      },
      {
        "n": "Glute Bridge",
        "tag": "No machine",
        "muscle": "Glutes"
      },
      {
        "n": "Band Side-Step",
        "tag": "No machine",
        "muscle": "Glutes"
      }
    ],
    "illo": "machine"
  },
  "tri": {
    "key": "tri",
    "name": "Cable Triceps Pushdown",
    "cat": "Arms · Triceps",
    "area": "Upper",
    "beginner": true,
    "summary": "A standing cable exercise that trains the backs of your arms. You push a bar down by straightening your elbows — simple and effective.",
    "muscles": [
      {
        "n": "Triceps",
        "primary": true
      }
    ],
    "map": [
      "triceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Feet shoulder-width, slight lean"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hands on the bar, elbows tucked"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Set the cable pulley to the top and attach a straight or angled bar.",
      "Choose a light weight to learn the motion.",
      "Stand close with feet shoulder-width and a slight forward lean.",
      "Grip the bar with both hands and tuck your elbows to your sides.",
      "Keep your chest up and core braced."
    ],
    "movement": [
      "Push the bar down by straightening your elbows.",
      "Keep your elbows pinned to your sides — only your forearms move.",
      "Squeeze the backs of your arms at the bottom.",
      "Let the bar rise slowly back to chest height.",
      "Breathe out as you push down, in as you return."
    ],
    "mistakes": [
      {
        "t": "Flaring the elbows",
        "w": "Elbows drifting away from your body.",
        "f": "Keep them tucked so your triceps do the work."
      },
      {
        "t": "Using your body",
        "w": "Bending forward to push the weight down.",
        "f": "Stay still and let your arms move."
      },
      {
        "t": "Going too heavy",
        "w": "Shoulders take over the movement.",
        "f": "Lighten up so you feel it in the backs of your arms."
      }
    ],
    "alts": [
      {
        "n": "Bench Dip",
        "tag": "No machine",
        "muscle": "Triceps"
      },
      {
        "n": "Overhead Cable Extension",
        "tag": "Similar",
        "muscle": "Triceps"
      },
      {
        "n": "Close-Grip Push-Up",
        "tag": "No machine",
        "muscle": "Triceps"
      }
    ],
    "illo": "machine"
  },
  "adductor": {
    "key": "adductor",
    "name": "Hip Adductor",
    "cat": "Legs · Inner thigh",
    "area": "Lower",
    "beginner": true,
    "summary": "A seated machine that trains your inner thighs by squeezing your knees together against pads. The opposite of the hip abductor — calm and easy to learn.",
    "muscles": [
      {
        "n": "Inner thighs",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": false
      }
    ],
    "map": [
      "quads",
      "glutes"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Back flat, knees on the inner pads"
      },
      {
        "ic": "hand",
        "k": "Pads",
        "v": "Inside of your knees"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Sit back with your back flat against the pad.",
      "Place your knees against the inside pads with your legs spread comfortably.",
      "Set the starting width so you feel a light, gentle stretch.",
      "Choose a light weight and hold the handles to stay steady."
    ],
    "movement": [
      "Squeeze your knees together smoothly against the pads.",
      "Pause in the middle and feel your inner thighs working.",
      "Keep your back against the pad.",
      "Let your knees open back slowly to the start. Breathe out as you squeeze, in as you open."
    ],
    "mistakes": [
      {
        "t": "Slamming the pads",
        "w": "Letting your knees snap shut and fly open.",
        "f": "Move slowly and control both directions."
      },
      {
        "t": "Starting too wide",
        "w": "An aggressive stretch can strain the inner thigh.",
        "f": "Begin with a moderate width and ease into it."
      },
      {
        "t": "Leaning forward",
        "w": "Hunching to push harder.",
        "f": "Stay upright with your back on the pad."
      }
    ],
    "alts": [
      {
        "n": "Hip Abductor",
        "tag": "Opposite",
        "muscle": "Outer glutes"
      },
      {
        "n": "Sumo Goblet Squat",
        "tag": "No machine",
        "muscle": "Inner thigh"
      },
      {
        "n": "Cossack Squat",
        "tag": "No machine",
        "muscle": "Inner thigh"
      }
    ],
    "illo": "machine"
  },
  "lyingcurl": {
    "key": "lyingcurl",
    "name": "Lying Leg Curl",
    "cat": "Legs · Hamstrings",
    "area": "Lower",
    "beginner": true,
    "summary": "A machine you lie face-down on to train the backs of your thighs. You curl a padded bar toward your glutes with your heels.",
    "muscles": [
      {
        "n": "Hamstrings",
        "primary": true
      },
      {
        "n": "Calves",
        "primary": false
      }
    ],
    "map": [
      "hamstrings",
      "calves"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Position",
        "v": "Lie face-down, hips on the pad"
      },
      {
        "ic": "hand",
        "k": "Pad",
        "v": "Just above your heels"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Lie face-down with your knees just past the edge of the bench.",
      "Set the ankle pad to rest just above your heels.",
      "Line your knees up with the machine's pivot.",
      "Hold the handles and choose a light weight to start."
    ],
    "movement": [
      "Curl the pad up toward your glutes by bending your knees.",
      "Squeeze the backs of your thighs at the top.",
      "Keep your hips pressed into the pad — don't let them lift.",
      "Lower slowly back to the start. Breathe out as you curl, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Hips lifting",
        "w": "Your hips pop up off the pad to swing the weight.",
        "f": "Keep your hips down and lighten the load."
      },
      {
        "t": "Bouncing",
        "w": "Jerking the weight up fast.",
        "f": "Move slowly and control the lower."
      },
      {
        "t": "Half reps",
        "w": "Only curling part-way.",
        "f": "Use a full, comfortable range."
      }
    ],
    "alts": [
      {
        "n": "Seated Leg Curl",
        "tag": "Similar",
        "muscle": "Hamstrings"
      },
      {
        "n": "Glute Bridge",
        "tag": "No machine",
        "muscle": "Hamstrings"
      },
      {
        "n": "Romanian Deadlift",
        "tag": "Harder",
        "muscle": "Hamstrings"
      }
    ],
    "illo": "machine"
  },
  "hack": {
    "key": "hack",
    "name": "Hack Squat",
    "cat": "Legs · Quads",
    "area": "Lower",
    "beginner": true,
    "summary": "An angled machine that guides you through a squat with your back supported. Great for building leg strength once the leg press feels easy.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "quads",
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Back",
        "v": "Shoulders under the pads, back flat"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Shoulder-width on the platform"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Step in and put your shoulders under the pads with your back flat against the backrest.",
      "Place your feet shoulder-width in the middle of the platform.",
      "Start with a light weight to learn the depth.",
      "Release the safety handles and brace your core."
    ],
    "movement": [
      "Bend your knees and lower until your thighs are about parallel.",
      "Keep your heels flat and your back against the pad.",
      "Push through your whole foot to stand back up.",
      "Stop just short of locking your knees. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Knees caving in",
        "w": "Knees drifting toward each other.",
        "f": "Push your knees out in line with your toes."
      },
      {
        "t": "Heels lifting",
        "w": "Rising onto your toes at the bottom.",
        "f": "Keep your whole foot planted; move your feet higher on the platform."
      },
      {
        "t": "Going too deep too soon",
        "w": "Dropping low before you're ready.",
        "f": "Start with a shorter range and build depth over time."
      }
    ],
    "alts": [
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Smith Machine Squat",
        "tag": "Similar",
        "muscle": "Legs"
      },
      {
        "n": "Goblet Squat",
        "tag": "No machine",
        "muscle": "Legs"
      }
    ],
    "illo": "machine"
  },
  "calf": {
    "key": "calf",
    "name": "Calf Raise",
    "cat": "Legs · Calves",
    "area": "Lower",
    "beginner": true,
    "summary": "A machine that trains your calves by rising onto your toes against resistance. Small movement, simple to learn.",
    "muscles": [
      {
        "n": "Calves",
        "primary": true
      }
    ],
    "map": [
      "calves"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Pads on your thighs or shoulders"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Balls of feet on the edge"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Position the pads on your thighs (seated) or shoulders (standing).",
      "Place the balls of your feet on the edge of the platform with your heels hanging off.",
      "Choose a light weight to start.",
      "Sit or stand tall with a braced core."
    ],
    "movement": [
      "Rise up onto your toes as high as you can.",
      "Pause and squeeze your calves at the top.",
      "Lower slowly until you feel a gentle stretch.",
      "Use a full range. Breathe out as you rise, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Bouncing",
        "w": "Using quick bounces instead of control.",
        "f": "Slow down and pause at the top and bottom."
      },
      {
        "t": "Short range",
        "w": "Barely rising or lowering.",
        "f": "Go all the way up and let your heels drop for a stretch."
      },
      {
        "t": "Too heavy",
        "w": "You can only do tiny reps.",
        "f": "Lighten up — calves respond to full, controlled reps."
      }
    ],
    "alts": [
      {
        "n": "Standing Calf Raise",
        "tag": "Similar",
        "muscle": "Calves"
      },
      {
        "n": "Bodyweight Calf Raise",
        "tag": "No machine",
        "muscle": "Calves"
      },
      {
        "n": "Leg Press Calf Press",
        "tag": "Similar",
        "muscle": "Calves"
      }
    ],
    "illo": "machine"
  },
  "assisted": {
    "key": "assisted",
    "name": "Assisted Pull-Up",
    "cat": "Back · Lats",
    "area": "Upper",
    "beginner": true,
    "summary": "A pull-up machine that supports some of your weight with a padded platform, so you can learn pull-ups before doing them unassisted.",
    "muscles": [
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Biceps",
        "primary": false
      }
    ],
    "map": [
      "lats",
      "midback",
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Assist",
        "v": "More weight = more help"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hands wider than shoulders"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Pick plenty of assist to start"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 8"
      }
    ],
    "setup": [
      "Set the assist weight high to start — more weight means more help.",
      "Grip the top handles a bit wider than your shoulders.",
      "Kneel or stand on the padded platform.",
      "Let your arms straighten and pull your shoulders down to begin."
    ],
    "movement": [
      "Pull yourself up by driving your elbows down until your chin nears the bar.",
      "Squeeze your shoulder blades together at the top.",
      "Keep your core tight — don't swing.",
      "Lower yourself slowly until your arms are straight. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Swinging",
        "w": "Kicking your legs to get up.",
        "f": "Stay steady and let your back and arms do the work."
      },
      {
        "t": "Half range",
        "w": "Only pulling part-way up.",
        "f": "Aim to bring your chin toward the bar each rep."
      },
      {
        "t": "Too little assist",
        "w": "You can't complete clean reps.",
        "f": "Add more assist weight until 8 reps feel controlled."
      }
    ],
    "alts": [
      {
        "n": "Lat Pulldown",
        "tag": "Easier",
        "muscle": "Lats"
      },
      {
        "n": "Seated Cable Row",
        "tag": "Similar",
        "muscle": "Back"
      },
      {
        "n": "Band-Assisted Pull-Up",
        "tag": "No machine",
        "muscle": "Back"
      }
    ],
    "illo": "machine"
  },
  "csrow": {
    "key": "csrow",
    "name": "Chest-Supported Row",
    "cat": "Back · Mid-back",
    "area": "Upper",
    "beginner": true,
    "summary": "A row machine with a chest pad that supports your torso, so you can train your mid-back without straining your lower back. Very beginner-friendly.",
    "muscles": [
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Rear delts",
        "primary": false
      }
    ],
    "map": [
      "midback",
      "lats",
      "delts"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Chest flat against the pad"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Handles at chest height"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Adjust the seat so your chest rests flat against the pad and you can reach the handles.",
      "Sit with your chest pressed into the pad and feet planted.",
      "Take the handles with a comfortable grip.",
      "Pull your shoulders down and pick a light weight."
    ],
    "movement": [
      "Pull the handles back by driving your elbows behind you.",
      "Squeeze your shoulder blades together at the end.",
      "Keep your chest on the pad the whole time.",
      "Let the handles travel forward slowly. Breathe out as you pull, in as you return."
    ],
    "mistakes": [
      {
        "t": "Lifting off the pad",
        "w": "Peeling your chest away to pull more.",
        "f": "Keep your chest planted and lower the weight."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders riding up to your ears.",
        "f": "Pull your shoulders down and back as you row."
      },
      {
        "t": "Rushing",
        "w": "Letting the weight snap forward.",
        "f": "Control the return — it's half the rep."
      }
    ],
    "alts": [
      {
        "n": "Seated Cable Row",
        "tag": "Similar",
        "muscle": "Mid-back"
      },
      {
        "n": "Lat Pulldown",
        "tag": "Similar",
        "muscle": "Lats"
      },
      {
        "n": "Resistance-Band Row",
        "tag": "No machine",
        "muscle": "Back"
      }
    ],
    "illo": "machine"
  },
  "latraise": {
    "key": "latraise",
    "name": "Lateral Raise",
    "cat": "Shoulders",
    "area": "Upper",
    "beginner": true,
    "summary": "A machine that trains the sides of your shoulders by raising padded arms out to your sides. Light weights go a long way here.",
    "muscles": [
      {
        "n": "Side delts",
        "primary": true
      }
    ],
    "map": [
      "shoulders"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Pads against your outer arms"
      },
      {
        "ic": "hand",
        "k": "Arms",
        "v": "Soft bend in the elbows"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start very light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Set the seat so the pads sit against the outside of your upper arms.",
      "Sit tall with your back against the pad.",
      "Rest your forearms on the pads with a soft bend in your elbows.",
      "Pick a very light weight — shoulders fatigue fast."
    ],
    "movement": [
      "Lift your arms out to the sides until they're about shoulder height.",
      "Pause briefly at the top.",
      "Keep your shoulders down, not shrugged.",
      "Lower slowly back to the start. Breathe out as you raise, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Shrugging",
        "w": "Using your traps to lift instead of your shoulders.",
        "f": "Keep your shoulders pressed down throughout."
      },
      {
        "t": "Going too heavy",
        "w": "You swing or can't control the lower.",
        "f": "Drop the weight — light and controlled wins here."
      },
      {
        "t": "Lifting too high",
        "w": "Raising your arms well above shoulder height.",
        "f": "Stop around shoulder level."
      }
    ],
    "alts": [
      {
        "n": "Dumbbell Lateral Raise",
        "tag": "Similar",
        "muscle": "Side delts"
      },
      {
        "n": "Cable Lateral Raise",
        "tag": "Similar",
        "muscle": "Side delts"
      },
      {
        "n": "Shoulder Press",
        "tag": "Harder",
        "muscle": "Shoulders"
      }
    ],
    "illo": "machine"
  },
  "bicep": {
    "key": "bicep",
    "name": "Bicep Curl Machine",
    "cat": "Arms · Biceps",
    "area": "Upper",
    "beginner": true,
    "summary": "A seated machine that isolates the fronts of your arms. Your upper arms rest on a pad while you curl the handles up — easy to learn with no balancing.",
    "muscles": [
      {
        "n": "Biceps",
        "primary": true
      }
    ],
    "map": [
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Armpits near the top of the pad"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Palms up on the handles"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Adjust the seat so your upper arms rest flat on the pad and your armpits are near the top.",
      "Sit with your chest up and the backs of your arms on the pad.",
      "Grip the handles with your palms facing up.",
      "Choose a light weight to learn the squeeze."
    ],
    "movement": [
      "Curl the handles up toward your shoulders.",
      "Squeeze your biceps at the top.",
      "Keep your upper arms flat on the pad — only your forearms move.",
      "Lower slowly until your arms are nearly straight. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Lifting off the pad",
        "w": "Elbows rising to help curl.",
        "f": "Keep your upper arms pinned to the pad."
      },
      {
        "t": "Swinging",
        "w": "Using momentum to throw the weight up.",
        "f": "Slow down and control both directions."
      },
      {
        "t": "Half reps",
        "w": "Not straightening at the bottom.",
        "f": "Use a full range — all the way up and down."
      }
    ],
    "alts": [
      {
        "n": "Cable Bicep Curl",
        "tag": "Similar",
        "muscle": "Biceps"
      },
      {
        "n": "Preacher Curl",
        "tag": "Similar",
        "muscle": "Biceps"
      },
      {
        "n": "Resistance-Band Curl",
        "tag": "No machine",
        "muscle": "Biceps"
      }
    ],
    "illo": "machine"
  },
  "abcrunch": {
    "key": "abcrunch",
    "name": "Ab Crunch Machine",
    "cat": "Core",
    "area": "Core",
    "beginner": true,
    "summary": "A seated machine that trains your abs against resistance. You curl your torso forward against a pad — a controlled way to learn core work.",
    "muscles": [
      {
        "n": "Abs",
        "primary": true
      }
    ],
    "map": [],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Pad against your chest/shoulders"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hold the handles lightly"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Adjust the seat so the pad rests against your chest or shoulders.",
      "Sit with your back against the seat and feet hooked under the rollers.",
      "Hold the handles lightly — don't pull with your arms.",
      "Pick a light weight to feel the abs working."
    ],
    "movement": [
      "Curl your torso forward by crunching your ribs toward your hips.",
      "Squeeze your abs at the bottom of the movement.",
      "Keep the motion in your core, not your arms or hips.",
      "Return slowly to the start. Breathe out as you crunch, in as you return."
    ],
    "mistakes": [
      {
        "t": "Pulling with arms",
        "w": "Using the handles to do the work.",
        "f": "Let your abs move the weight; hands just rest."
      },
      {
        "t": "Going too fast",
        "w": "Bouncing through reps.",
        "f": "Slow, controlled crunches you can feel."
      },
      {
        "t": "Too heavy",
        "w": "Your hips and back take over.",
        "f": "Lighten up so it stays in your abs."
      }
    ],
    "alts": [
      {
        "n": "Cable Crunch",
        "tag": "Similar",
        "muscle": "Abs"
      },
      {
        "n": "Plank",
        "tag": "No machine",
        "muscle": "Core"
      },
      {
        "n": "Dead Bug",
        "tag": "No machine",
        "muscle": "Core"
      }
    ],
    "illo": "machine"
  },
  "backext": {
    "key": "backext",
    "name": "Back Extension",
    "cat": "Back · Lower back",
    "area": "Core",
    "beginner": true,
    "summary": "A bench that supports your hips while you bend and straighten at the waist, training your lower back and glutes. Builds the strength behind good posture.",
    "muscles": [
      {
        "n": "Lower back",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "lowerback",
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Hip pad just below your hip bones"
      },
      {
        "ic": "hand",
        "k": "Arms",
        "v": "Crossed on your chest"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Bodyweight to start"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Set the hip pad so it sits just below your hip bones.",
      "Hook your heels under the rollers and lie face-down over the pad.",
      "Cross your arms over your chest.",
      "Start with bodyweight only while you learn the movement."
    ],
    "movement": [
      "Bend forward at your hips until you feel a gentle stretch.",
      "Raise back up until your body is in a straight line — don't over-arch.",
      "Keep your back long and your neck relaxed.",
      "Move slowly. Breathe in as you lower, out as you rise."
    ],
    "mistakes": [
      {
        "t": "Over-arching",
        "w": "Lifting your chest way past straight.",
        "f": "Stop when your body is in a straight line."
      },
      {
        "t": "Jerking up",
        "w": "Using momentum to swing up.",
        "f": "Rise slowly and with control."
      },
      {
        "t": "Adding weight too soon",
        "w": "Holding a plate before form is solid.",
        "f": "Master bodyweight reps first."
      }
    ],
    "alts": [
      {
        "n": "Glute Bridge",
        "tag": "No machine",
        "muscle": "Glutes"
      },
      {
        "n": "Bird Dog",
        "tag": "No machine",
        "muscle": "Lower back"
      },
      {
        "n": "Romanian Deadlift",
        "tag": "Harder",
        "muscle": "Posterior chain"
      }
    ],
    "illo": "machine"
  },
  "bbsquat": {
    "key": "bbsquat",
    "name": "Barbell Back Squat",
    "cat": "Barbell · Legs",
    "area": "Lower",
    "beginner": false,
    "illo": "barbell",
    "summary": "The classic barbell leg builder. You rest a bar across your upper back and squat down and up. Powerful, but worth learning carefully — start with just the bar.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "quads",
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Bar",
        "v": "On your upper back, not your neck"
      },
      {
        "ic": "seat",
        "k": "Feet",
        "v": "Shoulder-width, toes slightly out"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start with the empty bar"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 5–8"
      }
    ],
    "setup": [
      "Set the rack hooks to about chest height and load the bar (start empty).",
      "Step under and rest the bar across your upper-back muscles, not your neck.",
      "Grip the bar evenly, lift it off, and step back with feet shoulder-width.",
      "Brace your core and keep your chest up."
    ],
    "movement": [
      "Push your hips back and bend your knees to lower down.",
      "Go as deep as you can while keeping your back flat.",
      "Drive through your whole foot to stand back up.",
      "Keep your knees tracking over your toes. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Knees caving in",
        "w": "Knees collapsing inward under load.",
        "f": "Push your knees out in line with your toes."
      },
      {
        "t": "Rounding the back",
        "w": "Lower back rounding at the bottom.",
        "f": "Brace your core and only go as low as you can stay flat."
      },
      {
        "t": "Too much weight",
        "w": "Form falls apart fast.",
        "f": "Add weight slowly — master the empty bar first."
      }
    ],
    "alts": [
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Goblet Squat",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Hack Squat",
        "tag": "Similar",
        "muscle": "Quads"
      }
    ]
  },
  "bench": {
    "key": "bench",
    "name": "Barbell Bench Press",
    "cat": "Barbell · Chest",
    "area": "Upper",
    "beginner": false,
    "illo": "barbell",
    "summary": "The main barbell chest exercise. Lying on a bench, you press a bar up from your chest. Use a spotter or the Smith machine while you learn.",
    "muscles": [
      {
        "n": "Chest",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": false
      },
      {
        "n": "Triceps",
        "primary": true
      }
    ],
    "map": [
      "chest",
      "shoulders",
      "triceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Eyes under the bar, feet flat"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Slightly wider than shoulders"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start with the empty bar"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 6–8"
      }
    ],
    "setup": [
      "Lie on the bench with your eyes under the bar and feet flat on the floor.",
      "Grip the bar a little wider than shoulder-width.",
      "Pull your shoulder blades together and lift the bar off the hooks.",
      "Hold it over your chest with straight arms to start."
    ],
    "movement": [
      "Lower the bar slowly to the middle of your chest.",
      "Keep your elbows at about 45 degrees, not flared straight out.",
      "Press the bar back up until your arms are almost straight.",
      "Breathe in as you lower, out as you press."
    ],
    "mistakes": [
      {
        "t": "Bouncing off the chest",
        "w": "Using a bounce to rebound the bar.",
        "f": "Touch lightly and press with control."
      },
      {
        "t": "Flaring elbows",
        "w": "Elbows pointing straight out.",
        "f": "Tuck them to about 45° to protect your shoulders."
      },
      {
        "t": "No spotter",
        "w": "Going heavy alone.",
        "f": "Use a spotter or the Smith machine while learning."
      }
    ],
    "alts": [
      {
        "n": "Chest Press",
        "tag": "Easier",
        "muscle": "Chest"
      },
      {
        "n": "Dumbbell Bench Press",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Push-Up",
        "tag": "No equipment",
        "muscle": "Chest"
      }
    ]
  },
  "deadlift": {
    "key": "deadlift",
    "name": "Barbell Deadlift",
    "cat": "Barbell · Back",
    "area": "Lower",
    "beginner": false,
    "illo": "barbell",
    "summary": "A full-body pull where you lift a loaded bar from the floor by standing up tall. Excellent for your back and legs — technique matters most, so start light.",
    "muscles": [
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": true
      },
      {
        "n": "Lower back",
        "primary": true
      },
      {
        "n": "Lats",
        "primary": false
      }
    ],
    "map": [
      "glutes",
      "hamstrings",
      "lowerback",
      "lats"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Feet hip-width, bar over mid-foot"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hands just outside your knees"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light, focus on form"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 5"
      }
    ],
    "setup": [
      "Stand with feet hip-width and the bar over your mid-foot.",
      "Push your hips back and grip the bar just outside your knees.",
      "Lower your hips, lift your chest, and flatten your back.",
      "Take the slack out of the bar before you pull."
    ],
    "movement": [
      "Push the floor away and stand up, keeping the bar close to your body.",
      "Stand tall — squeeze your glutes at the top, don't lean back.",
      "Lower the bar by pushing your hips back, then bending your knees.",
      "Keep your back flat the whole time. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Rounding the back",
        "w": "The most common deadlift mistake.",
        "f": "Lift your chest and brace before every rep; lighten the load."
      },
      {
        "t": "Bar drifting forward",
        "w": "The bar swings away from your shins.",
        "f": "Keep it dragging close to your legs the whole way."
      },
      {
        "t": "Jerking the weight",
        "w": "Yanking it off the floor.",
        "f": "Build tension first, then push the floor away smoothly."
      }
    ],
    "alts": [
      {
        "n": "Romanian Deadlift",
        "tag": "Similar",
        "muscle": "Hamstrings"
      },
      {
        "n": "Back Extension",
        "tag": "Easier",
        "muscle": "Lower back"
      },
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      }
    ]
  },
  "bbrow": {
    "key": "bbrow",
    "name": "Barbell Row",
    "cat": "Barbell · Back",
    "area": "Upper",
    "beginner": false,
    "illo": "barbell",
    "summary": "A bent-over pull that builds a strong mid-back. You hinge forward and row the bar to your stomach.",
    "muscles": [
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Biceps",
        "primary": false
      }
    ],
    "map": [
      "midback",
      "lats",
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Hinge forward, flat back"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hands shoulder-width"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 8"
      }
    ],
    "setup": [
      "Stand holding the bar with hands about shoulder-width.",
      "Push your hips back and hinge forward to about 45 degrees.",
      "Keep your back flat and your core braced.",
      "Let the bar hang with straight arms to start."
    ],
    "movement": [
      "Row the bar up to your lower stomach, leading with your elbows.",
      "Squeeze your shoulder blades together at the top.",
      "Keep your torso still — don't stand up to lift.",
      "Lower the bar slowly. Breathe out as you row, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Standing up to row",
        "w": "Using your whole body for momentum.",
        "f": "Keep your torso fixed and let your back do the work."
      },
      {
        "t": "Rounding the back",
        "w": "Slumping while bent over.",
        "f": "Keep your chest up and back flat; lighten the load."
      },
      {
        "t": "Pulling too high",
        "w": "Rowing to your chest.",
        "f": "Aim for your lower stomach."
      }
    ],
    "alts": [
      {
        "n": "Seated Cable Row",
        "tag": "Easier",
        "muscle": "Mid-back"
      },
      {
        "n": "Chest-Supported Row",
        "tag": "Easier",
        "muscle": "Mid-back"
      },
      {
        "n": "Dumbbell Row",
        "tag": "Similar",
        "muscle": "Back"
      }
    ]
  },
  "ohp": {
    "key": "ohp",
    "name": "Overhead Press",
    "cat": "Barbell · Shoulders",
    "area": "Upper",
    "beginner": false,
    "illo": "barbell",
    "summary": "A standing press of the bar from your shoulders to overhead. Builds strong shoulders and a stable core.",
    "muscles": [
      {
        "n": "Shoulders",
        "primary": true
      },
      {
        "n": "Triceps",
        "primary": true
      }
    ],
    "map": [
      "shoulders",
      "triceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Feet shoulder-width, core tight"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Just outside your shoulders"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start with the empty bar"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 5–8"
      }
    ],
    "setup": [
      "Set the bar at your shoulders with hands just outside shoulder-width.",
      "Stand with feet shoulder-width and squeeze your glutes and core.",
      "Keep your forearms vertical and elbows slightly in front.",
      "Look straight ahead."
    ],
    "movement": [
      "Press the bar straight up, moving your head back slightly out of the way.",
      "Lock it out overhead with the bar over your mid-foot.",
      "Lower it back to your shoulders with control.",
      "Don't lean back — keep your core tight. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Leaning back",
        "w": "Arching to press more weight.",
        "f": "Squeeze your glutes and keep your ribs down."
      },
      {
        "t": "Pressing around the head",
        "w": "Bar drifts forward.",
        "f": "Move your head back so the bar travels straight up."
      },
      {
        "t": "Too heavy",
        "w": "The press stalls and form breaks.",
        "f": "Start with the empty bar and add slowly."
      }
    ],
    "alts": [
      {
        "n": "Shoulder Press",
        "tag": "Easier",
        "muscle": "Shoulders"
      },
      {
        "n": "Dumbbell Shoulder Press",
        "tag": "Similar",
        "muscle": "Shoulders"
      },
      {
        "n": "Pike Push-Up",
        "tag": "No equipment",
        "muscle": "Shoulders"
      }
    ]
  },
  "dbcurl": {
    "key": "dbcurl",
    "name": "Dumbbell Curl",
    "cat": "Dumbbell · Arms",
    "area": "Upper",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "The simplest arm builder. Hold a dumbbell in each hand and curl them up. Easy to learn anywhere.",
    "muscles": [
      {
        "n": "Biceps",
        "primary": true
      }
    ],
    "map": [
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Stand or sit tall"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Palms facing forward"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Hold a dumbbell in each hand at your sides, palms facing forward.",
      "Stand or sit tall with your elbows tucked to your ribs.",
      "Brace your core and keep your shoulders down.",
      "Choose a light pair to learn the movement."
    ],
    "movement": [
      "Curl the dumbbells up toward your shoulders.",
      "Keep your upper arms still — only your forearms move.",
      "Squeeze your biceps at the top.",
      "Lower slowly until your arms are straight. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Swinging",
        "w": "Using your back to throw the weight up.",
        "f": "Keep your torso still and curl with control."
      },
      {
        "t": "Elbows drifting",
        "w": "Elbows moving forward.",
        "f": "Pin your elbows to your sides."
      },
      {
        "t": "Half reps",
        "w": "Not straightening at the bottom.",
        "f": "Use a full range every rep."
      }
    ],
    "alts": [
      {
        "n": "Bicep Curl Machine",
        "tag": "Similar",
        "muscle": "Biceps"
      },
      {
        "n": "Cable Bicep Curl",
        "tag": "Similar",
        "muscle": "Biceps"
      },
      {
        "n": "Resistance-Band Curl",
        "tag": "No equipment",
        "muscle": "Biceps"
      }
    ]
  },
  "dbpress": {
    "key": "dbpress",
    "name": "Dumbbell Shoulder Press",
    "cat": "Dumbbell · Shoulders",
    "area": "Upper",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A seated or standing press of dumbbells overhead. Friendlier on the shoulders than a barbell because each arm moves freely.",
    "muscles": [
      {
        "n": "Shoulders",
        "primary": true
      },
      {
        "n": "Triceps",
        "primary": true
      }
    ],
    "map": [
      "shoulders",
      "triceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Back supported, dumbbells at shoulders"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Palms forward"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Sit on a bench with back support and a dumbbell in each hand.",
      "Bring the dumbbells up to shoulder height, palms facing forward.",
      "Plant your feet and brace your core.",
      "Keep your wrists stacked over your elbows."
    ],
    "movement": [
      "Press the dumbbells up until your arms are almost straight.",
      "Bring them together slightly at the top without clanking.",
      "Lower slowly back to shoulder height.",
      "Don't arch your back. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Arching the back",
        "w": "Leaning back to press more.",
        "f": "Keep your back on the pad and ribs down."
      },
      {
        "t": "Going too heavy",
        "w": "You can't control the lower.",
        "f": "Start lighter — shoulders fatigue quickly."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders riding up.",
        "f": "Keep them down as you press."
      }
    ],
    "alts": [
      {
        "n": "Shoulder Press",
        "tag": "Easier",
        "muscle": "Shoulders"
      },
      {
        "n": "Overhead Press",
        "tag": "Harder",
        "muscle": "Shoulders"
      },
      {
        "n": "Lateral Raise",
        "tag": "Similar",
        "muscle": "Side delts"
      }
    ]
  },
  "dbrow": {
    "key": "dbrow",
    "name": "Dumbbell Row",
    "cat": "Dumbbell · Back",
    "area": "Upper",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A one-arm row with your other hand braced on a bench. Great for learning to feel your back working, with no balance worries.",
    "muscles": [
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Biceps",
        "primary": false
      }
    ],
    "map": [
      "midback",
      "lats",
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Knee and hand on the bench"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Dumbbell hanging straight down"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10 each side"
      }
    ],
    "setup": [
      "Place one knee and the same-side hand on a bench.",
      "Let the dumbbell hang straight down from your free hand.",
      "Flatten your back so it's roughly parallel to the floor.",
      "Brace your core and keep your shoulders square."
    ],
    "movement": [
      "Row the dumbbell up to your hip, leading with your elbow.",
      "Squeeze your shoulder blade at the top.",
      "Keep your back flat and torso still.",
      "Lower slowly. Breathe out as you row, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Twisting",
        "w": "Rotating your torso to lift more.",
        "f": "Keep your shoulders square to the floor."
      },
      {
        "t": "Shrugging",
        "w": "Pulling with your shoulder up.",
        "f": "Drive your elbow back and down."
      },
      {
        "t": "Using momentum",
        "w": "Yanking the weight up.",
        "f": "Row slowly and feel your back."
      }
    ],
    "alts": [
      {
        "n": "Seated Cable Row",
        "tag": "Similar",
        "muscle": "Mid-back"
      },
      {
        "n": "Chest-Supported Row",
        "tag": "Easier",
        "muscle": "Mid-back"
      },
      {
        "n": "Lat Pulldown",
        "tag": "Similar",
        "muscle": "Lats"
      }
    ]
  },
  "goblet": {
    "key": "goblet",
    "name": "Goblet Squat",
    "cat": "Dumbbell · Legs",
    "area": "Lower",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A squat holding one dumbbell at your chest. The weight in front helps you stay upright — a great first loaded squat.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      }
    ],
    "map": [
      "quads",
      "glutes"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Hold",
        "v": "Dumbbell at your chest"
      },
      {
        "ic": "seat",
        "k": "Feet",
        "v": "Shoulder-width, toes slightly out"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Hold one dumbbell vertically against your chest with both hands.",
      "Stand with feet shoulder-width and toes slightly out.",
      "Lift your chest and brace your core.",
      "Keep your elbows pointing down."
    ],
    "movement": [
      "Push your hips back and bend your knees to squat down.",
      "Keep your chest up and heels flat.",
      "Go as low as you comfortably can.",
      "Drive up through your whole foot. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Heels lifting",
        "w": "Rising onto your toes.",
        "f": "Keep your weight in your heels and mid-foot."
      },
      {
        "t": "Knees caving",
        "w": "Knees collapsing inward.",
        "f": "Push your knees out over your toes."
      },
      {
        "t": "Leaning forward",
        "w": "Chest dropping toward the floor.",
        "f": "Keep the dumbbell tall against your chest."
      }
    ],
    "alts": [
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Barbell Back Squat",
        "tag": "Harder",
        "muscle": "Legs"
      },
      {
        "n": "Bodyweight Squat",
        "tag": "Easier",
        "muscle": "Legs"
      }
    ]
  },
  "bandpull": {
    "key": "bandpull",
    "name": "Band Pull-Apart",
    "cat": "Band · Shoulders",
    "area": "Upper",
    "beginner": true,
    "illo": "band",
    "summary": "Hold a resistance band in front of you and stretch it apart. A simple move for posture and the back of your shoulders — perfect for warming up.",
    "muscles": [
      {
        "n": "Rear delts",
        "primary": true
      },
      {
        "n": "Mid-back",
        "primary": false
      }
    ],
    "map": [
      "delts",
      "midback"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Band at shoulder height, arms straight"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Tall, core braced"
      },
      {
        "ic": "swatch",
        "k": "Band",
        "v": "Start with a light band"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Hold a resistance band with both hands, arms straight out in front at shoulder height.",
      "Stand tall with your core braced.",
      "Start with a light band and a comfortable hand width.",
      "Keep your shoulders down."
    ],
    "movement": [
      "Pull the band apart by moving your hands out to your sides.",
      "Squeeze your shoulder blades together.",
      "Keep your arms straight and at shoulder height.",
      "Return slowly with control. Breathe out as you pull, in as you return."
    ],
    "mistakes": [
      {
        "t": "Shrugging",
        "w": "Shoulders riding up to your ears.",
        "f": "Keep them pulled down throughout."
      },
      {
        "t": "Bending the arms",
        "w": "Elbows collapsing to cheat.",
        "f": "Keep your arms straight."
      },
      {
        "t": "Band too heavy",
        "w": "You can't keep good form.",
        "f": "Use a lighter band and full range."
      }
    ],
    "alts": [
      {
        "n": "Reverse Pec Deck",
        "tag": "Similar",
        "muscle": "Rear delts"
      },
      {
        "n": "Lateral Raise",
        "tag": "Similar",
        "muscle": "Shoulders"
      },
      {
        "n": "Seated Cable Row",
        "tag": "Harder",
        "muscle": "Back"
      }
    ]
  },
  "bandrow": {
    "key": "bandrow",
    "name": "Resistance-Band Row",
    "cat": "Band · Back",
    "area": "Upper",
    "beginner": true,
    "illo": "band",
    "summary": "Anchor a band and row it toward you. A joint-friendly back exercise you can do anywhere, including hotel rooms.",
    "muscles": [
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Biceps",
        "primary": false
      }
    ],
    "map": [
      "midback",
      "lats",
      "biceps"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Anchor",
        "v": "Wrap the band at chest height"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Lean back slightly for tension"
      },
      {
        "ic": "swatch",
        "k": "Band",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Anchor the band around a sturdy post at about chest height.",
      "Hold an end in each hand and step back until there's light tension.",
      "Stand tall with a slight lean back and braced core.",
      "Start with your arms straight out in front."
    ],
    "movement": [
      "Row your hands toward your stomach, leading with your elbows.",
      "Squeeze your shoulder blades together.",
      "Keep your torso still.",
      "Return slowly with control. Breathe out as you pull, in as you return."
    ],
    "mistakes": [
      {
        "t": "Leaning to pull",
        "w": "Using your bodyweight instead of your back.",
        "f": "Keep your torso steady and row with your arms and back."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders rising.",
        "f": "Drive your elbows back and down."
      },
      {
        "t": "Letting it snap back",
        "w": "No control on the return.",
        "f": "Resist the band on the way back."
      }
    ],
    "alts": [
      {
        "n": "Seated Cable Row",
        "tag": "Similar",
        "muscle": "Mid-back"
      },
      {
        "n": "Chest-Supported Row",
        "tag": "Similar",
        "muscle": "Mid-back"
      },
      {
        "n": "Dumbbell Row",
        "tag": "Similar",
        "muscle": "Back"
      }
    ]
  },
  "bandsquat": {
    "key": "bandsquat",
    "name": "Banded Squat",
    "cat": "Band · Legs",
    "area": "Lower",
    "beginner": true,
    "illo": "band",
    "summary": "A squat with a resistance band adding tension. A gentle way to build leg strength with no heavy weights — great for home and travel.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      }
    ],
    "map": [
      "quads",
      "glutes"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stand",
        "v": "Feet on the band, ends at shoulders"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hold the band at your shoulders"
      },
      {
        "ic": "swatch",
        "k": "Band",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Stand on the middle of the band with feet shoulder-width.",
      "Bring the ends up to rest at your shoulders.",
      "Stand tall and brace your core.",
      "Keep your elbows pointing forward."
    ],
    "movement": [
      "Push your hips back and bend your knees to squat down.",
      "Keep your chest up and heels flat.",
      "Drive up through your whole foot against the band.",
      "Push your knees out over your toes. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Knees caving",
        "w": "Knees collapsing in.",
        "f": "Push them out in line with your toes."
      },
      {
        "t": "Leaning forward",
        "w": "Chest dropping.",
        "f": "Keep your chest tall and core braced."
      },
      {
        "t": "Band too short",
        "w": "Too much tension to move well.",
        "f": "Use a lighter band or a wider stance."
      }
    ],
    "alts": [
      {
        "n": "Goblet Squat",
        "tag": "Similar",
        "muscle": "Legs"
      },
      {
        "n": "Leg Press",
        "tag": "Similar",
        "muscle": "Legs"
      },
      {
        "n": "Bodyweight Squat",
        "tag": "Easier",
        "muscle": "Legs"
      }
    ]
  },
  "pushup": {
    "key": "pushup",
    "name": "Push-Up",
    "cat": "Bodyweight · Chest",
    "area": "Upper",
    "beginner": true,
    "illo": "bodyweight",
    "summary": "The classic bodyweight chest exercise. Lower and push your body up from the floor. Scale it on your knees or a bench while you build strength.",
    "muscles": [
      {
        "n": "Chest",
        "primary": true
      },
      {
        "n": "Triceps",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": false
      }
    ],
    "map": [
      "chest",
      "triceps",
      "shoulders"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Hands under shoulders"
      },
      {
        "ic": "hand",
        "k": "Body",
        "v": "Straight line, core tight"
      },
      {
        "ic": "swatch",
        "k": "Scale",
        "v": "Knees or a bench to start"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 8–12"
      }
    ],
    "setup": [
      "Place your hands a bit wider than your shoulders.",
      "Set your body in a straight line from head to heels (or rest on your knees).",
      "Brace your core and squeeze your glutes.",
      "Look at the floor just ahead of you."
    ],
    "movement": [
      "Lower your chest toward the floor by bending your elbows.",
      "Keep your elbows at about 45 degrees, not flared out.",
      "Push back up until your arms are almost straight.",
      "Keep your body straight. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Sagging hips",
        "w": "Hips dropping toward the floor.",
        "f": "Squeeze your glutes and core to stay straight."
      },
      {
        "t": "Flaring elbows",
        "w": "Elbows pointing straight out.",
        "f": "Tuck them to about 45 degrees."
      },
      {
        "t": "Half reps",
        "w": "Not lowering far enough.",
        "f": "Lower until your chest is near the floor (or scale it)."
      }
    ],
    "alts": [
      {
        "n": "Chest Press",
        "tag": "Easier",
        "muscle": "Chest"
      },
      {
        "n": "Pec Deck",
        "tag": "Easier",
        "muscle": "Chest"
      },
      {
        "n": "Barbell Bench Press",
        "tag": "Harder",
        "muscle": "Chest"
      }
    ]
  },
  "plank": {
    "key": "plank",
    "name": "Plank",
    "cat": "Bodyweight · Core",
    "area": "Core",
    "beginner": true,
    "illo": "bodyweight",
    "summary": "A hold that builds your whole core. You support your body in a straight line on your forearms. No movement — just steady tension.",
    "muscles": [
      {
        "n": "Abs",
        "primary": true
      },
      {
        "n": "Core",
        "primary": true
      }
    ],
    "map": [],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Forearms under shoulders"
      },
      {
        "ic": "hand",
        "k": "Body",
        "v": "Straight line, core tight"
      },
      {
        "ic": "swatch",
        "k": "Time",
        "v": "Start with 20–30 seconds"
      },
      {
        "ic": "list",
        "k": "Sets",
        "v": "2–3 holds"
      }
    ],
    "setup": [
      "Rest on your forearms with elbows under your shoulders.",
      "Step your feet back so your body is in a straight line.",
      "Squeeze your glutes and brace your core.",
      "Look at the floor to keep your neck neutral."
    ],
    "movement": [
      "Hold the straight-line position without sagging or piking.",
      "Keep breathing steadily the whole time.",
      "Squeeze your glutes and abs throughout.",
      "Stop when your form starts to break, then rest."
    ],
    "mistakes": [
      {
        "t": "Sagging hips",
        "w": "Lower back dipping toward the floor.",
        "f": "Squeeze your glutes and pull your belly in."
      },
      {
        "t": "Piking up",
        "w": "Hips lifting too high.",
        "f": "Lower your hips to a straight line."
      },
      {
        "t": "Holding your breath",
        "w": "Tensing and forgetting to breathe.",
        "f": "Keep slow, steady breaths."
      }
    ],
    "alts": [
      {
        "n": "Ab Crunch Machine",
        "tag": "Similar",
        "muscle": "Abs"
      },
      {
        "n": "Dead Bug",
        "tag": "Easier",
        "muscle": "Core"
      },
      {
        "n": "Cable Crunch",
        "tag": "Similar",
        "muscle": "Abs"
      }
    ]
  },
  "glutebridge": {
    "key": "glutebridge",
    "name": "Glute Bridge",
    "cat": "Bodyweight · Glutes",
    "area": "Lower",
    "beginner": true,
    "illo": "bodyweight",
    "summary": "Lie on your back and lift your hips to build your glutes. Gentle on the joints and great for learning to use your backside.",
    "muscles": [
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "On your back, knees bent"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Flat, hip-width apart"
      },
      {
        "ic": "swatch",
        "k": "Load",
        "v": "Bodyweight to start"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Lie on your back with your knees bent and feet flat, hip-width apart.",
      "Rest your arms by your sides.",
      "Tuck your chin slightly and brace your core.",
      "Start with bodyweight only."
    ],
    "movement": [
      "Push through your heels to lift your hips toward the ceiling.",
      "Squeeze your glutes hard at the top.",
      "Make a straight line from your knees to your shoulders.",
      "Lower slowly back down. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Arching the back",
        "w": "Over-extending at the top.",
        "f": "Stop at a straight line and squeeze your glutes, not your back."
      },
      {
        "t": "Pushing with toes",
        "w": "Weight shifting forward.",
        "f": "Drive through your heels."
      },
      {
        "t": "Rushing",
        "w": "Bouncing the hips up and down.",
        "f": "Move slowly and squeeze at the top."
      }
    ],
    "alts": [
      {
        "n": "Hip Abductor",
        "tag": "Similar",
        "muscle": "Glutes"
      },
      {
        "n": "Back Extension",
        "tag": "Similar",
        "muscle": "Glutes"
      },
      {
        "n": "Barbell Deadlift",
        "tag": "Harder",
        "muscle": "Posterior chain"
      }
    ]
  },
  "kbswing": {
    "key": "kbswing",
    "name": "Kettlebell Swing",
    "cat": "Kettlebell · Glutes",
    "area": "Lower",
    "beginner": false,
    "illo": "kettlebell",
    "summary": "A dynamic hip-snap that builds power in your glutes and gets your heart rate up. It's a hinge, not a squat — learn the motion light first.",
    "muscles": [
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": true
      },
      {
        "n": "Core",
        "primary": false
      }
    ],
    "map": [
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Feet shoulder-width"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Both hands on the handle"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start with a light bell"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 10–15"
      }
    ],
    "setup": [
      "Stand with feet shoulder-width and the kettlebell a foot in front of you.",
      "Hinge at your hips — push your hips back with soft knees and a flat back — and grab the handle with both hands.",
      "Flatten your back and brace your core.",
      "Hike the bell back between your legs to start."
    ],
    "movement": [
      "Snap your hips forward to swing the bell up to chest height.",
      "Let the power come from your hips, not your arms.",
      "Keep your back flat and core braced throughout.",
      "Let the bell swing back down as you hinge again. Exhale at the top."
    ],
    "mistakes": [
      {
        "t": "Squatting instead of hinging",
        "w": "Bending the knees too much.",
        "f": "Push your hips back — it's a hinge, not a squat."
      },
      {
        "t": "Lifting with arms",
        "w": "Muscling the bell up.",
        "f": "Let your hip snap float the bell up."
      },
      {
        "t": "Rounding the back",
        "w": "Slumping at the bottom.",
        "f": "Keep your chest up and back flat; go lighter."
      }
    ],
    "alts": [
      {
        "n": "Glute Bridge",
        "tag": "Easier",
        "muscle": "Glutes"
      },
      {
        "n": "Romanian Deadlift",
        "tag": "Similar",
        "muscle": "Hamstrings"
      },
      {
        "n": "Barbell Deadlift",
        "tag": "Harder",
        "muscle": "Posterior chain"
      }
    ]
  },
  "smith": {
    "key": "smith",
    "name": "Smith Machine",
    "cat": "Machine · Legs",
    "area": "Lower",
    "beginner": true,
    "illo": "barbell",
    "summary": "A barbell fixed on vertical rails so it only moves straight up and down. The guided path makes squats and presses easier to learn than a free barbell.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "quads",
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Bar",
        "v": "On your upper back, hooks set"
      },
      {
        "ic": "seat",
        "k": "Feet",
        "v": "Slightly in front of you"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start with the empty bar"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 8–10"
      }
    ],
    "setup": [
      "Set the safety hooks to about waist height.",
      "Rest the bar across your upper back and unhook it with a small twist.",
      "Place your feet a little in front of your body, shoulder-width.",
      "Brace your core and keep your chest up."
    ],
    "movement": [
      "Bend your knees and hips to squat down along the fixed path.",
      "Keep your whole foot planted and back flat.",
      "Drive up to stand, stopping short of locking your knees.",
      "Re-hook the bar by twisting your wrists. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Feet too far back",
        "w": "Knees travel too far forward.",
        "f": "Set your feet slightly in front so you can sit back."
      },
      {
        "t": "Forgetting the hooks",
        "w": "Can't rack the bar when tired.",
        "f": "Practice the twist-to-rack before you fatigue."
      },
      {
        "t": "Too much weight",
        "w": "The fixed path tempts heavy loads.",
        "f": "Build up slowly with good depth and control."
      }
    ],
    "alts": [
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Hack Squat",
        "tag": "Similar",
        "muscle": "Quads"
      },
      {
        "n": "Barbell Back Squat",
        "tag": "Harder",
        "muscle": "Legs"
      }
    ]
  },
  "cablefly": {
    "key": "cablefly",
    "name": "Cable Fly",
    "cat": "Cable · Chest",
    "area": "Upper",
    "beginner": true,
    "illo": "cable",
    "summary": "A cable exercise that isolates your chest with a wide hugging motion. The constant cable tension makes it great for feeling your chest work.",
    "muscles": [
      {
        "n": "Chest",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": false
      }
    ],
    "map": [
      "chest",
      "shoulders"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "A handle in each hand"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Staggered, slight forward lean"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Set both pulleys to about shoulder height and attach handles.",
      "Take a handle in each hand and step forward into a staggered stance.",
      "Lean slightly forward with a soft bend in your elbows.",
      "Pick a light weight to learn the squeeze."
    ],
    "movement": [
      "Bring your hands together in front of your chest in an arc.",
      "Squeeze your chest at the middle.",
      "Keep the same soft elbow bend throughout.",
      "Open your arms back slowly until you feel a gentle stretch. Breathe out in, in out."
    ],
    "mistakes": [
      {
        "t": "Bending the arms",
        "w": "Turning it into a press.",
        "f": "Keep a fixed soft elbow bend and move from the shoulders."
      },
      {
        "t": "Going too heavy",
        "w": "Shoulders take over.",
        "f": "Lighten up so you feel your chest."
      },
      {
        "t": "Rushing",
        "w": "Letting the cables snap back.",
        "f": "Control the stretch on the way out."
      }
    ],
    "alts": [
      {
        "n": "Pec Deck",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Chest Press",
        "tag": "Easier",
        "muscle": "Chest"
      },
      {
        "n": "Push-Up",
        "tag": "No equipment",
        "muscle": "Chest"
      }
    ]
  },
  "revpec": {
    "key": "revpec",
    "name": "Reverse Pec Deck",
    "cat": "Shoulders · Rear delts",
    "area": "Upper",
    "beginner": true,
    "illo": "pecdeck",
    "summary": "The pec deck run backwards — you push the arms apart behind you to train the back of your shoulders and improve posture.",
    "muscles": [
      {
        "n": "Rear delts",
        "primary": true
      },
      {
        "n": "Mid-back",
        "primary": false
      }
    ],
    "map": [
      "delts",
      "midback"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Chest against the pad"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Arms out in front to start"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Set the handles to the front position and the seat so they're at shoulder height.",
      "Sit facing the pad with your chest against it.",
      "Grab the handles with your arms straight out in front.",
      "Pick a light weight and keep your shoulders down."
    ],
    "movement": [
      "Push the handles apart and back in a wide arc.",
      "Squeeze your shoulder blades together at the end.",
      "Keep a soft bend in your elbows.",
      "Return slowly to the front. Breathe out as you open, in as you return."
    ],
    "mistakes": [
      {
        "t": "Using too much weight",
        "w": "Shrugging and jerking.",
        "f": "Lighten up and move smoothly."
      },
      {
        "t": "Bending the arms",
        "w": "Turning it into a row.",
        "f": "Keep your arms long with a fixed elbow bend."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders rising.",
        "f": "Keep them pulled down."
      }
    ],
    "alts": [
      {
        "n": "Band Pull-Apart",
        "tag": "Easier",
        "muscle": "Rear delts"
      },
      {
        "n": "Lateral Raise",
        "tag": "Similar",
        "muscle": "Shoulders"
      },
      {
        "n": "Chest-Supported Row",
        "tag": "Harder",
        "muscle": "Back"
      }
    ]
  },
  "incline": {
    "key": "incline",
    "name": "Incline Chest Press",
    "cat": "Machine · Chest",
    "area": "Upper",
    "beginner": true,
    "illo": "press",
    "summary": "A chest press on an upward angle, which shifts the work to your upper chest and shoulders. The seat keeps you supported throughout.",
    "muscles": [
      {
        "n": "Upper chest",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": true
      },
      {
        "n": "Triceps",
        "primary": false
      }
    ],
    "map": [
      "chest",
      "shoulders",
      "triceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Handles at upper-chest height"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Wrists straight, elbows ~45°"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Adjust the seat so the handles line up with your upper chest.",
      "Sit back with your whole back on the pad.",
      "Grip the handles with straight wrists.",
      "Pull your shoulders down and back to brace."
    ],
    "movement": [
      "Press the handles up and forward until your arms are almost straight.",
      "Stop just short of locking your elbows.",
      "Keep your back on the pad.",
      "Lower slowly until you feel a gentle chest stretch. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Flaring elbows",
        "w": "Elbows straight out.",
        "f": "Tuck to about 45 degrees."
      },
      {
        "t": "Arching off the seat",
        "w": "Lifting your back to push more.",
        "f": "Keep your back flat and lighten up."
      },
      {
        "t": "Locking out hard",
        "w": "Snapping the elbows.",
        "f": "Stop just short of lock."
      }
    ],
    "alts": [
      {
        "n": "Chest Press",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Shoulder Press",
        "tag": "Similar",
        "muscle": "Shoulders"
      },
      {
        "n": "Pec Deck",
        "tag": "Easier",
        "muscle": "Chest"
      }
    ]
  },
  "cablelat": {
    "key": "cablelat",
    "name": "Cable Lateral Raise",
    "cat": "Cable · Shoulders",
    "area": "Upper",
    "beginner": true,
    "illo": "cable",
    "summary": "A one-arm raise using a low cable to build the side of your shoulders, with smooth constant tension the whole way.",
    "muscles": [
      {
        "n": "Side delts",
        "primary": true
      }
    ],
    "map": [
      "shoulders"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Handle in the far hand"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Side-on to the cable"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start very light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12 each side"
      }
    ],
    "setup": [
      "Set the pulley to the lowest position with a single handle.",
      "Stand side-on and hold the handle in your outside hand.",
      "Let your arm hang across your body with a soft elbow bend.",
      "Pick a very light weight."
    ],
    "movement": [
      "Raise your arm out to the side up to shoulder height.",
      "Keep your shoulder down, not shrugged.",
      "Pause briefly at the top.",
      "Lower slowly with control. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Shrugging",
        "w": "Traps doing the work.",
        "f": "Keep your shoulder pressed down."
      },
      {
        "t": "Swinging",
        "w": "Using your body to fling the weight.",
        "f": "Stand still and move only your arm."
      },
      {
        "t": "Too heavy",
        "w": "Form breaks immediately.",
        "f": "Go lighter than you'd expect."
      }
    ],
    "alts": [
      {
        "n": "Lateral Raise",
        "tag": "Similar",
        "muscle": "Side delts"
      },
      {
        "n": "Dumbbell Lateral Raise",
        "tag": "Similar",
        "muscle": "Side delts"
      },
      {
        "n": "Shoulder Press",
        "tag": "Harder",
        "muscle": "Shoulders"
      }
    ]
  },
  "preacher": {
    "key": "preacher",
    "name": "Preacher Curl",
    "cat": "Machine · Arms",
    "area": "Upper",
    "beginner": true,
    "illo": "legseat",
    "summary": "A curl done with your arms resting on an angled pad, which stops you cheating and really targets your biceps.",
    "muscles": [
      {
        "n": "Biceps",
        "primary": true
      }
    ],
    "map": [
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Armpits over the top of the pad"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Palms up on the bar"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Adjust the seat so your armpits rest over the top edge of the pad.",
      "Rest the backs of your upper arms flat on the pad.",
      "Grip the bar or handles with your palms up.",
      "Pick a light weight to learn the range."
    ],
    "movement": [
      "Curl the weight up toward your shoulders.",
      "Squeeze your biceps at the top.",
      "Keep your upper arms flat on the pad.",
      "Lower slowly until your arms are nearly straight. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Bouncing at the bottom",
        "w": "Jerking out of the stretch.",
        "f": "Pause and control the bottom — it's the hardest part."
      },
      {
        "t": "Lifting off the pad",
        "w": "Elbows rising to help.",
        "f": "Keep your arms pinned to the pad."
      },
      {
        "t": "Half reps",
        "w": "Not straightening fully.",
        "f": "Use a full, controlled range."
      }
    ],
    "alts": [
      {
        "n": "Bicep Curl Machine",
        "tag": "Similar",
        "muscle": "Biceps"
      },
      {
        "n": "Dumbbell Curl",
        "tag": "Easier",
        "muscle": "Biceps"
      },
      {
        "n": "Cable Bicep Curl",
        "tag": "Similar",
        "muscle": "Biceps"
      }
    ]
  },
  "seatedcalf": {
    "key": "seatedcalf",
    "name": "Seated Calf Raise",
    "cat": "Machine · Calves",
    "area": "Lower",
    "beginner": true,
    "illo": "calf",
    "summary": "A seated machine that targets your calves with a pad across your thighs. You press up onto your toes against the weight.",
    "muscles": [
      {
        "n": "Calves",
        "primary": true
      }
    ],
    "map": [
      "calves"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Pad snug on your lower thighs"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Balls of feet on the platform"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Sit down and place the balls of your feet on the platform with heels hanging off.",
      "Lower the thigh pad so it sits snug just above your knees.",
      "Release the safety and pick a light weight.",
      "Sit tall with a braced core."
    ],
    "movement": [
      "Press up onto your toes as high as you can.",
      "Squeeze your calves at the top.",
      "Lower slowly until you feel a stretch.",
      "Use a full range. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Bouncing",
        "w": "Quick reps with no control.",
        "f": "Pause at the top and bottom."
      },
      {
        "t": "Short range",
        "w": "Tiny up-and-down.",
        "f": "Rise high and stretch low."
      },
      {
        "t": "Too heavy",
        "w": "Only partial reps possible.",
        "f": "Lighten up for full reps."
      }
    ],
    "alts": [
      {
        "n": "Calf Raise",
        "tag": "Similar",
        "muscle": "Calves"
      },
      {
        "n": "Standing Calf Raise",
        "tag": "Similar",
        "muscle": "Calves"
      },
      {
        "n": "Bodyweight Calf Raise",
        "tag": "No equipment",
        "muscle": "Calves"
      }
    ]
  },
  "standcalf": {
    "key": "standcalf",
    "name": "Standing Calf Raise",
    "cat": "Machine · Calves",
    "area": "Lower",
    "beginner": true,
    "illo": "calf",
    "summary": "A standing machine with shoulder pads that trains your calves through a big range. You rise onto your toes against the load.",
    "muscles": [
      {
        "n": "Calves",
        "primary": true
      }
    ],
    "map": [
      "calves"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Shoulders under the pads"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Balls of feet on the platform"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Set the shoulder pads to your height and step onto the platform.",
      "Place the balls of your feet on the edge with heels hanging off.",
      "Stand tall under the pads and brace your core.",
      "Pick a light weight to start."
    ],
    "movement": [
      "Rise up onto your toes as high as you can.",
      "Squeeze your calves at the top.",
      "Lower slowly until you feel a stretch in your calves.",
      "Keep your knees straight but not locked. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Bending the knees",
        "w": "Turning it into a partial squat.",
        "f": "Keep your legs straight so your calves do the work."
      },
      {
        "t": "Bouncing",
        "w": "Using momentum.",
        "f": "Pause at the top and bottom."
      },
      {
        "t": "Short range",
        "w": "Not stretching at the bottom.",
        "f": "Let your heels drop for a full stretch."
      }
    ],
    "alts": [
      {
        "n": "Seated Calf Raise",
        "tag": "Similar",
        "muscle": "Calves"
      },
      {
        "n": "Calf Raise",
        "tag": "Similar",
        "muscle": "Calves"
      },
      {
        "n": "Leg Press Calf Press",
        "tag": "Similar",
        "muscle": "Calves"
      }
    ]
  },
  "rdl": {
    "key": "rdl",
    "name": "Romanian Deadlift",
    "cat": "Barbell · Hamstrings",
    "area": "Lower",
    "beginner": false,
    "illo": "barbell",
    "summary": "A hip hinge with a barbell that builds your hamstrings and glutes. You lower the bar by pushing your hips back, keeping your legs mostly straight.",
    "muscles": [
      {
        "n": "Hamstrings",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Lower back",
        "primary": false
      }
    ],
    "map": [
      "hamstrings",
      "glutes",
      "lowerback"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hands shoulder-width"
      },
      {
        "ic": "seat",
        "k": "Legs",
        "v": "Soft knees, hips push back"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 8"
      }
    ],
    "setup": [
      "Hold the bar at your hips with hands about shoulder-width.",
      "Stand with feet hip-width and a soft bend in your knees.",
      "Pull your shoulders down and brace your core.",
      "Keep the bar close to your legs."
    ],
    "movement": [
      "Push your hips back to lower the bar down your thighs.",
      "Keep your back flat and a soft knee bend the whole time.",
      "Lower until you feel a stretch in your hamstrings.",
      "Drive your hips forward to stand tall. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Rounding the back",
        "w": "Back bending as you lower.",
        "f": "Keep your chest up and back flat; only go as low as you can stay flat."
      },
      {
        "t": "Squatting it down",
        "w": "Bending the knees too much.",
        "f": "Push your hips back — it's a hinge, not a squat."
      },
      {
        "t": "Bar drifting away",
        "w": "Bar swings forward.",
        "f": "Keep it grazing your legs."
      }
    ],
    "alts": [
      {
        "n": "Seated Leg Curl",
        "tag": "Easier",
        "muscle": "Hamstrings"
      },
      {
        "n": "Barbell Deadlift",
        "tag": "Similar",
        "muscle": "Posterior chain"
      },
      {
        "n": "Glute Bridge",
        "tag": "Easier",
        "muscle": "Glutes"
      }
    ]
  },
  "dblunge": {
    "key": "dblunge",
    "name": "Dumbbell Lunge",
    "cat": "Dumbbell · Legs",
    "area": "Lower",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A stepping leg exercise holding a dumbbell in each hand. It builds single-leg strength and balance — start with bodyweight if needed.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "quads",
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Hold",
        "v": "A dumbbell in each hand"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Step forward, tall torso"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light or bodyweight"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10 each leg"
      }
    ],
    "setup": [
      "Hold a dumbbell in each hand at your sides.",
      "Stand tall with your feet hip-width and core braced.",
      "Look straight ahead.",
      "Start light or with no weight while you learn balance."
    ],
    "movement": [
      "Step forward and lower until both knees are about 90 degrees.",
      "Keep your front knee over your ankle and torso tall.",
      "Push through your front foot to step back to the start.",
      "Alternate legs. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Front knee caving in",
        "w": "Knee drifting inward.",
        "f": "Track your knee over your toes."
      },
      {
        "t": "Leaning forward",
        "w": "Chest dropping over the front leg.",
        "f": "Keep your torso tall."
      },
      {
        "t": "Steps too short",
        "w": "Knee shoots past your toes.",
        "f": "Take a longer step."
      }
    ],
    "alts": [
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Goblet Squat",
        "tag": "Similar",
        "muscle": "Legs"
      },
      {
        "n": "Bodyweight Lunge",
        "tag": "Easier",
        "muscle": "Legs"
      }
    ]
  },
  "dblat": {
    "key": "dblat",
    "name": "Dumbbell Lateral Raise",
    "cat": "Dumbbell · Shoulders",
    "area": "Upper",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "Raise a dumbbell out to each side to build the width of your shoulders. Light weights and control are the whole game here.",
    "muscles": [
      {
        "n": "Side delts",
        "primary": true
      }
    ],
    "map": [
      "shoulders"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "A dumbbell in each hand"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Tall, slight elbow bend"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start very light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Hold a light dumbbell in each hand at your sides.",
      "Stand tall with a soft bend in your elbows.",
      "Keep your shoulders down and core braced.",
      "Start lighter than you think you need."
    ],
    "movement": [
      "Raise both arms out to the sides up to shoulder height.",
      "Lead with your elbows, not your hands.",
      "Pause briefly at the top.",
      "Lower slowly with control. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Shrugging",
        "w": "Traps lifting the weight.",
        "f": "Keep your shoulders pressed down."
      },
      {
        "t": "Swinging",
        "w": "Using momentum.",
        "f": "Move slowly and stand still."
      },
      {
        "t": "Going too heavy",
        "w": "Form falls apart.",
        "f": "Lighten up — these stay light."
      }
    ],
    "alts": [
      {
        "n": "Lateral Raise",
        "tag": "Similar",
        "muscle": "Side delts"
      },
      {
        "n": "Cable Lateral Raise",
        "tag": "Similar",
        "muscle": "Side delts"
      },
      {
        "n": "Shoulder Press",
        "tag": "Harder",
        "muscle": "Shoulders"
      }
    ]
  },
  "hipthrust": {
    "key": "hipthrust",
    "name": "Hip Thrust Machine",
    "cat": "Machine · Glutes",
    "area": "Lower",
    "beginner": true,
    "illo": "bench",
    "summary": "A machine that loads your hips while your upper back rests on a pad. You drive your hips up to build strong glutes — very beginner-friendly.",
    "muscles": [
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Upper back on the pad, belt at hips"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Flat, hip-width"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Sit on the machine and rest your upper back against the pad.",
      "Position the load pad or belt across your hips.",
      "Plant your feet flat, hip-width apart.",
      "Pick a light weight to learn the squeeze."
    ],
    "movement": [
      "Drive your hips up by squeezing your glutes.",
      "Make a straight line from your knees to your shoulders.",
      "Pause and squeeze at the top.",
      "Lower slowly back down. Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Arching the back",
        "w": "Over-extending at the top.",
        "f": "Stop at a straight line; squeeze your glutes, not your back."
      },
      {
        "t": "Pushing through your toes",
        "w": "Heels lifting.",
        "f": "Drive through your heels."
      },
      {
        "t": "Half reps",
        "w": "Not reaching full extension.",
        "f": "Lock your hips out and squeeze each rep."
      }
    ],
    "alts": [
      {
        "n": "Glute Bridge",
        "tag": "Easier",
        "muscle": "Glutes"
      },
      {
        "n": "Hip Abductor",
        "tag": "Similar",
        "muscle": "Glutes"
      },
      {
        "n": "Romanian Deadlift",
        "tag": "Harder",
        "muscle": "Glutes"
      }
    ]
  },
  "cablecrunch": {
    "key": "cablecrunch",
    "name": "Cable Crunch",
    "cat": "Cable · Core",
    "area": "Core",
    "beginner": true,
    "illo": "cable",
    "summary": "A kneeling ab exercise where you crunch down against a high cable. The resistance lets you train your abs more than bodyweight crunches.",
    "muscles": [
      {
        "n": "Abs",
        "primary": true
      }
    ],
    "map": [],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Kneel below a high pulley"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Rope by your head"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Attach a rope to a high pulley and kneel below it.",
      "Hold the rope ends by the sides of your head.",
      "Brace your core and keep your hips still.",
      "Pick a light weight to feel your abs."
    ],
    "movement": [
      "Crunch down by curling your ribs toward your hips.",
      "Squeeze your abs at the bottom.",
      "Keep the motion in your core, not your arms or hips.",
      "Return slowly to the start. Breathe out as you crunch, in as you return."
    ],
    "mistakes": [
      {
        "t": "Pulling with arms",
        "w": "Using your arms instead of abs.",
        "f": "Keep your hands fixed by your head and crunch with your core."
      },
      {
        "t": "Sitting back",
        "w": "Hinging at the hips.",
        "f": "Keep your hips still and curl your spine."
      },
      {
        "t": "Too heavy",
        "w": "It becomes a back row.",
        "f": "Lighten up so you feel it in your abs."
      }
    ],
    "alts": [
      {
        "n": "Ab Crunch Machine",
        "tag": "Similar",
        "muscle": "Abs"
      },
      {
        "n": "Plank",
        "tag": "No equipment",
        "muscle": "Core"
      },
      {
        "n": "Dead Bug",
        "tag": "No equipment",
        "muscle": "Core"
      }
    ]
  },
  "glutekick": {
    "key": "glutekick",
    "name": "Glute Kickback",
    "cat": "Machine · Glutes",
    "area": "Lower",
    "beginner": true,
    "illo": "legseat",
    "summary": "A machine that isolates one glute at a time as you press your foot back against a pad. Easy to learn and great for building your backside.",
    "muscles": [
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Chest on the pad, foot on the lever"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Hold the handles"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12 each side"
      }
    ],
    "setup": [
      "Rest your chest against the pad and place one foot on the lever.",
      "Hold the handles and brace your core.",
      "Set a light weight to learn the squeeze."
    ],
    "movement": [
      "Press your foot back and up by squeezing your glute.",
      "Pause and squeeze at the top.",
      "Return slowly without letting the weight drop.",
      "Breathe out as you press back, in as you return."
    ],
    "mistakes": [
      {
        "t": "Arching the back",
        "w": "Using your lower back to lift.",
        "f": "Keep your core braced and move from the hip."
      },
      {
        "t": "Rushing",
        "w": "Swinging the leg.",
        "f": "Slow down and feel the glute."
      },
      {
        "t": "Too heavy",
        "w": "Form breaks down.",
        "f": "Lighten up for full range."
      }
    ],
    "alts": [
      {
        "n": "Glute Bridge",
        "tag": "No machine",
        "muscle": "Glutes"
      },
      {
        "n": "Hip Thrust Machine",
        "tag": "Similar",
        "muscle": "Glutes"
      },
      {
        "n": "Cable Pull-Through",
        "tag": "Similar",
        "muscle": "Glutes"
      }
    ]
  },
  "pullthrough": {
    "key": "pullthrough",
    "name": "Cable Pull-Through",
    "cat": "Cable · Glutes",
    "area": "Lower",
    "beginner": true,
    "illo": "cable",
    "summary": "A hip hinge using a low cable between your legs. It teaches the hinge pattern and builds your glutes and hamstrings with light, joint-friendly load.",
    "muscles": [
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": true
      }
    ],
    "map": [
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Facing away, rope between legs"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Rope in both hands"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Attach a rope to the low pulley and face away from the machine.",
      "Hold the rope between your legs and step forward for tension.",
      "Stand with feet shoulder-width and soft knees."
    ],
    "movement": [
      "Push your hips back, letting the rope travel between your legs.",
      "Drive your hips forward to stand tall and squeeze your glutes.",
      "Keep your back flat the whole time.",
      "Breathe in as you hinge, out as you stand."
    ],
    "mistakes": [
      {
        "t": "Squatting",
        "w": "Bending the knees too much.",
        "f": "Push your hips back — it's a hinge."
      },
      {
        "t": "Rounding the back",
        "w": "Back bending at the bottom.",
        "f": "Keep your chest up and back flat."
      },
      {
        "t": "Using arms",
        "w": "Pulling with your arms.",
        "f": "Let your hips do the work; arms just hold."
      }
    ],
    "alts": [
      {
        "n": "Romanian Deadlift",
        "tag": "Harder",
        "muscle": "Hamstrings"
      },
      {
        "n": "Glute Bridge",
        "tag": "Easier",
        "muscle": "Glutes"
      },
      {
        "n": "Hip Thrust Machine",
        "tag": "Similar",
        "muscle": "Glutes"
      }
    ]
  },
  "rotary": {
    "key": "rotary",
    "name": "Rotary Torso",
    "cat": "Machine · Core",
    "area": "Core",
    "beginner": true,
    "illo": "legseat",
    "summary": "A seated machine that trains the sides of your core by rotating your torso against resistance. Keep it light and controlled.",
    "muscles": [
      {
        "n": "Obliques",
        "primary": true
      },
      {
        "n": "Abs",
        "primary": false
      }
    ],
    "map": [],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Locked in, chest on the pad"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Arms on the pads"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start very light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12 each way"
      }
    ],
    "setup": [
      "Sit and secure your legs so your hips stay still.",
      "Rest your chest and arms against the pads.",
      "Choose a very light weight."
    ],
    "movement": [
      "Rotate your torso smoothly to one side.",
      "Keep the movement in your core, not your arms.",
      "Return slowly to center, then repeat the other way.",
      "Breathe out as you rotate, in as you return."
    ],
    "mistakes": [
      {
        "t": "Going too heavy",
        "w": "Jerking your spine around.",
        "f": "Lighten up — the lower back doesn't like heavy twisting."
      },
      {
        "t": "Using arms",
        "w": "Pushing with the arms.",
        "f": "Rotate from your waist."
      },
      {
        "t": "Rushing",
        "w": "Fast twists.",
        "f": "Move slowly and controlled."
      }
    ],
    "alts": [
      {
        "n": "Plank",
        "tag": "No machine",
        "muscle": "Core"
      },
      {
        "n": "Cable Crunch",
        "tag": "Similar",
        "muscle": "Abs"
      },
      {
        "n": "Ab Crunch Machine",
        "tag": "Similar",
        "muscle": "Abs"
      }
    ]
  },
  "tbar": {
    "key": "tbar",
    "name": "T-Bar Row",
    "cat": "Machine · Back",
    "area": "Upper",
    "beginner": false,
    "illo": "row",
    "summary": "A supported rowing machine that builds thickness in your mid-back. You pull a weighted handle toward your chest while bent over a pad.",
    "muscles": [
      {
        "n": "Mid-back",
        "primary": true
      },
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Biceps",
        "primary": false
      }
    ],
    "map": [
      "midback",
      "lats",
      "biceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Chest on the pad, feet planted"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Both hands on the handle"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 10"
      }
    ],
    "setup": [
      "Set your chest against the pad and plant your feet.",
      "Grab the handle with both hands and let your arms hang.",
      "Brace your core and keep your back flat."
    ],
    "movement": [
      "Pull the handle toward your chest, leading with your elbows.",
      "Squeeze your shoulder blades together.",
      "Lower slowly until your arms are straight.",
      "Breathe out as you pull, in as you lower."
    ],
    "mistakes": [
      {
        "t": "Lifting off the pad",
        "w": "Peeling your chest away.",
        "f": "Keep your chest planted and lighten the load."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders rising.",
        "f": "Drive your elbows back and down."
      },
      {
        "t": "Half reps",
        "w": "Short pulls.",
        "f": "Use a full range."
      }
    ],
    "alts": [
      {
        "n": "Seated Cable Row",
        "tag": "Easier",
        "muscle": "Mid-back"
      },
      {
        "n": "Chest-Supported Row",
        "tag": "Easier",
        "muscle": "Mid-back"
      },
      {
        "n": "Barbell Row",
        "tag": "Harder",
        "muscle": "Back"
      }
    ]
  },
  "pullover": {
    "key": "pullover",
    "name": "Pullover Machine",
    "cat": "Machine · Back",
    "area": "Upper",
    "beginner": true,
    "illo": "pecdeck",
    "summary": "A machine that trains your lats with a big arcing pull from overhead down to your hips. A unique angle that's friendly on the joints.",
    "muscles": [
      {
        "n": "Lats",
        "primary": true
      },
      {
        "n": "Chest",
        "primary": false
      }
    ],
    "map": [
      "lats",
      "chest"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Elbows on the pads"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Light grip on the bar"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 12"
      }
    ],
    "setup": [
      "Set the seat so your shoulders line up with the pivot.",
      "Rest your elbows or hands on the pads with the bar overhead.",
      "Pick a light weight to learn the arc."
    ],
    "movement": [
      "Pull the bar down and forward toward your hips.",
      "Lead with your elbows and feel your lats.",
      "Return slowly to the overhead stretch.",
      "Breathe out as you pull, in as you return."
    ],
    "mistakes": [
      {
        "t": "Using your arms",
        "w": "Bending the elbows to pull.",
        "f": "Keep your arms long and pull from your back."
      },
      {
        "t": "Too heavy",
        "w": "Shoulders take over.",
        "f": "Lighten up so you feel your lats."
      },
      {
        "t": "Rushing the stretch",
        "w": "Dropping back fast.",
        "f": "Control the overhead stretch."
      }
    ],
    "alts": [
      {
        "n": "Lat Pulldown",
        "tag": "Similar",
        "muscle": "Lats"
      },
      {
        "n": "Straight-Arm Pulldown",
        "tag": "Similar",
        "muscle": "Lats"
      },
      {
        "n": "Assisted Pull-Up",
        "tag": "Harder",
        "muscle": "Back"
      }
    ]
  },
  "dipmachine": {
    "key": "dipmachine",
    "name": "Seated Dip Machine",
    "cat": "Machine · Arms",
    "area": "Upper",
    "beginner": true,
    "illo": "press",
    "summary": "A seated machine that trains the backs of your arms and lower chest by pressing handles down. Supported and easy to control.",
    "muscles": [
      {
        "n": "Triceps",
        "primary": true
      },
      {
        "n": "Chest",
        "primary": false
      },
      {
        "n": "Front delts",
        "primary": false
      }
    ],
    "map": [
      "triceps",
      "chest",
      "shoulders"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Seat",
        "v": "Back flat, handles by your sides"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Neutral grip on the handles"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Adjust the seat so the handles sit by your lower chest.",
      "Sit back with your whole back on the pad.",
      "Take the handles with a neutral grip."
    ],
    "movement": [
      "Press the handles down until your arms are almost straight.",
      "Keep your elbows close to your body.",
      "Return slowly until you feel a gentle stretch.",
      "Breathe out as you press, in as you return."
    ],
    "mistakes": [
      {
        "t": "Flaring elbows",
        "w": "Elbows winging out.",
        "f": "Keep them tucked to your sides."
      },
      {
        "t": "Locking out hard",
        "w": "Snapping the elbows.",
        "f": "Stop just short of lock."
      },
      {
        "t": "Lifting off the seat",
        "w": "Arching to press.",
        "f": "Keep your back flat."
      }
    ],
    "alts": [
      {
        "n": "Cable Triceps Pushdown",
        "tag": "Similar",
        "muscle": "Triceps"
      },
      {
        "n": "Bench Dip",
        "tag": "No machine",
        "muscle": "Triceps"
      },
      {
        "n": "Assisted Dip",
        "tag": "Similar",
        "muscle": "Triceps"
      }
    ]
  },
  "pendulum": {
    "key": "pendulum",
    "name": "Pendulum Squat",
    "cat": "Machine · Legs",
    "area": "Lower",
    "beginner": false,
    "illo": "legpress",
    "summary": "A squat machine that moves on a smooth arc with your back supported. It builds your quads and glutes with a very stable, guided path.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      }
    ],
    "map": [
      "quads",
      "glutes"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Back",
        "v": "Shoulders under the pads"
      },
      {
        "ic": "hand",
        "k": "Feet",
        "v": "Shoulder-width on the platform"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 10"
      }
    ],
    "setup": [
      "Step in, shoulders under the pads, back against the rest.",
      "Place your feet shoulder-width on the platform.",
      "Release the safeties and brace your core."
    ],
    "movement": [
      "Bend your knees and lower along the arc until thighs are parallel.",
      "Keep your heels flat and back supported.",
      "Drive up to stand, stopping short of locking out.",
      "Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Knees caving",
        "w": "Knees drifting in.",
        "f": "Push them out over your toes."
      },
      {
        "t": "Heels lifting",
        "w": "Rising onto toes.",
        "f": "Move your feet higher and keep heels down."
      },
      {
        "t": "Too deep too soon",
        "w": "Going low before ready.",
        "f": "Build depth gradually."
      }
    ],
    "alts": [
      {
        "n": "Hack Squat",
        "tag": "Similar",
        "muscle": "Quads"
      },
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Barbell Back Squat",
        "tag": "Harder",
        "muscle": "Legs"
      }
    ]
  },
  "assisteddip": {
    "key": "assisteddip",
    "name": "Assisted Dip",
    "cat": "Machine · Arms",
    "area": "Upper",
    "beginner": true,
    "illo": "press",
    "summary": "A dip machine with a padded platform that supports some of your weight, so you can learn dips for your triceps and chest before doing them unassisted.",
    "muscles": [
      {
        "n": "Triceps",
        "primary": true
      },
      {
        "n": "Chest",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": false
      }
    ],
    "map": [
      "triceps",
      "chest",
      "shoulders"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Assist",
        "v": "More weight = more help"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Handles by your sides"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Plenty of assist to start"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 8"
      }
    ],
    "setup": [
      "Set the assist weight high to start.",
      "Kneel or stand on the padded platform.",
      "Grip the handles and straighten your arms."
    ],
    "movement": [
      "Lower your body by bending your elbows.",
      "Keep your elbows close and lean slightly forward.",
      "Press back up until your arms are almost straight.",
      "Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Going too deep",
        "w": "Dropping past a comfortable shoulder stretch.",
        "f": "Stop when your upper arms are about parallel."
      },
      {
        "t": "Flaring elbows",
        "w": "Elbows winging out.",
        "f": "Keep them tucked."
      },
      {
        "t": "Too little assist",
        "w": "Can't do clean reps.",
        "f": "Add assist weight."
      }
    ],
    "alts": [
      {
        "n": "Seated Dip Machine",
        "tag": "Easier",
        "muscle": "Triceps"
      },
      {
        "n": "Bench Dip",
        "tag": "No machine",
        "muscle": "Triceps"
      },
      {
        "n": "Cable Triceps Pushdown",
        "tag": "Easier",
        "muscle": "Triceps"
      }
    ]
  },
  "dbbench": {
    "key": "dbbench",
    "name": "Dumbbell Bench Press",
    "cat": "Dumbbell · Chest",
    "area": "Upper",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A chest press lying on a bench with a dumbbell in each hand. Each arm works independently, which is friendlier on the shoulders than a barbell.",
    "muscles": [
      {
        "n": "Chest",
        "primary": true
      },
      {
        "n": "Triceps",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": false
      }
    ],
    "map": [
      "chest",
      "triceps",
      "shoulders"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Flat on the bench, feet planted"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Dumbbells at chest, elbows ~45°"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 8–10"
      }
    ],
    "setup": [
      "Lie on a flat bench with a dumbbell in each hand at chest level.",
      "Plant your feet and pull your shoulder blades together.",
      "Start with the dumbbells at the sides of your chest."
    ],
    "movement": [
      "Press the dumbbells up until your arms are almost straight.",
      "Keep your elbows at about 45 degrees.",
      "Lower slowly until you feel a gentle chest stretch.",
      "Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Flaring elbows",
        "w": "Elbows straight out.",
        "f": "Tuck them to about 45 degrees."
      },
      {
        "t": "Clashing dumbbells",
        "w": "Banging them at the top.",
        "f": "Bring them close, not crashing."
      },
      {
        "t": "Bouncing",
        "w": "Dropping fast to the chest.",
        "f": "Lower with control."
      }
    ],
    "alts": [
      {
        "n": "Chest Press",
        "tag": "Easier",
        "muscle": "Chest"
      },
      {
        "n": "Barbell Bench Press",
        "tag": "Harder",
        "muscle": "Chest"
      },
      {
        "n": "Push-Up",
        "tag": "No equipment",
        "muscle": "Chest"
      }
    ]
  },
  "incdb": {
    "key": "incdb",
    "name": "Incline Dumbbell Press",
    "cat": "Dumbbell · Chest",
    "area": "Upper",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A dumbbell press on an inclined bench that emphasizes your upper chest and shoulders.",
    "muscles": [
      {
        "n": "Upper chest",
        "primary": true
      },
      {
        "n": "Front delts",
        "primary": true
      },
      {
        "n": "Triceps",
        "primary": false
      }
    ],
    "map": [
      "chest",
      "shoulders",
      "triceps"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Bench",
        "v": "Set to about 30°"
      },
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Dumbbells at upper chest"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "3 sets of 8–10"
      }
    ],
    "setup": [
      "Set the bench to about a 30-degree incline.",
      "Sit back with a dumbbell in each hand at your upper chest.",
      "Plant your feet and brace."
    ],
    "movement": [
      "Press the dumbbells up and slightly together.",
      "Keep your elbows at about 45 degrees.",
      "Lower slowly to your upper chest.",
      "Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Bench too steep",
        "w": "It becomes a shoulder press.",
        "f": "Keep the incline around 30 degrees."
      },
      {
        "t": "Flaring elbows",
        "w": "Elbows winging out.",
        "f": "Tuck them slightly."
      },
      {
        "t": "Arching hard",
        "w": "Lifting your back off the bench.",
        "f": "Keep your back on the pad."
      }
    ],
    "alts": [
      {
        "n": "Incline Chest Press",
        "tag": "Easier",
        "muscle": "Upper chest"
      },
      {
        "n": "Dumbbell Bench Press",
        "tag": "Similar",
        "muscle": "Chest"
      },
      {
        "n": "Shoulder Press",
        "tag": "Similar",
        "muscle": "Shoulders"
      }
    ]
  },
  "dbrdl": {
    "key": "dbrdl",
    "name": "Dumbbell Romanian Deadlift",
    "cat": "Dumbbell · Hamstrings",
    "area": "Lower",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A hip hinge holding dumbbells that builds your hamstrings and glutes. Lighter and easier to learn than the barbell version.",
    "muscles": [
      {
        "n": "Hamstrings",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      }
    ],
    "map": [
      "hamstrings",
      "glutes"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "A dumbbell in each hand"
      },
      {
        "ic": "seat",
        "k": "Legs",
        "v": "Soft knees, hips push back"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Hold a dumbbell in each hand in front of your thighs.",
      "Stand with feet hip-width and a soft bend in your knees.",
      "Pull your shoulders down and brace your core."
    ],
    "movement": [
      "Push your hips back to lower the dumbbells down your legs.",
      "Keep your back flat and the dumbbells close.",
      "Lower until you feel a hamstring stretch, then stand tall.",
      "Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Rounding the back",
        "w": "Back bending as you lower.",
        "f": "Keep your chest up; only go as low as you stay flat."
      },
      {
        "t": "Squatting",
        "w": "Bending the knees too much.",
        "f": "Push your hips back instead."
      },
      {
        "t": "Weights drifting",
        "w": "Dumbbells swing forward.",
        "f": "Keep them grazing your legs."
      }
    ],
    "alts": [
      {
        "n": "Seated Leg Curl",
        "tag": "Easier",
        "muscle": "Hamstrings"
      },
      {
        "n": "Romanian Deadlift",
        "tag": "Harder",
        "muscle": "Hamstrings"
      },
      {
        "n": "Glute Bridge",
        "tag": "Easier",
        "muscle": "Glutes"
      }
    ]
  },
  "bbcurl": {
    "key": "bbcurl",
    "name": "Barbell Curl",
    "cat": "Barbell · Arms",
    "area": "Upper",
    "beginner": true,
    "illo": "barbell",
    "summary": "The classic arm builder — curl a barbell up with both hands. Simple and effective for your biceps.",
    "muscles": [
      {
        "n": "Biceps",
        "primary": true
      }
    ],
    "map": [
      "biceps"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Shoulder-width, palms up"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Tall, elbows tucked"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 10"
      }
    ],
    "setup": [
      "Hold the bar at shoulder-width with your palms facing up.",
      "Stand tall with your elbows tucked to your sides.",
      "Brace your core and keep your shoulders down."
    ],
    "movement": [
      "Curl the bar up toward your shoulders.",
      "Keep your upper arms still — only your forearms move.",
      "Squeeze at the top, then lower slowly.",
      "Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Swinging",
        "w": "Using your back to heave the bar.",
        "f": "Keep your torso still."
      },
      {
        "t": "Elbows drifting",
        "w": "Elbows moving forward.",
        "f": "Pin them to your sides."
      },
      {
        "t": "Half reps",
        "w": "Not straightening at the bottom.",
        "f": "Use a full range."
      }
    ],
    "alts": [
      {
        "n": "Dumbbell Curl",
        "tag": "Similar",
        "muscle": "Biceps"
      },
      {
        "n": "Bicep Curl Machine",
        "tag": "Easier",
        "muscle": "Biceps"
      },
      {
        "n": "Preacher Curl",
        "tag": "Similar",
        "muscle": "Biceps"
      }
    ]
  },
  "bulgarian": {
    "key": "bulgarian",
    "name": "Bulgarian Split Squat",
    "cat": "Dumbbell · Legs",
    "area": "Lower",
    "beginner": false,
    "illo": "dumbbell",
    "summary": "A single-leg squat with your back foot raised on a bench. It builds serious leg and glute strength and balance — start with bodyweight.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      },
      {
        "n": "Hamstrings",
        "primary": false
      }
    ],
    "map": [
      "quads",
      "glutes",
      "hamstrings"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Hold",
        "v": "A dumbbell in each hand (or none)"
      },
      {
        "ic": "seat",
        "k": "Setup",
        "v": "Back foot on a bench"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Bodyweight to start"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 8 each leg"
      }
    ],
    "setup": [
      "Stand a step in front of a bench and rest the top of one foot on it.",
      "Hold dumbbells at your sides, or start with no weight.",
      "Keep your torso tall and core braced."
    ],
    "movement": [
      "Lower straight down by bending your front knee.",
      "Keep your front knee over your ankle.",
      "Push through your front foot to stand back up.",
      "Finish all reps, then switch legs. Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Front knee caving",
        "w": "Knee drifting inward.",
        "f": "Track it over your toes."
      },
      {
        "t": "Leaning forward",
        "w": "Chest dropping.",
        "f": "Keep your torso tall."
      },
      {
        "t": "Too much weight early",
        "w": "Balance suffers.",
        "f": "Master bodyweight first."
      }
    ],
    "alts": [
      {
        "n": "Dumbbell Lunge",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Leg Press",
        "tag": "Easier",
        "muscle": "Legs"
      },
      {
        "n": "Goblet Squat",
        "tag": "Easier",
        "muscle": "Legs"
      }
    ]
  },
  "bwsquat": {
    "key": "bwsquat",
    "name": "Bodyweight Squat",
    "cat": "Bodyweight · Legs",
    "area": "Lower",
    "beginner": true,
    "illo": "bodyweight",
    "summary": "The foundation of all squats, using just your bodyweight. Perfect for learning the movement and warming up — do it anywhere.",
    "muscles": [
      {
        "n": "Quads",
        "primary": true
      },
      {
        "n": "Glutes",
        "primary": true
      }
    ],
    "map": [
      "quads",
      "glutes"
    ],
    "quick": [
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Feet shoulder-width, toes out slightly"
      },
      {
        "ic": "hand",
        "k": "Arms",
        "v": "Out in front for balance"
      },
      {
        "ic": "swatch",
        "k": "Load",
        "v": "Bodyweight"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Stand with feet shoulder-width and toes turned out slightly.",
      "Lift your chest and brace your core.",
      "Reach your arms out in front for balance."
    ],
    "movement": [
      "Push your hips back and bend your knees to sit down.",
      "Go as low as you comfortably can with a flat back.",
      "Drive through your whole foot to stand.",
      "Breathe in down, out up."
    ],
    "mistakes": [
      {
        "t": "Knees caving",
        "w": "Knees collapsing in.",
        "f": "Push them out over your toes."
      },
      {
        "t": "Heels lifting",
        "w": "Rising onto your toes.",
        "f": "Keep your weight in your heels."
      },
      {
        "t": "Rounding the back",
        "w": "Slumping at the bottom.",
        "f": "Keep your chest up."
      }
    ],
    "alts": [
      {
        "n": "Goblet Squat",
        "tag": "Harder",
        "muscle": "Legs"
      },
      {
        "n": "Leg Press",
        "tag": "Similar",
        "muscle": "Legs"
      },
      {
        "n": "Banded Squat",
        "tag": "Similar",
        "muscle": "Legs"
      }
    ]
  },
  "facepull": {
    "key": "facepull",
    "name": "Face Pull",
    "cat": "Cable · Shoulders",
    "area": "Upper",
    "beginner": true,
    "illo": "cable",
    "summary": "A cable pull toward your face that strengthens the back of your shoulders and improves posture. One of the best moves for healthy shoulders.",
    "muscles": [
      {
        "n": "Rear delts",
        "primary": true
      },
      {
        "n": "Mid-back",
        "primary": false
      }
    ],
    "map": [
      "delts",
      "midback"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "Rope at face height"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Tall, slight lean back"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start light"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Set a rope on the pulley at about face height.",
      "Hold an end in each hand and step back for tension.",
      "Stand tall with a braced core."
    ],
    "movement": [
      "Pull the rope toward your face, hands splitting apart.",
      "Aim your thumbs back past your ears.",
      "Squeeze your shoulder blades together.",
      "Return slowly. Breathe out as you pull, in as you return."
    ],
    "mistakes": [
      {
        "t": "Going too heavy",
        "w": "Using your whole body.",
        "f": "Lighten up and keep it smooth."
      },
      {
        "t": "Pulling too low",
        "w": "Rope to your chest.",
        "f": "Aim for your face."
      },
      {
        "t": "Shrugging",
        "w": "Shoulders rising.",
        "f": "Keep them down."
      }
    ],
    "alts": [
      {
        "n": "Reverse Pec Deck",
        "tag": "Similar",
        "muscle": "Rear delts"
      },
      {
        "n": "Band Pull-Apart",
        "tag": "No machine",
        "muscle": "Rear delts"
      },
      {
        "n": "Lateral Raise",
        "tag": "Similar",
        "muscle": "Shoulders"
      }
    ]
  },
  "shrug": {
    "key": "shrug",
    "name": "Dumbbell Shrug",
    "cat": "Dumbbell · Shoulders",
    "area": "Upper",
    "beginner": true,
    "illo": "dumbbell",
    "summary": "A simple move to build the traps at the top of your shoulders — just hold dumbbells and shrug them straight up.",
    "muscles": [
      {
        "n": "Traps",
        "primary": true
      }
    ],
    "map": [
      "traps"
    ],
    "quick": [
      {
        "ic": "hand",
        "k": "Grip",
        "v": "A dumbbell in each hand"
      },
      {
        "ic": "seat",
        "k": "Stance",
        "v": "Tall, arms straight"
      },
      {
        "ic": "swatch",
        "k": "Weight",
        "v": "Start moderate"
      },
      {
        "ic": "list",
        "k": "Reps",
        "v": "2–3 sets of 15"
      }
    ],
    "setup": [
      "Hold a dumbbell in each hand at your sides.",
      "Stand tall with your arms straight and shoulders relaxed.",
      "Brace your core."
    ],
    "movement": [
      "Shrug your shoulders straight up toward your ears.",
      "Pause and squeeze at the top.",
      "Lower slowly back down.",
      "Breathe out up, in down."
    ],
    "mistakes": [
      {
        "t": "Rolling the shoulders",
        "w": "Circling them around.",
        "f": "Shrug straight up and down."
      },
      {
        "t": "Bending the arms",
        "w": "Curling the weight.",
        "f": "Keep your arms straight."
      },
      {
        "t": "Rushing",
        "w": "Bouncing the weight.",
        "f": "Pause at the top each rep."
      }
    ],
    "alts": [
      {
        "n": "Barbell Shrug",
        "tag": "Similar",
        "muscle": "Traps"
      },
      {
        "n": "Cable Shrug",
        "tag": "Similar",
        "muscle": "Traps"
      },
      {
        "n": "Face Pull",
        "tag": "Similar",
        "muscle": "Upper back"
      }
    ]
  }
};

// Merge in the extra catalog (cardio + machines added later) so the whole app
// sees one combined set.
Object.assign(MACHINES, EXTRA_MACHINES);

/** All machines as a flat list. */
export function allMachines(): Machine[] {
  return Object.values(MACHINES);
}

const norm = (s: string) => (s || '').toLowerCase().replace(/[^a-z]/g, '');

/** Resolve a free-text machine name to a catalog key (falls back to 'lat'). */
export function keyForName(name: string): string {
  const n = norm(name);
  const m = allMachines().find(x => norm(x.name) === n);
  return m ? m.key : 'lat';
}

/** Like keyForName but returns null when there's no real catalog match. */
export function findKeyByName(name: string): string | null {
  const n = norm(name);
  const m = allMachines().find(x => norm(x.name) === n);
  return m ? m.key : null;
}

/** Get a machine by key, falling back to the Lat Pulldown if unknown. */
export function getMachine(key: string | undefined): Machine {
  return (key && MACHINES[key]) || MACHINES.lat;
}

/** Register additional (e.g. user-created custom) equipment at runtime. */
export function registerMachines(more: Record<string, Machine>) {
  Object.assign(MACHINES, more);
}
