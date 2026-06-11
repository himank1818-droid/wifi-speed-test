# 🔐 Google Sign-In Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `speedtest-app` (or your preferred name)
4. Enable Google Analytics (optional)
5. Click **"Create project"**

## Step 2: Enable Google Authentication

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Get started"**
3. Click on **"Sign-in method"** tab
4. Find **"Google"** in the list and click on it
5. Toggle **"Enable"** to ON
6. Enter your project support email
7. Click **"Save"**

## Step 3: Get Firebase Configuration

1. In Firebase Console, click on **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click on **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "SpeedTest Web")
5. Copy the `firebaseConfig` object

## Step 4: Update Firebase Configuration

Open `src/firebase/config.ts` and replace the placeholder values:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX", // Your actual API key
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

## Step 5: Add Authorized Domains

1. In Firebase Console, go to **Authentication** → **Settings**
2. Under **"Authorized domains"**, add your production domain:
   - `localhost` (for development - already added)
   - `yourdomain.com` (for production)
   - `www.yourdomain.com` (for production)

## Step 6: Test Google Sign-In

1. Run your app: `npm run dev`
2. Click **"Create an Account"** button in the top navigation
3. Google Sign-In popup should appear
4. Select your Google account
5. You should see your profile picture and name in the navigation bar

## 🎉 That's It!

Your Google Sign-In is now working! Users can:
- ✅ Create account with Google
- ✅ See their profile picture
- ✅ Sign out anytime
- ✅ Account persists across page reloads

## 🔧 Troubleshooting

### Error: "This operation is not allowed"
- **Solution**: Make sure Google Sign-In is enabled in Firebase Console

### Error: "Domain not authorized"
- **Solution**: Add your domain to Authorized Domains in Firebase Console

### Error: "Invalid API key"
- **Solution**: Double-check your `apiKey` in `src/firebase/config.ts`

### Popup closes immediately
- **Solution**: Disable popup blockers in your browser

## 📱 Production Deployment

When deploying to production:

1. **Add production domain** to Firebase Authorized Domains
2. **Update firebaseConfig** with production values
3. **Test sign-in** on production URL
4. **Monitor authentication** in Firebase Console → Authentication → Users

## 🔒 Security Notes

- Firebase handles all authentication securely
- User data is stored in Firebase Authentication
- No passwords are stored on your server
- Google OAuth 2.0 is used for secure authentication

## 📊 View Users

To see registered users:
1. Go to Firebase Console
2. Click **Authentication** → **Users**
3. See all users who signed up with Google

---

**Need Help?** Check [Firebase Documentation](https://firebase.google.com/docs/auth/web/google-signin)
