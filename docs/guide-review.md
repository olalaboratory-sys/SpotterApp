# Guide Review — Findings (50-persona panel, 5 clusters)

Audit of the 100 machine guides (`constants/machines.ts` + `constants/machinesExtra.ts`)
by 50 fitness-expert personas in 5 clusters. Severity: high = safety/accuracy,
med = clarity/correctness, low = polish.

> Not a substitute for a licensed professional's sign-off before launch.

## Cross-cutting (highest leverage)
- **[HIGH] No global "stop-if-symptoms" / medical-clearance line.** None of the 100
  guides warn to stop for chest pain/dizziness/faintness or to get clearance if
  pregnant/postpartum or managing heart/BP/back conditions. → **Fix once** in the
  guide screen's safety note (covers all guides). ✅ applied
- **[MED] "Start light" with no anchor** in most new guides, while the original 65
  give a real number (e.g. "~15–20 kg"). → add a relative cue.
- **[MED] Recurring jargon**: J-hooks, GHD, hip hinge, staggered stance, kipping,
  hyperextend, iso-lateral. → gloss on first use.
- **[LOW] Outcome-promise wording** ("build/builds", "shape", "thick strong back").
  → prefer "trains/strengthens/works".

## High severity (applied)
- **Treadmill** — missing emergency safety-clip; contradictory mount sequence
  ("start belt while on rails" vs "set speed before stepping on"). ✅
- **Glute-Ham Raise** — flagged `beginner: true` but is advanced; reframe + assist. ✅
- **Pull-Up Bar / Dip Station** — rep targets ("3–5", "5–8") imply everyone starts
  with full reps; reassure + lead with band/assisted. ✅
- **Air Bike / Battle Ropes** — HIIT interval prescriptions as the default; reframe
  as a progression, keep steady-state as the beginner default. ✅
- **Map-key mismatches** — Shrug Machine & Dumbbell Shrug should map to `traps`;
  Standing Leg Curl should drop `glutes` (hamstring isolation); Battle Ropes
  duplicated `delts`+`shoulders`. ✅

## Medium severity (applied / noted)
- Squat Rack — define "J-hooks", add load-plates + bail-onto-safeties cue. ✅
- Reverse Hyperextension — soften "back health" claim; cue glute drive, no arch. ✅
- Captain's Chair / Ab Coaster — soften "lower abs"; add exhale/no-bear-down. ✅
- Landmine T-Bar Row — explain "landmine"/V-handle; brace + exhale. ✅
- Belt Squat / Calf Press — name/locate the "safety". ✅ (noted)
- Functional Trainer — name 1–2 starter exercises instead of "depends". ✅
- Cardio bikes — align seat cue (knee slightly bent at bottom). (noted)

## Lower severity / backlog (noted, not all applied)
- Add concrete starting weights to all 35 new guides (currently "light").
- Gloss "hip hinge" and "staggered stance" on first use across cable/row guides.
- Soften remaining "build/shape" outcome wording (Lateral Raise, Glute Kickback,
  Hip Thrust, Iso-Lateral Shoulder Press, etc.).
- Catalog gap: no `lowerback`/`erectors` muscle-map key, so Deadlift, RDL, and
  Back Extension highlight `midback` (wrong region). Needs a new MuscleMap region.
- GHR/Dip beginner-flag policy: consider a difficulty field beyond `beginner`.

## What's already strong
Original 65 are the gold standard (concrete weights, 5-step setup, plain, warm
tone). Plank, Glute Bridge, Cable Pull-Through, abductor/adductor read well. No
body-shaming or unnecessarily gendered language found anywhere.
