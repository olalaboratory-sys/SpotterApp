# Running Spotter on a device / simulator

Spotter is a managed Expo app and every native module it uses (camera,
image-picker, haptics, linear-gradient, router) ships in **Expo Go**, so you
have two ways to try it. You need your Firebase keys in place first.

## 0. Prerequisites

```bash
npm install
```

Firebase config is read from `lib/firebase.ts` (or env — check that file). Make
sure your project's `apiKey`, `authDomain`, `projectId`, etc. are set, and that
Email/Password (and Google/Apple if you use them) are enabled in the Firebase
console, with Firestore created.

## Option A — Expo Go (fastest, no build)

```bash
npx expo start
```

- Press `i` for the iOS simulator, `a` for Android, or scan the QR code with the
  **Expo Go** app on your phone.
- Live reload on save. Best for iterating on the JS.

> Note: real push notifications and StoreKit billing do **not** work in Expo Go —
> those need a dev/standalone build. Everything else in Spotter does.

## Option B — EAS iOS Simulator dev build (standalone)

Use this to exercise the app as a real binary (closer to TestFlight).

```bash
npm i -g eas-cli          # once
eas login                 # your Expo account
eas build --profile development --platform ios   # simulator .app (see eas.json)
```

When the build finishes, EAS prints a URL. Then:

```bash
# download + drag the .app onto a booted simulator, or:
eas build:run -p ios --latest
npx expo start --dev-client
```

For a **physical iPhone** you need an Apple Developer account; run
`eas build --profile development --platform ios` without the simulator flag
(remove `"simulator": true` or add a device profile) and register the device
with `eas device:create`.

## Profiles (eas.json)

- `development` — dev client, iOS simulator, internal distribution
- `preview` — release-mode simulator build for QA
- `production` — store build with auto version increment

## What to verify on device (can't be checked by `expo export`)

- Swipe-to-delete on My Places cards
- The segmented weekly goal ring on Progress
- Press-scale on cards, pulsing skeletons, the scan scan-line
- Haptics (save, set complete, rest timer, status change)
- Camera scan + photo picker → "Drop a photo" on a guide
- Toast banners (e.g. toggle airplane mode, then change a machine's status)
