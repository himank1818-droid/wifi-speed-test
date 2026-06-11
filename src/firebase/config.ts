// ============================================
// 🔐 FIREBASE CONFIGURATION
// ============================================
// 
// OPTION 1: DEMO MODE (Current - Works Now!)
// - No setup required
// - Simulates Google Sign-In
// - Perfect for testing
//
// OPTION 2: REAL FIREBASE (For Production)
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project
// 3. Enable Google Authentication
// 4. Copy your config below
// ============================================

export const firebaseConfig = {
  // 🔴 REPLACE THESE WITH YOUR ACTUAL FIREBASE CREDENTIALS
  apiKey: "AIzaSyDemoKey-ReplaceWithYourRealKey",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};

// Demo mode is enabled by default
// Set to true when you add real Firebase credentials
export const USE_REAL_FIREBASE = false;

export default null;
