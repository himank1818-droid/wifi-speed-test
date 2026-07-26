// ============================================
// 🔐 FIREBASE CONFIGURATION
// ============================================
// These values come from Vite environment variables so they can differ
// between local dev (.env.local, gitignored) and production (set in
// Vercel → Project Settings → Environment Variables).
//
// All VITE_-prefixed variables are safe to expose to the browser —
// that's how Firebase client config always works. The secret half of
// auth (the service account used to VERIFY tokens) lives only in the
// serverless functions under /api, never here.
// ============================================

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
