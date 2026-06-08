// Fill in your Firebase project values from:
// Firebase Console → Project Settings → Your apps → Web app → SDK setup and configuration
export const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_AUTH_DOMAIN.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "REPLACE_WITH_YOUR_MESSAGING_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID",
};

// Firebase Console → Authentication → Sign-in method → Google → Web client ID
export const googleWebClientId = "REPLACE_WITH_YOUR_WEB_CLIENT_ID.apps.googleusercontent.com";
// Firebase Console → Authentication → Sign-in method → Google → iOS client ID
export const googleIosClientId = "REPLACE_WITH_YOUR_IOS_CLIENT_ID.apps.googleusercontent.com";

// Google AI Studio → API key (https://aistudio.google.com/apikey). Used by the
// machine-scan recognition (Gemini Flash). If left as the placeholder, scanning
// falls back to a local stub so the app still works in development.
// NOTE: a key shipped in the client can be extracted. For production, proxy the
// Gemini call through a server (e.g. a Firebase Cloud Function) that holds the
// key and enforces auth + rate limits.
export const geminiApiKey = "REPLACE_WITH_YOUR_GEMINI_API_KEY";
export const geminiModel = "gemini-2.0-flash";

