import { connectDB, Content } from './_lib/mongodb.js';
import { requireAdmin } from './_lib/verifyAdmin.js';

const DEFAULT_CONTENT = {
  heroTitle: 'Free WiFi Speed Test',
  heroSubtitle: 'Check your internet speed online for free — download, upload, and ping, instantly.',
  seoTitle: 'Free WiFi Speed Test – Check Internet Speed Online Instantly',
  seoDescription:
    'Test your internet speed online for free. Check WiFi speed, download speed, upload speed, and ping instantly with accurate results. No app needed.',
};

export default async function handler(req, res) {
  await connectDB();

  // Public: the live site fetches this at runtime to render editable text/SEO tags.
  if (req.method === 'GET') {
    const doc = await Content.findOne({ key: 'site' }).lean();
    return res.status(200).json(doc ? doc.data : DEFAULT_CONTENT);
  }

  // Admin-only: editing the content from the admin panel.
  const decoded = await requireAdmin(req, res);
  if (!decoded) return;

  if (req.method === 'PUT') {
    const data = req.body || {};
    const doc = await Content.findOneAndUpdate(
      { key: 'site' },
      { data, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return res.status(200).json(doc.data);
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}
