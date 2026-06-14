// Fill in your Firebase project values from:
// Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAX9MzW0Q7BE5uxhHI0bnC3njVjIKaxIFM",
  authDomain: "spotterapp-7b72b.firebaseapp.com",
  projectId: "spotterapp-7b72b",
  storageBucket: "spotterapp-7b72b.firebasestorage.app",
  messagingSenderId: "323991484767",
  appId: "1:323991484767:web:40dfb46f2a80ee376edeea",
};

// Firebase Console → Authentication → Sign-in method → Google → Web client ID
export const googleWebClientId = "323991484767-c3k0av83vruj741jcmlhcj0mkjlmfheo.apps.googleusercontent.com";
// Firebase Console → Authentication → Sign-in method → Google → iOS client ID
export const googleIosClientId = "REPLACE_WITH_YOUR_IOS_CLIENT_ID.apps.googleusercontent.com";

// Google AI Studio → API key (https://aistudio.google.com/apikey). Used by the
// machine-scan recognition (Gemini Flash). If left as the placeholder, scanning
// falls back to a local stub so the app still works in development.
// NOTE: a key shipped in the client can be extracted. For production, deploy the
// Cloud Function proxy (see /functions) and set useRecognitionProxy = true so the
// key stays server-side and the daily cap is enforced server-side.
export const geminiApiKey = "REPLACE_WITH_YOUR_GEMINI_API_KEY";
export const geminiModel = "gemini-2.0-flash";

// Set true after deploying the `recognizeMachine` Cloud Function (see functions/
// and RUNNING.md). When true, scans go through the secure server proxy instead
// of calling Gemini directly from the app.
export const useRecognitionProxy = true;


