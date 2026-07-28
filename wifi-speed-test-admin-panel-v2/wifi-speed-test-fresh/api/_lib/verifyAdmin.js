import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize firebase-admin once per warm container.
function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Private key is stored with literal "\n" in the env var — convert back to real newlines.
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY environment variables'
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

/**
 * Verifies the Firebase ID token sent in the Authorization header
 * (format: "Bearer <token>") and checks the signed-in email against
 * the ADMIN_EMAILS allowlist (comma-separated env var).
 *
 * Returns the decoded token if valid and authorized, otherwise
 * writes a 401/403 response and returns null — callers should
 * `return` immediately when this returns null.
 */
export async function requireAdmin(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    res.status(401).json({ error: 'Missing Authorization header' });
    return null;
  }

  let decoded;
  try {
    getAdminApp();
  } catch (err) {
    res.status(500).json({ error: 'Firebase Admin not configured: ' + err.message });
    return null;
  }
  try {
    decoded = await getAuth().verifyIdToken(token);
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token: ' + err.message });
    return null;
  }

  const adminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (!decoded.email || !adminEmails.includes(decoded.email.toLowerCase())) {
    res.status(403).json({ error: 'This account is not authorized as an admin' });
    return null;
  }

  return decoded;
}
