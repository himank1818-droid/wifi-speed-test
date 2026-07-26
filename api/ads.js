import { connectDB, Ads } from './_lib/mongodb.js';
import { requireAdmin } from './_lib/verifyAdmin.js';

const DEFAULT_ADS = {
  enabled: false,
  headerSlotHtml: '',
  footerSlotHtml: '',
};

export default async function handler(req, res) {
  await connectDB();

  // Public: the live site fetches this to know whether/what ads to render.
  if (req.method === 'GET') {
    const doc = await Ads.findOne({ key: 'ads' }).lean();
    return res.status(200).json(doc ? doc.data : DEFAULT_ADS);
  }

  // Admin-only: editing ad settings from the admin panel.
  const decoded = await requireAdmin(req, res);
  if (!decoded) return;

  if (req.method === 'PUT') {
    const data = req.body || {};
    const doc = await Ads.findOneAndUpdate(
      { key: 'ads' },
      { data, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    return res.status(200).json(doc.data);
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ error: 'Method not allowed' });
}
