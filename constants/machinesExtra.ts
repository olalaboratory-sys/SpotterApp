// AUTO-GENERATED extra machines (cardio + machines missing from the base catalog).
// Merged into MACHINES at load. To edit, change /tmp/gen-extra.js and re-run, or
// edit entries directly here.
import type { Machine } from './machines';

export const EXTRA_MACHINES: Record<string, Machine> = {
  'treadmill': {
    key: 'treadmill', name: 'Treadmill', cat: 'Cardio · Running', area: 'Cardio', beginner: true, illo: 'treadmill',
    summary: 'A moving belt you walk or run on. Great for an easy warm-up or steady cardio — start slow and find a pace you can hold a conversation at.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Quads', primary: false },
      { n: 'Calves', primary: false },
    ],
    map: ['quads', 'hamstrings', 'calves'],
    quick: [
      { ic: 'list', k: 'Speed', v: 'Start at a 4–5 km/h walk' },
      { ic: 'list', k: 'Incline', v: '0–2% to begin' },
      { ic: 'list', k: 'Time', v: '5–20 minutes' },
      { ic: 'list', k: 'Hold', v: 'Use rails only for balance' },
    ],
    setup: [
      'Clip the emergency stop cord to your clothing — it stops the belt instantly if you stumble.',
      'Stand on the side rails, start the belt at the slowest speed, then step on once it’s moving.',
      'Stand tall, look ahead, and let your arms swing naturally.',
    ],
    movement: [
      'Walk or jog with a relaxed, even stride.',
      'Keep your posture upright — don’t hunch or grip the rails.',
      'Raise speed or incline gradually as you warm up.',
      'Slow down for a minute before stepping off.',
    ],
    mistakes: [
      { t: 'Holding the rails tightly', w: 'It throws off your stride and posture.', f: 'Let go once you feel balanced — lower the speed if you can’t.' },
      { t: 'Starting too fast', w: 'Hard to control and easy to stumble.', f: 'Begin at a walk and build up.' },
    ],
    alts: [
      { n: 'Elliptical Trainer', tag: 'Easier', muscle: 'Cardio' },
      { n: 'Stationary Bike', tag: 'Easier', muscle: 'Cardio' },
    ],
  },
  'elliptical': {
    key: 'elliptical', name: 'Elliptical Trainer', cat: 'Cardio · Low impact', area: 'Cardio', beginner: true, illo: 'elliptical',
    summary: 'A low-impact cardio machine where your feet glide on pedals and your arms push and pull handles. Easy on the knees — good for steady, full-body cardio.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Quads', primary: false },
      { n: 'Glutes', primary: false },
    ],
    map: ['quads', 'glutes', 'hamstrings'],
    quick: [
      { ic: 'list', k: 'Resistance', v: 'Start low, level 2–4' },
      { ic: 'list', k: 'Pace', v: 'Smooth and steady' },
      { ic: 'list', k: 'Time', v: '10–20 minutes' },
      { ic: 'list', k: 'Grip', v: 'Hold the moving handles' },
    ],
    setup: [
      'Step onto the pedals and hold the moving handles.',
      'Set a low resistance to begin.',
      'Stand tall with a slight bend in the knees.',
    ],
    movement: [
      'Push and pull the handles while your legs glide.',
      'Keep a smooth, even rhythm — don’t bounce.',
      'Add resistance gradually as it feels easy.',
    ],
    mistakes: [
      { t: 'Leaning on the handles', w: 'Takes the work out of your legs.', f: 'Stand tall and let your legs drive the motion.' },
    ],
    alts: [
      { n: 'Treadmill', tag: 'Similar', muscle: 'Cardio' },
      { n: 'Stationary Bike', tag: 'Easier', muscle: 'Cardio' },
    ],
  },
  'uprightbike': {
    key: 'uprightbike', name: 'Stationary Bike', cat: 'Cardio · Cycling', area: 'Cardio', beginner: true, illo: 'bike',
    summary: 'An indoor bike for seated cardio. Low impact and beginner-friendly — adjust the seat so your legs aren’t cramped or fully locked out.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Quads', primary: false },
      { n: 'Hamstrings', primary: false },
    ],
    map: ['quads', 'hamstrings', 'calves'],
    quick: [
      { ic: 'list', k: 'Seat', v: 'Hip-height; slight knee bend at bottom' },
      { ic: 'list', k: 'Resistance', v: 'Start low' },
      { ic: 'list', k: 'Pace', v: '60–80 rpm' },
      { ic: 'list', k: 'Time', v: '10–20 minutes' },
    ],
    setup: [
      'Set the seat so your leg is almost straight at the bottom of the pedal.',
      'Start with light resistance.',
      'Sit upright and hold the handlebars lightly.',
    ],
    movement: [
      'Pedal at a steady, comfortable cadence.',
      'Keep your upper body relaxed.',
      'Add resistance gradually for more effort.',
    ],
    mistakes: [
      { t: 'Seat too low', w: 'Cramps the knees and tires you fast.', f: 'Raise the seat until your knee is only slightly bent at the bottom.' },
    ],
    alts: [
      { n: 'Recumbent Bike', tag: 'Easier', muscle: 'Cardio' },
      { n: 'Elliptical Trainer', tag: 'Similar', muscle: 'Cardio' },
    ],
  },
  'recumbentbike': {
    key: 'recumbentbike', name: 'Recumbent Bike', cat: 'Cardio · Cycling', area: 'Cardio', beginner: true, illo: 'bike',
    summary: 'A bike with a reclined seat and back support, pedals out in front. The comfiest, most supportive cardio option — great if you have back or balance concerns.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Quads', primary: false },
      { n: 'Glutes', primary: false },
    ],
    map: ['quads', 'glutes', 'hamstrings'],
    quick: [
      { ic: 'list', k: 'Seat', v: 'Knee slightly bent when leg extends' },
      { ic: 'list', k: 'Resistance', v: 'Start low' },
      { ic: 'list', k: 'Pace', v: 'Steady and even' },
      { ic: 'list', k: 'Time', v: '10–25 minutes' },
    ],
    setup: [
      'Slide the seat so your legs reach the pedals with a slight bend.',
      'Sit back against the backrest.',
      'Start with light resistance.',
    ],
    movement: [
      'Pedal smoothly with your back supported.',
      'Keep an even pace you can sustain.',
      'Add resistance gradually.',
    ],
    mistakes: [
      { t: 'Seat too far back', w: 'You overreach and lock the knees.', f: 'Move the seat forward until knees stay slightly bent.' },
    ],
    alts: [
      { n: 'Stationary Bike', tag: 'Similar', muscle: 'Cardio' },
      { n: 'Elliptical Trainer', tag: 'Similar', muscle: 'Cardio' },
    ],
  },
  'rowingerg': {
    key: 'rowingerg', name: 'Rowing Machine', cat: 'Cardio · Full body', area: 'Cardio', beginner: true, illo: 'rower',
    summary: 'A full-body cardio machine that mimics rowing a boat. Works legs, back, and arms together — the power comes from your legs, not your arms.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Back', primary: false },
      { n: 'Quads', primary: false },
    ],
    map: ['lats', 'midback', 'quads', 'core'],
    quick: [
      { ic: 'list', k: 'Order', v: 'Legs → body → arms' },
      { ic: 'list', k: 'Return', v: 'Arms → body → legs' },
      { ic: 'list', k: 'Pace', v: '20–26 strokes/min' },
      { ic: 'list', k: 'Strap', v: 'Feet strapped at midfoot' },
    ],
    setup: [
      'Strap your feet in and grab the handle with both hands.',
      'Sit tall with shins vertical at the front.',
      'Start with an easy resistance setting.',
    ],
    movement: [
      'Drive with your legs first, then lean back slightly, then pull the handle to your ribs.',
      'Reverse the order to return: arms out, lean forward, bend knees.',
      'Keep a smooth rhythm — the drive is quick, the return is slower.',
    ],
    mistakes: [
      { t: 'Pulling with arms first', w: 'Wastes the strong leg drive and tires your arms.', f: 'Push the legs first, then add the back and arms.' },
      { t: 'Rounding the back', w: 'Strains the lower back.', f: 'Keep your chest up and core braced throughout.' },
    ],
    alts: [
      { n: 'Stationary Bike', tag: 'Easier', muscle: 'Cardio' },
      { n: 'Seated Cable Row', tag: 'Similar', muscle: 'Back · Mid-back' },
    ],
  },
  'stairclimber': {
    key: 'stairclimber', name: 'Stair Climber', cat: 'Cardio · Steps', area: 'Cardio', beginner: true, illo: 'stairs',
    summary: 'A machine with rotating steps you climb continuously. Tough leg and glute cardio — start slow and stand tall instead of leaning on the rails.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Glutes', primary: false },
      { n: 'Quads', primary: false },
    ],
    map: ['glutes', 'quads', 'calves'],
    quick: [
      { ic: 'list', k: 'Speed', v: 'Start at the lowest level' },
      { ic: 'list', k: 'Posture', v: 'Stand tall, light hand rest' },
      { ic: 'list', k: 'Step', v: 'Full steps, whole foot' },
      { ic: 'list', k: 'Time', v: '5–15 minutes' },
    ],
    setup: [
      'Step on carefully and hold the rails to start.',
      'Set the slowest speed first.',
      'Stand tall and rest your hands lightly on the rails.',
    ],
    movement: [
      'Take full, steady steps — plant your whole foot.',
      'Keep your torso upright; don’t slump onto the rails.',
      'Increase speed gradually as you warm up.',
    ],
    mistakes: [
      { t: 'Leaning on the rails', w: 'Takes the work off your legs and rounds your back.', f: 'Stand tall and use the rails only for light balance.' },
    ],
    alts: [
      { n: 'Treadmill', tag: 'Similar', muscle: 'Cardio' },
      { n: 'Elliptical Trainer', tag: 'Easier', muscle: 'Cardio' },
    ],
  },
  'assaultbike': {
    key: 'assaultbike', name: 'Air Bike', cat: 'Cardio · Conditioning', area: 'Cardio', beginner: true, illo: 'bike',
    summary: 'A bike with moving handles and a big fan wheel — the harder you push, the more resistance you get. Excellent for short, intense intervals.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Quads', primary: false },
      { n: 'Back', primary: false },
    ],
    map: ['quads', 'hamstrings', 'delts', 'core'],
    quick: [
      { ic: 'list', k: 'Effort', v: 'Resistance = how hard you push' },
      { ic: 'list', k: 'Start', v: 'Steady, easy pace first' },
      { ic: 'list', k: 'Later', v: 'Once comfy: 20s hard / 40s easy' },
      { ic: 'list', k: 'Grip', v: 'Push and pull the handles' },
    ],
    setup: [
      'Set the seat like a normal bike — slight knee bend at the bottom.',
      'Grab the moving handles.',
      'Start with easy pedaling to warm up.',
    ],
    movement: [
      'Push and pull the handles while you pedal.',
      'For intervals, go hard for a short burst, then easy to recover.',
      'Keep your core braced and breathe steadily.',
    ],
    mistakes: [
      { t: 'Going all-out too soon', w: 'You burn out in seconds.', f: 'Warm up easy first, then add short hard bursts.' },
    ],
    alts: [
      { n: 'Rowing Machine', tag: 'Similar', muscle: 'Cardio' },
      { n: 'Stationary Bike', tag: 'Easier', muscle: 'Cardio' },
    ],
  },
  'versaclimber': {
    key: 'versaclimber', name: 'Vertical Climber', cat: 'Cardio · Climbing', area: 'Cardio', beginner: true, illo: 'stairs',
    summary: 'A machine you climb vertically, moving opposite arm and leg like climbing a ladder. Low-impact, full-body cardio that gets tough fast.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Shoulders', primary: false },
      { n: 'Quads', primary: false },
    ],
    map: ['delts', 'quads', 'glutes', 'core'],
    quick: [
      { ic: 'list', k: 'Pattern', v: 'Opposite arm & leg together' },
      { ic: 'list', k: 'Range', v: 'Comfortable, even strokes' },
      { ic: 'list', k: 'Pace', v: 'Start slow' },
      { ic: 'list', k: 'Time', v: '5–12 minutes' },
    ],
    setup: [
      'Grab the handles and place your feet in the pedals.',
      'Stand tall and start with short, slow strokes.',
      'Keep a light, even grip.',
    ],
    movement: [
      'Move opposite arm and leg together, like climbing.',
      'Keep strokes smooth and even on both sides.',
      'Lengthen and speed up gradually.',
    ],
    mistakes: [
      { t: 'Strokes too long, too soon', w: 'Form breaks down and you tire fast.', f: 'Use short, controlled strokes and build range over time.' },
    ],
    alts: [
      { n: 'Stair Climber', tag: 'Similar', muscle: 'Cardio' },
      { n: 'Elliptical Trainer', tag: 'Easier', muscle: 'Cardio' },
    ],
  },
  'isorow': {
    key: 'isorow', name: 'Iso-Lateral Row', cat: 'Machine · Back', area: 'Upper', beginner: true, illo: 'row',
    summary: 'A plate-loaded chest-supported row where each arm moves on its own. The chest pad takes your lower back out of it, so you can focus on pulling with your back.',
    muscles: [
      { n: 'Mid-back', primary: true },
      { n: 'Lats', primary: true },
      { n: 'Biceps', primary: false },
      { n: 'Rear delts', primary: false },
    ],
    map: ['midback', 'lats', 'biceps', 'delts'],
    quick: [
      { ic: 'list', k: 'Chest', v: 'Pad against your chest' },
      { ic: 'list', k: 'Grip', v: 'Neutral or overhand handles' },
      { ic: 'list', k: 'Weight', v: 'Light per side — ~12 easy reps' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
    ],
    setup: [
      'Set the seat so the handles are at chest height.',
      'Sit with your chest firmly on the pad.',
      'Grab both handles with arms extended.',
    ],
    movement: [
      'Pull the handles back, leading with your elbows.',
      'Squeeze your shoulder blades together at the back.',
      'Return slowly until your arms are straight again.',
    ],
    mistakes: [
      { t: 'Shrugging up', w: 'Works traps instead of mid-back.', f: 'Keep shoulders down and drive the elbows back.' },
      { t: 'Jerking the weight', w: 'Uses momentum, not muscle.', f: 'Move slowly and keep your chest on the pad.' },
    ],
    alts: [
      { n: 'Seated Cable Row', tag: 'Similar', muscle: 'Back · Mid-back' },
      { n: 'Chest-Supported Row', tag: 'Similar', muscle: 'Back · Mid-back' },
    ],
  },
  'highrow': {
    key: 'highrow', name: 'High Row Machine', cat: 'Machine · Back', area: 'Upper', beginner: true, illo: 'row',
    summary: 'A chest-supported machine you pull from a high angle down toward your body. Hits the upper back and lats — great for posture.',
    muscles: [
      { n: 'Lats', primary: true },
      { n: 'Mid-back', primary: true },
      { n: 'Rear delts', primary: false },
    ],
    map: ['lats', 'midback', 'delts'],
    quick: [
      { ic: 'list', k: 'Chest', v: 'Pad against your chest' },
      { ic: 'list', k: 'Grip', v: 'Wide, palms down' },
      { ic: 'list', k: 'Weight', v: 'Light — a weight you could lift ~15×' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10–12' },
    ],
    setup: [
      'Set the seat so the handles sit above shoulder height.',
      'Press your chest into the pad.',
      'Reach up and grab the handles.',
    ],
    movement: [
      'Pull the handles down and back toward your upper ribs.',
      'Drive your elbows down and squeeze your back.',
      'Return slowly to a full stretch.',
    ],
    mistakes: [
      { t: 'Using too much weight', w: 'Turns it into a heave.', f: 'Lighten up so your back does the work.' },
    ],
    alts: [
      { n: 'Lat Pulldown', tag: 'Similar', muscle: 'Back · Lats' },
      { n: 'Iso-Lateral Row', tag: 'Similar', muscle: 'Back' },
    ],
  },
  'lowrow': {
    key: 'lowrow', name: 'Low Row Machine', cat: 'Machine · Back', area: 'Upper', beginner: true, illo: 'row',
    summary: 'A seated machine you pull from a low angle into your waist. Targets the thick mid-back muscles with chest support for a safe lower back.',
    muscles: [
      { n: 'Mid-back', primary: true },
      { n: 'Lats', primary: true },
      { n: 'Biceps', primary: false },
    ],
    map: ['midback', 'lats', 'biceps'],
    quick: [
      { ic: 'list', k: 'Chest', v: 'Pad against your chest' },
      { ic: 'list', k: 'Grip', v: 'Neutral handles' },
      { ic: 'list', k: 'Weight', v: 'Light — a weight you could lift ~15×' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
    ],
    setup: [
      'Adjust the seat so handles are around waist height.',
      'Sit with your chest on the pad, feet planted.',
      'Grab the handles with arms straight.',
    ],
    movement: [
      'Row the handles into your waist, elbows close.',
      'Squeeze your shoulder blades together.',
      'Return slowly to the stretch.',
    ],
    mistakes: [
      { t: 'Leaning back', w: 'Recruits momentum instead of back.', f: 'Keep your torso still against the pad.' },
    ],
    alts: [
      { n: 'Seated Cable Row', tag: 'Similar', muscle: 'Back · Mid-back' },
      { n: 'Iso-Lateral Row', tag: 'Similar', muscle: 'Back' },
    ],
  },
  'shrugmachine': {
    key: 'shrugmachine', name: 'Shrug Machine', cat: 'Machine · Back', area: 'Upper', beginner: true, illo: 'machine',
    summary: 'A machine that works the traps — the muscles between your neck and shoulders. You simply lift your shoulders straight up against resistance.',
    muscles: [
      { n: 'Traps', primary: true },
    ],
    map: ['traps'],
    quick: [
      { ic: 'list', k: 'Grip', v: 'Hold handles at your sides' },
      { ic: 'list', k: 'Motion', v: 'Straight up, then down' },
      { ic: 'list', k: 'Weight', v: 'Light — a weight you could lift ~15×' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12–15' },
    ],
    setup: [
      'Set the handles or pads so you can grip with arms straight.',
      'Stand or sit tall with shoulders relaxed.',
      'Take a light weight to start.',
    ],
    movement: [
      'Lift your shoulders straight up toward your ears.',
      'Pause briefly at the top.',
      'Lower slowly to a full stretch.',
    ],
    mistakes: [
      { t: 'Rolling the shoulders', w: 'Adds no benefit and can irritate the joint.', f: 'Move straight up and down, not in circles.' },
    ],
    alts: [
      { n: 'Dumbbell Shrug', tag: 'Similar', muscle: 'Dumbbell · Back' },
      { n: 'Barbell Deadlift', tag: 'Harder', muscle: 'Barbell · Back' },
    ],
  },
  'straightarmpulldown': {
    key: 'straightarmpulldown', name: 'Straight-Arm Pulldown', cat: 'Cable · Back', area: 'Upper', beginner: true, illo: 'cable',
    summary: 'A cable move where you pull a bar down with straight arms. It isolates the lats without much arm involvement — great for feeling your back work.',
    muscles: [
      { n: 'Lats', primary: true },
    ],
    map: ['lats'],
    quick: [
      { ic: 'list', k: 'Cable', v: 'Set high' },
      { ic: 'list', k: 'Arms', v: 'Stay long, slight elbow bend' },
      { ic: 'list', k: 'Weight', v: 'Light — this is an isolation move' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12' },
    ],
    setup: [
      'Set the cable to the top and attach a straight bar.',
      'Stand back and hinge slightly at the hips — push your hips back, soft knees, flat back.',
      'Hold the bar with straight arms above you.',
    ],
    movement: [
      'Pull the bar down to your thighs in an arc, arms long.',
      'Squeeze your lats at the bottom.',
      'Let the bar rise slowly back up.',
    ],
    mistakes: [
      { t: 'Bending the elbows', w: 'Turns it into a triceps move.', f: 'Keep your arms mostly straight throughout.' },
    ],
    alts: [
      { n: 'Lat Pulldown', tag: 'Similar', muscle: 'Back · Lats' },
      { n: 'Pullover Machine', tag: 'Similar', muscle: 'Back · Lats' },
    ],
  },
  'tbarrowstation': {
    key: 'tbarrowstation', name: 'Landmine T-Bar Row', cat: 'Machine · Back', area: 'Upper', beginner: true, illo: 'barbell',
    summary: 'A barbell anchored at one end (in a corner or floor socket — a “landmine”) that you load with plates and row toward you. A sturdy way to train your mid-back and lats.',
    muscles: [
      { n: 'Mid-back', primary: true },
      { n: 'Lats', primary: true },
      { n: 'Biceps', primary: false },
    ],
    map: ['midback', 'lats', 'biceps'],
    quick: [
      { ic: 'list', k: 'Stance', v: 'Feet either side of the bar' },
      { ic: 'list', k: 'Hinge', v: 'Push hips back, chest down, flat back' },
      { ic: 'list', k: 'Grip', v: 'V-handle (double-D handle) under the bar' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 8–10' },
    ],
    setup: [
      'Load light plates on the working end of the bar.',
      'Straddle the bar and hinge forward — push your hips back, chest down, back flat.',
      'Hook the V-handle under the bar and hold with both hands.',
    ],
    movement: [
      'Brace your core and exhale as you row the bar toward your stomach, elbows close.',
      'Squeeze your back at the top.',
      'Lower slowly to a full stretch — keep your back flat, don’t round.',
    ],
    mistakes: [
      { t: 'Rounding the back', w: 'Risky for the lower back.', f: 'Keep your chest up and spine flat the whole time.' },
    ],
    alts: [
      { n: 'Barbell Row', tag: 'Similar', muscle: 'Barbell · Back' },
      { n: 'Seated Cable Row', tag: 'Easier', muscle: 'Back · Mid-back' },
    ],
  },
  'pullubar': {
    key: 'pullubar', name: 'Pull-Up Bar', cat: 'Machine · Back', area: 'Upper', beginner: true, illo: 'bodyweight',
    summary: 'A fixed overhead bar you hang from and pull your chin above. The classic back and arm builder — use bands or the assisted machine if you can’t do one yet.',
    muscles: [
      { n: 'Lats', primary: true },
      { n: 'Mid-back', primary: true },
      { n: 'Biceps', primary: false },
    ],
    map: ['lats', 'midback', 'biceps'],
    quick: [
      { ic: 'list', k: 'Grip', v: 'Slightly wider than shoulders' },
      { ic: 'list', k: 'Range', v: 'Dead hang to chin over bar' },
      { ic: 'list', k: 'Start here', v: 'Band or assisted machine — totally normal' },
      { ic: 'list', k: 'Reps', v: 'Even 1–3 is a great start' },
    ],
    setup: [
      'Reach up and grip the bar a bit wider than your shoulders.',
      'Hang with arms straight and shoulders set.',
      'Brace your core.',
    ],
    movement: [
      'Pull your chest toward the bar, driving elbows down.',
      'Get your chin above the bar if you can.',
      'Lower slowly to a full hang.',
    ],
    mistakes: [
      { t: 'Swinging the body', w: 'Uses momentum and can strain the shoulders.', f: 'Pull smoothly and under control; use a band or the assisted machine.' },
    ],
    alts: [
      { n: 'Assisted Pull-Up', tag: 'Easier', muscle: 'Back · Lats' },
      { n: 'Lat Pulldown', tag: 'Easier', muscle: 'Back · Lats' },
    ],
  },
  'isochestpress': {
    key: 'isochestpress', name: 'Iso-Lateral Chest Press', cat: 'Machine · Chest', area: 'Upper', beginner: true, illo: 'press',
    summary: 'A plate-loaded chest press where each arm pushes on its own, so a stronger side can’t take over. Seated and supported — beginner friendly.',
    muscles: [
      { n: 'Chest', primary: true },
      { n: 'Shoulders', primary: false },
      { n: 'Triceps', primary: false },
    ],
    map: ['chest', 'shoulders', 'triceps'],
    quick: [
      { ic: 'list', k: 'Seat', v: 'Handles at mid-chest' },
      { ic: 'list', k: 'Grip', v: 'Overhand on handles' },
      { ic: 'list', k: 'Weight', v: 'Light per side — ~12 easy reps' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
    ],
    setup: [
      'Set the seat so the handles line up with the middle of your chest.',
      'Sit back with shoulders flat against the pad.',
      'Grip both handles.',
    ],
    movement: [
      'Press the handles forward until your arms are nearly straight.',
      'Pause, then lower slowly with control.',
      'Keep your shoulder blades back on the pad.',
    ],
    mistakes: [
      { t: 'Flaring elbows high', w: 'Stresses the shoulders.', f: 'Keep elbows around 45° from your body.' },
    ],
    alts: [
      { n: 'Chest Press', tag: 'Similar', muscle: 'Machine · Chest' },
      { n: 'Incline Chest Press', tag: 'Similar', muscle: 'Chest' },
    ],
  },
  'declinepress': {
    key: 'declinepress', name: 'Decline Chest Press', cat: 'Machine · Chest', area: 'Upper', beginner: true, illo: 'press',
    summary: 'A chest press angled downward to target the lower chest. Seated and supported, with a clear pressing path.',
    muscles: [
      { n: 'Chest', primary: true },
      { n: 'Triceps', primary: false },
    ],
    map: ['chest', 'triceps'],
    quick: [
      { ic: 'list', k: 'Seat', v: 'Handles at lower-chest line' },
      { ic: 'list', k: 'Grip', v: 'Overhand' },
      { ic: 'list', k: 'Weight', v: 'Light — a weight you could lift ~15×' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
    ],
    setup: [
      'Adjust the seat so the handles sit at your lower chest.',
      'Sit back firmly against the pad.',
      'Grip the handles.',
    ],
    movement: [
      'Press the handles forward and slightly down.',
      'Squeeze your chest at the end.',
      'Lower slowly to the start.',
    ],
    mistakes: [
      { t: 'Bouncing out of the bottom', w: 'Uses momentum and risks the shoulders.', f: 'Pause briefly and press smoothly.' },
    ],
    alts: [
      { n: 'Chest Press', tag: 'Similar', muscle: 'Machine · Chest' },
      { n: 'Cable Crossover', tag: 'Similar', muscle: 'Cable · Chest' },
    ],
  },
  'isoshoulderpress': {
    key: 'isoshoulderpress', name: 'Iso-Lateral Shoulder Press', cat: 'Machine · Shoulders', area: 'Upper', beginner: true, illo: 'press',
    summary: 'A plate-loaded overhead press where each arm works independently. The seat and back pad keep you stable while you train your shoulders.',
    muscles: [
      { n: 'Shoulders', primary: true },
      { n: 'Triceps', primary: false },
    ],
    map: ['delts', 'shoulders', 'triceps'],
    quick: [
      { ic: 'list', k: 'Seat', v: 'Handles at shoulder height' },
      { ic: 'list', k: 'Grip', v: 'Overhand' },
      { ic: 'list', k: 'Weight', v: 'Light per side — ~12 easy reps' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
    ],
    setup: [
      'Set the seat so the handles start near your shoulders.',
      'Sit tall with your back on the pad.',
      'Grip both handles.',
    ],
    movement: [
      'Press the handles overhead until arms are nearly straight.',
      'Pause, then lower slowly to shoulder height.',
      'Keep your core braced and ribs down.',
    ],
    mistakes: [
      { t: 'Arching the back', w: 'Shifts load to the lower back.', f: 'Brace your core and keep your back on the pad.' },
    ],
    alts: [
      { n: 'Shoulder Press', tag: 'Similar', muscle: 'Shoulders' },
      { n: 'Overhead Press', tag: 'Harder', muscle: 'Barbell · Shoulders' },
    ],
  },
  'cablecrossover': {
    key: 'cablecrossover', name: 'Cable Crossover', cat: 'Cable · Chest', area: 'Upper', beginner: true, illo: 'cable',
    summary: 'Two high cables you pull together in front of you in a hugging motion. A great chest isolator with constant tension through the whole range.',
    muscles: [
      { n: 'Chest', primary: true },
    ],
    map: ['chest', 'shoulders'],
    quick: [
      { ic: 'list', k: 'Cables', v: 'Set high' },
      { ic: 'list', k: 'Arms', v: 'Long, slight elbow bend' },
      { ic: 'list', k: 'Weight', v: 'Light — focus on the squeeze' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12' },
    ],
    setup: [
      'Set both cables high and grab a handle in each hand.',
      'Step forward into a staggered stance.',
      'Start with arms out wide, chest up.',
    ],
    movement: [
      'Bring the handles together in front of your chest in an arc.',
      'Squeeze your chest at the middle.',
      'Return slowly to the stretch.',
    ],
    mistakes: [
      { t: 'Turning it into a press', w: 'Bending the elbows loses chest tension.', f: 'Keep arms long and move in a wide arc.' },
    ],
    alts: [
      { n: 'Cable Fly', tag: 'Similar', muscle: 'Cable · Chest' },
      { n: 'Pec Deck', tag: 'Easier', muscle: 'Machine · Chest' },
    ],
  },
  'reversehyper': {
    key: 'reversehyper', name: 'Reverse Hyperextension', cat: 'Machine · Glutes', area: 'Lower', beginner: true, illo: 'machine',
    summary: 'You lie face-down and lift your legs up behind you against resistance. Works the glutes and lower back — move with control, not a big swing.',
    muscles: [
      { n: 'Glutes', primary: true },
      { n: 'Hamstrings', primary: false },
      { n: 'Lower back', primary: false },
    ],
    map: ['glutes', 'hamstrings', 'lowerback'],
    quick: [
      { ic: 'list', k: 'Torso', v: 'Supported on the pad' },
      { ic: 'list', k: 'Legs', v: 'Lift to body height, no higher' },
      { ic: 'list', k: 'Weight', v: 'Light — a weight you could lift ~15×' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12' },
    ],
    setup: [
      'Lie face-down with your hips at the edge of the pad.',
      'Hold the handles and let your legs hang.',
      'Start with little or no added weight.',
    ],
    movement: [
      'Squeeze your glutes to lift your legs up behind you.',
      'Stop when your body is in a straight line.',
      'Lower slowly with control.',
    ],
    mistakes: [
      { t: 'Over-arching at the top', w: 'Bends the lower back too far backward.', f: 'Drive with your glutes and stop at a straight line — don’t swing past it. Stop if you feel it in your lower back.' },
    ],
    alts: [
      { n: 'Glute Bridge', tag: 'Easier', muscle: 'Glutes' },
      { n: 'Back Extension', tag: 'Similar', muscle: 'Back · Lower back' },
    ],
  },
  'beltsquat': {
    key: 'beltsquat', name: 'Belt Squat Machine', cat: 'Machine · Legs', area: 'Lower', beginner: true, illo: 'machine',
    summary: 'A squat machine where weight hangs from a belt at your hips, so nothing loads your spine. Builds legs and glutes while sparing your back.',
    muscles: [
      { n: 'Quads', primary: true },
      { n: 'Glutes', primary: true },
      { n: 'Hamstrings', primary: false },
    ],
    map: ['quads', 'glutes', 'hamstrings'],
    quick: [
      { ic: 'list', k: 'Belt', v: 'Snug around your hips' },
      { ic: 'list', k: 'Feet', v: 'Shoulder width on the platform' },
      { ic: 'list', k: 'Depth', v: 'Thighs toward parallel' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
    ],
    setup: [
      'Strap the belt around your hips and stand on the platform.',
      'Set your feet about shoulder-width apart.',
      'Release the safety and stand tall holding the rails.',
    ],
    movement: [
      'Bend your knees and hips to lower into a squat.',
      'Go down until your thighs are about parallel.',
      'Drive through your feet to stand back up.',
    ],
    mistakes: [
      { t: 'Heels lifting', w: 'Shifts strain to the knees.', f: 'Keep your whole foot down; adjust foot position.' },
    ],
    alts: [
      { n: 'Hack Squat', tag: 'Similar', muscle: 'Machine · Legs' },
      { n: 'Leg Press', tag: 'Easier', muscle: 'Machine · Legs' },
    ],
  },
  'standinglegcurl': {
    key: 'standinglegcurl', name: 'Standing Leg Curl', cat: 'Machine · Legs', area: 'Lower', beginner: true, illo: 'legseat',
    summary: 'You curl one leg at a time against a pad while standing. Isolates the hamstring with a clear, controlled motion.',
    muscles: [
      { n: 'Hamstrings', primary: true },
    ],
    map: ['hamstrings'],
    quick: [
      { ic: 'list', k: 'Pad', v: 'Just above your heel' },
      { ic: 'list', k: 'Hips', v: 'Stay still against the support' },
      { ic: 'list', k: 'Weight', v: 'Light — a weight you could lift ~15×' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12 each leg' },
    ],
    setup: [
      'Set the pad to rest just above your ankle.',
      'Stand tall and brace against the support.',
      'Take a light weight to start.',
    ],
    movement: [
      'Curl your heel up toward your glute.',
      'Squeeze the hamstring at the top.',
      'Lower slowly and repeat, then switch legs.',
    ],
    mistakes: [
      { t: 'Swinging the leg', w: 'Uses momentum, not the hamstring.', f: 'Move slowly and keep your hips still.' },
    ],
    alts: [
      { n: 'Seated Leg Curl', tag: 'Similar', muscle: 'Legs · Hamstrings' },
      { n: 'Lying Leg Curl', tag: 'Similar', muscle: 'Legs · Hamstrings' },
    ],
  },
  'seatedlegpress': {
    key: 'seatedlegpress', name: 'Seated Leg Press (Horizontal)', cat: 'Machine · Legs', area: 'Lower', beginner: true, illo: 'legpress',
    summary: 'A horizontal leg press where you sit upright and push a platform away with your feet. A back-friendly way to train legs with heavy support.',
    muscles: [
      { n: 'Quads', primary: true },
      { n: 'Glutes', primary: true },
      { n: 'Hamstrings', primary: false },
    ],
    map: ['quads', 'glutes', 'hamstrings'],
    quick: [
      { ic: 'list', k: 'Back', v: 'Flat against the seat' },
      { ic: 'list', k: 'Feet', v: 'Shoulder width on the plate' },
      { ic: 'list', k: 'Depth', v: 'Knees toward chest, controlled' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10' },
    ],
    setup: [
      'Adjust the seat so your knees start at a comfortable bend.',
      'Plant your feet shoulder-width on the platform.',
      'Sit back with your spine against the pad.',
    ],
    movement: [
      'Push the platform away until your legs are nearly straight.',
      'Don’t lock the knees hard at the top.',
      'Bend your knees to return slowly.',
    ],
    mistakes: [
      { t: 'Letting knees cave in', w: 'Stresses the knee joint.', f: 'Push your knees out in line with your toes.' },
      { t: 'Lifting the hips', w: 'Rounds the lower back.', f: 'Keep your butt down and stop before your back curls.' },
    ],
    alts: [
      { n: 'Leg Press', tag: 'Similar', muscle: 'Machine · Legs' },
      { n: 'Hack Squat', tag: 'Harder', muscle: 'Machine · Legs' },
    ],
  },
  'calfpress': {
    key: 'calfpress', name: 'Calf Press (on Leg Press)', cat: 'Machine · Calves', area: 'Lower', beginner: true, illo: 'calf',
    summary: 'Using the leg-press platform, you press with the balls of your feet to train the calves through a big range.',
    muscles: [
      { n: 'Calves', primary: true },
    ],
    map: ['calves'],
    quick: [
      { ic: 'list', k: 'Feet', v: 'Balls of feet on the platform edge' },
      { ic: 'list', k: 'Range', v: 'Full stretch to full squeeze' },
      { ic: 'list', k: 'Knees', v: 'Soft, not locked' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 15' },
    ],
    setup: [
      'Sit in the leg press and place the balls of your feet low on the platform.',
      'Straighten your legs with a soft knee bend.',
      'Release the safety carefully.',
    ],
    movement: [
      'Press the platform by pushing through the balls of your feet.',
      'Squeeze your calves at the top.',
      'Lower your heels for a full stretch.',
    ],
    mistakes: [
      { t: 'Bouncing', w: 'Reduces the stretch and risks the achilles.', f: 'Move slowly through a full range.' },
    ],
    alts: [
      { n: 'Standing Calf Raise', tag: 'Similar', muscle: 'Machine · Calves' },
      { n: 'Seated Calf Raise', tag: 'Similar', muscle: 'Machine · Calves' },
    ],
  },
  'ghr': {
    key: 'ghr', name: 'Glute-Ham Raise', cat: 'Machine · Hamstrings', area: 'Lower', beginner: false, illo: 'bodyweight',
    summary: 'An advanced bodyweight move on the glute-ham bench where you lower and raise your torso using your hamstrings. Very challenging — start with hands assisting or just the lowering part, and use leg curls until you’re strong.',
    muscles: [
      { n: 'Hamstrings', primary: true },
      { n: 'Glutes', primary: true },
    ],
    map: ['hamstrings', 'glutes'],
    quick: [
      { ic: 'list', k: 'Feet', v: 'Locked against the foot plate' },
      { ic: 'list', k: 'Pad', v: 'Hips on the pad' },
      { ic: 'list', k: 'Range', v: 'Lower only as far as you control' },
      { ic: 'list', k: 'Start', v: 'Push off your hands to assist' },
    ],
    setup: [
      'Lock your feet against the plate and rest your thighs on the pad.',
      'Start upright with your body in a straight line.',
      'Cross your arms over your chest.',
    ],
    movement: [
      'Lower your torso slowly toward the floor.',
      'Squeeze your hamstrings and glutes to pull back up.',
      'Keep your body in a straight line throughout.',
    ],
    mistakes: [
      { t: 'Bending only at the hips', w: 'Turns it into a different move.', f: 'Keep hips straight; the motion is at the knees.' },
    ],
    alts: [
      { n: 'Lying Leg Curl', tag: 'Easier', muscle: 'Legs · Hamstrings' },
      { n: 'Romanian Deadlift', tag: 'Similar', muscle: 'Barbell · Hamstrings' },
    ],
  },
  'sled': {
    key: 'sled', name: 'Sled Push', cat: 'Machine · Legs', area: 'Lower', beginner: true, illo: 'machine',
    summary: 'A weighted sled you push across the floor. Simple, joint-friendly conditioning that builds leg drive and gets your heart pumping.',
    muscles: [
      { n: 'Quads', primary: true },
      { n: 'Glutes', primary: true },
      { n: 'Calves', primary: false },
    ],
    map: ['quads', 'glutes', 'calves'],
    quick: [
      { ic: 'list', k: 'Load', v: 'Start light — it’s harder than it looks' },
      { ic: 'list', k: 'Grip', v: 'Hold the high or low posts' },
      { ic: 'list', k: 'Distance', v: '10–20 m per push' },
      { ic: 'list', k: 'Rest', v: 'Walk back to recover' },
    ],
    setup: [
      'Load a light plate to start.',
      'Grip the posts and lean into the sled with straight arms.',
      'Get into a forward, athletic stance.',
    ],
    movement: [
      'Drive with your legs in short, powerful steps.',
      'Keep your arms firm and body leaning forward.',
      'Push for the set distance, then rest and repeat.',
    ],
    mistakes: [
      { t: 'Standing too upright', w: 'Loses your leg drive.', f: 'Lean into it so your legs do the pushing.' },
    ],
    alts: [
      { n: 'Leg Press', tag: 'Easier', muscle: 'Machine · Legs' },
      { n: 'Air Bike', tag: 'Similar', muscle: 'Cardio' },
    ],
  },
  'cablecurl': {
    key: 'cablecurl', name: 'Cable Bicep Curl', cat: 'Cable · Arms', area: 'Upper', beginner: true, illo: 'cable',
    summary: 'A low cable curl that keeps constant tension on the biceps through the whole movement. Easy on the wrists and great for a strong squeeze.',
    muscles: [
      { n: 'Biceps', primary: true },
    ],
    map: ['biceps'],
    quick: [
      { ic: 'list', k: 'Cable', v: 'Set low' },
      { ic: 'list', k: 'Elbows', v: 'Pinned at your sides' },
      { ic: 'list', k: 'Weight', v: 'Light — a weight you could lift ~15×' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12' },
    ],
    setup: [
      'Set the cable low and attach a bar or rope.',
      'Stand tall and hold it with arms straight down.',
      'Tuck your elbows into your sides.',
    ],
    movement: [
      'Curl the handle up toward your shoulders.',
      'Squeeze your biceps at the top.',
      'Lower slowly to straight arms.',
    ],
    mistakes: [
      { t: 'Swinging the elbows forward', w: 'Brings in the shoulders.', f: 'Keep elbows pinned and still at your sides.' },
    ],
    alts: [
      { n: 'Bicep Curl Machine', tag: 'Easier', muscle: 'Machine · Arms' },
      { n: 'Dumbbell Curl', tag: 'Similar', muscle: 'Dumbbell · Arms' },
    ],
  },
  'overheadcableext': {
    key: 'overheadcableext', name: 'Cable Overhead Triceps Extension', cat: 'Cable · Arms', area: 'Upper', beginner: true, illo: 'cable',
    summary: 'A cable extension overhead that stretches and works the triceps hard. Keep your elbows pointed forward and steady.',
    muscles: [
      { n: 'Triceps', primary: true },
    ],
    map: ['triceps'],
    quick: [
      { ic: 'list', k: 'Cable', v: 'Set low, face away' },
      { ic: 'list', k: 'Elbows', v: 'Point forward, stay still' },
      { ic: 'list', k: 'Weight', v: 'Light' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12' },
    ],
    setup: [
      'Set the cable low and attach a rope.',
      'Face away, rope behind your head, elbows bent.',
      'Step forward into a staggered stance.',
    ],
    movement: [
      'Straighten your arms overhead.',
      'Squeeze the triceps at the top.',
      'Lower slowly behind your head.',
    ],
    mistakes: [
      { t: 'Flaring the elbows', w: 'Loses tension and stresses the joint.', f: 'Keep elbows pointing forward and close.' },
    ],
    alts: [
      { n: 'Cable Triceps Pushdown', tag: 'Similar', muscle: 'Cable · Arms' },
      { n: 'Seated Dip Machine', tag: 'Easier', muscle: 'Machine · Arms' },
    ],
  },
  'dipstation': {
    key: 'dipstation', name: 'Dip Station', cat: 'Machine · Arms', area: 'Upper', beginner: true, illo: 'bodyweight',
    summary: 'Parallel bars you support yourself on and lower between to work chest and triceps. Use the assisted machine or bands if full dips are too hard.',
    muscles: [
      { n: 'Triceps', primary: true },
      { n: 'Chest', primary: true },
      { n: 'Shoulders', primary: false },
    ],
    map: ['triceps', 'chest', 'shoulders'],
    quick: [
      { ic: 'list', k: 'Grip', v: 'Hands on the bars, arms straight' },
      { ic: 'list', k: 'Lean', v: 'Slightly forward for chest' },
      { ic: 'list', k: 'Range', v: 'Lower to ~90° elbows' },
      { ic: 'list', k: 'Start here', v: 'Assisted machine, band, or bench dips' },
    ],
    setup: [
      'Grip the bars and press up to straight arms.',
      'Brace your core and cross your ankles.',
      'Lean slightly forward.',
    ],
    movement: [
      'Bend your elbows to lower until they reach about 90°.',
      'Press back up to straight arms.',
      'Keep the movement smooth and controlled.',
    ],
    mistakes: [
      { t: 'Dropping too low', w: 'Over-stretches the shoulders.', f: 'Stop around 90° at the elbows.' },
    ],
    alts: [
      { n: 'Assisted Dip', tag: 'Easier', muscle: 'Machine · Arms' },
      { n: 'Seated Dip Machine', tag: 'Easier', muscle: 'Machine · Arms' },
    ],
  },
  'captainschair': {
    key: 'captainschair', name: 'Captain’s Chair', cat: 'Machine · Core', area: 'Core', beginner: true, illo: 'bodyweight',
    summary: 'A padded station where you support yourself on your forearms and raise your knees to work your abs and hip flexors. No floor needed.',
    muscles: [
      { n: 'Abs', primary: true },
      { n: 'Hip flexors', primary: false },
    ],
    map: ['abs', 'core'],
    quick: [
      { ic: 'list', k: 'Forearms', v: 'Flat on the pads' },
      { ic: 'list', k: 'Back', v: 'Against the back pad' },
      { ic: 'list', k: 'Range', v: 'Curl knees up, tilt hips' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10–15' },
    ],
    setup: [
      'Rest your forearms on the pads and grip the handles.',
      'Press your back against the pad and let your legs hang.',
      'Brace your core and keep your lower back on the pad.',
    ],
    movement: [
      'Breathe out and raise your knees toward your chest.',
      'Curl your hips up at the top — that hip curl is the real ab work.',
      'Lower slowly without swinging; don’t bear down or hold your breath.',
    ],
    mistakes: [
      { t: 'Swinging the legs', w: 'Uses momentum, not your abs.', f: 'Move slowly and pause at the top.' },
    ],
    alts: [
      { n: 'Cable Crunch', tag: 'Similar', muscle: 'Cable · Core' },
      { n: 'Plank', tag: 'Easier', muscle: 'Bodyweight · Core' },
    ],
  },
  'abcoaster': {
    key: 'abcoaster', name: 'Ab Coaster', cat: 'Machine · Core', area: 'Core', beginner: true, illo: 'machine',
    summary: 'A machine where you kneel and your lower body curls up on a curved track to work the abs and hip flexors. The guided motion makes it beginner-friendly.',
    muscles: [
      { n: 'Abs', primary: true },
    ],
    map: ['abs', 'core'],
    quick: [
      { ic: 'list', k: 'Knees', v: 'On the pads' },
      { ic: 'list', k: 'Hands', v: 'Hold the top handles' },
      { ic: 'list', k: 'Range', v: 'Curl hips up under you' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 12–15' },
    ],
    setup: [
      'Kneel on the pads and hold the handles above.',
      'Let the carriage hang at the bottom.',
      'Brace your abs.',
    ],
    movement: [
      'Curl your hips up so your knees come toward your chest.',
      'Squeeze your abs at the top.',
      'Lower slowly along the track.',
    ],
    mistakes: [
      { t: 'Using arms to pull', w: 'Takes work off the abs.', f: 'Keep arms steady; move with your core.' },
    ],
    alts: [
      { n: 'Cable Crunch', tag: 'Similar', muscle: 'Cable · Core' },
      { n: 'Captain’s Chair', tag: 'Similar', muscle: 'Machine · Core' },
    ],
  },
  'cablewoodchop': {
    key: 'cablewoodchop', name: 'Cable Woodchop', cat: 'Cable · Core', area: 'Core', beginner: true, illo: 'cable',
    summary: 'A cable move where you pull diagonally across your body, training the obliques and rotation. Great for a strong, functional core.',
    muscles: [
      { n: 'Obliques', primary: true },
      { n: 'Core', primary: true },
    ],
    map: ['abs', 'core'],
    quick: [
      { ic: 'list', k: 'Cable', v: 'High to low (or low to high)' },
      { ic: 'list', k: 'Arms', v: 'Mostly straight' },
      { ic: 'list', k: 'Pivot', v: 'Let your back foot turn' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10 each side' },
    ],
    setup: [
      'Set the cable high and grab the handle with both hands.',
      'Stand side-on, feet shoulder-width.',
      'Start with arms up toward the pulley.',
    ],
    movement: [
      'Pull the handle down and across to the opposite hip.',
      'Let your torso rotate and back foot pivot.',
      'Return slowly, then finish the set and switch sides.',
    ],
    mistakes: [
      { t: 'Using only the arms', w: 'Misses the core rotation.', f: 'Drive the movement by turning your torso.' },
    ],
    alts: [
      { n: 'Cable Crunch', tag: 'Similar', muscle: 'Cable · Core' },
      { n: 'Plank', tag: 'Easier', muscle: 'Bodyweight · Core' },
    ],
  },
  'functionaltrainer': {
    key: 'functionaltrainer', name: 'Functional Trainer', cat: 'Cable · Full body', area: 'Upper', beginner: true, illo: 'cable',
    summary: 'A cable station with two adjustable pulleys you can set to any height for dozens of exercises — presses, rows, curls, and more.',
    muscles: [
      { n: 'Full body', primary: true },
    ],
    map: ['chest', 'lats', 'delts', 'biceps'],
    quick: [
      { ic: 'list', k: 'Pulleys', v: 'Set the height for your exercise' },
      { ic: 'list', k: 'Handles', v: 'Swap attachments as needed' },
      { ic: 'list', k: 'Try first', v: 'Cable chest press or a row' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 10–12' },
    ],
    setup: [
      'Not sure where to start? Try a cable chest press (handles at chest height) or a row.',
      'Set both pulleys to the height your exercise needs and attach the handles.',
      'Choose a light weight to learn the movement.',
    ],
    movement: [
      'Perform your chosen exercise with smooth, controlled reps.',
      'Keep your core braced and posture tall.',
      'Adjust the pulley height to target different muscles.',
    ],
    mistakes: [
      { t: 'Going too heavy', w: 'Form breaks down on cables fast.', f: 'Pick a weight you can control through the full range.' },
    ],
    alts: [
      { n: 'Cable Crossover', tag: 'Similar', muscle: 'Cable · Chest' },
      { n: 'Seated Cable Row', tag: 'Similar', muscle: 'Back · Mid-back' },
    ],
  },
  'squatrack': {
    key: 'squatrack', name: 'Squat Rack', cat: 'Machine · Legs', area: 'Lower', beginner: true, illo: 'barbell',
    summary: 'A frame that holds a barbell at the right height with safety arms, so you can squat, press, and more safely on your own.',
    muscles: [
      { n: 'Quads', primary: true },
      { n: 'Glutes', primary: true },
      { n: 'Full body', primary: false },
    ],
    map: ['quads', 'glutes', 'hamstrings', 'core'],
    quick: [
      { ic: 'list', k: 'Hooks', v: 'Just below shoulder height' },
      { ic: 'list', k: 'Safeties', v: 'Set at the bottom of your range' },
      { ic: 'list', k: 'Bar', v: 'Start with the empty bar' },
      { ic: 'list', k: 'Reps', v: '2–3 sets of 5–8' },
    ],
    setup: [
      'Set the J-hooks (the bar holders) just below shoulder height.',
      'Set the safety arms just below the bottom of your squat, so they’d catch a failed rep.',
      'Slide plates on evenly and clip the collars; practice first with just the empty bar.',
    ],
    movement: [
      'Unrack the bar onto your upper back and step back.',
      'Brace your core (don’t hold your breath), squat down with control, chest up.',
      'Drive up through your feet and re-rack carefully. If you can’t stand up, lower the bar onto the safety arms.',
    ],
    mistakes: [
      { t: 'No safety arms set', w: 'Risky if you fail a rep.', f: 'Always set the safeties before you start.' },
      { t: 'Bar too high on the rack', w: 'Hard to unrack and re-rack.', f: 'Set hooks just below shoulder height.' },
    ],
    alts: [
      { n: 'Hack Squat', tag: 'Easier', muscle: 'Machine · Legs' },
      { n: 'Smith Machine', tag: 'Easier', muscle: 'Machine · Legs' },
    ],
  },
  'battleropes': {
    key: 'battleropes', name: 'Battle Ropes', cat: 'Cardio · Conditioning', area: 'Cardio', beginner: true, illo: 'band',
    summary: 'Two heavy ropes you whip up and down to create waves. A fun, full-body conditioning tool that spikes your heart rate fast.',
    muscles: [
      { n: 'Heart & lungs', primary: true },
      { n: 'Shoulders', primary: false },
      { n: 'Core', primary: false },
    ],
    map: ['delts', 'core'],
    quick: [
      { ic: 'list', k: 'Grip', v: 'One rope end in each hand' },
      { ic: 'list', k: 'Stance', v: 'Feet wide, knees soft' },
      { ic: 'list', k: 'Start', v: '10–15s waves, long rests' },
      { ic: 'list', k: 'Breathe', v: 'Keep breathing — don’t hold it' },
    ],
    setup: [
      'Hold one rope end in each hand with a firm grip.',
      'Stand with feet shoulder-width or wider, knees slightly bent.',
      'Brace your core, keep a tall chest, and keep breathing.',
    ],
    movement: [
      'Whip both arms up and down quickly to make waves.',
      'Keep the waves steady and even for the work interval.',
      'Rest, then repeat for your rounds.',
    ],
    mistakes: [
      { t: 'Only using the arms', w: 'You tire out and lose power.', f: 'Drive with your whole body — legs and core too.' },
    ],
    alts: [
      { n: 'Air Bike', tag: 'Similar', muscle: 'Cardio' },
      { n: 'Rowing Machine', tag: 'Similar', muscle: 'Cardio' },
    ],
  },
};
