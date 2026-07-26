# Admin Panel Setup

This adds a real admin panel at `/admin`, backed by MongoDB Atlas (for data) and
Firebase (for login, restricted to your Google account only).

## What changed

- **Removed:** `backend/` (unused, insecure, had a leaked `.env` in it) and
  `frontend/admin.html` (a stub with zero authentication).
- **Added:** `/api/results`, `/api/content`, `/api/ads` — Vercel serverless
  functions backed by MongoDB.
- **Added:** `/admin` — a new page with three tabs: Results (speed test
  analytics), Content (hero text + SEO tags), Ads (ad slot HTML).
- **Added:** real Firebase Google Sign-In for `/admin`, checked against an
  email allowlist — only you can get in, even though anyone can try.
- **Changed:** the speed test now also sends each result to the database
  (previously it only ever saved to the visitor's own browser).

## 1. MongoDB Atlas

You already have a cluster. Just get a fresh connection string (Atlas →
Database → Connect → Drivers) — it'll look like:

```
mongodb+srv://himank1818_db_user:<password>@cluster0.tvolzjy.mongodb.net/?retryWrites=true&w=majority
```

Also check **Network Access** in Atlas and make sure `0.0.0.0/0` is allowed
(Vercel's serverless functions don't have fixed IPs), or add Vercel's IP
ranges if you'd rather not open it fully.

## 2. Firebase project

1. Go to https://console.firebase.google.com/ → Add project.
2. **Authentication** → Sign-in method → enable **Google**.
3. **Project settings** → General → Your apps → Add a **Web app** → copy the
   config values (apiKey, authDomain, etc.) — these go in the `VITE_FIREBASE_*`
   variables below.
4. **Project settings** → **Service accounts** → **Generate new private key**.
   This downloads a JSON file — you need three fields from it:
   `project_id`, `client_email`, `private_key`.
5. **Authentication** → Settings → Authorized domains → add your Vercel domain
   (e.g. `wifi-speed-test-ikax.vercel.app`) and any custom domain you use.

## 3. Set environment variables in Vercel

Vercel dashboard → your project → **Settings → Environment Variables**. Add
each of these (see `.env.example` in this repo for the full list):

| Variable | Where it comes from |
|---|---|
| `MONGO_URI` | Atlas connection string (step 1) |
| `ADMIN_EMAILS` | Your Google account email, e.g. `himank1818@gmail.com` (comma-separate for more than one) |
| `FIREBASE_PROJECT_ID` | Service account JSON, `project_id` |
| `FIREBASE_CLIENT_EMAIL` | Service account JSON, `client_email` |
| `FIREBASE_PRIVATE_KEY` | Service account JSON, `private_key` — paste it including the `\n` characters exactly as they appear in the JSON file |
| `VITE_FIREBASE_API_KEY` | Web app config (step 2.3) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Web app config |
| `VITE_FIREBASE_PROJECT_ID` | Web app config |
| `VITE_FIREBASE_STORAGE_BUCKET` | Web app config |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Web app config |
| `VITE_FIREBASE_APP_ID` | Web app config |

**Never put real values in `.env.example` or any file you commit — only in Vercel's dashboard (or a local `.env.local`, which is gitignored).**

## 4. Push and deploy

```bash
git add -A
git commit -m "Add admin panel with MongoDB + Firebase auth; remove leaked credentials"
git push
```

Vercel will redeploy automatically. Once it's live, go to
`https://your-site.vercel.app/admin`, sign in with your Google account, and
you should see the dashboard.

## 5. Double-check the leak is gone

GitHub still remembers old commits. If you want the old exposed password
scrubbed from history entirely (not just removed going forward), let me know —
it takes rewriting git history, which is a bit more involved. Since you already
rotated the password twice, the old leaked one is no longer valid either way,
but the string will still technically be visible in old commits until history
is rewritten.
