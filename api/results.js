import { connectDB, Result } from './_lib/mongodb.js';
import { requireAdmin } from './_lib/verifyAdmin.js';

export default async function handler(req, res) {
  await connectDB();

  // POST — any visitor's browser can submit a completed speed test result.
  // No admin auth here on purpose: this is what powers the analytics the
  // admin panel shows. We keep the payload minimal and validated.
  if (req.method === 'POST') {
    const { download, upload, ping, jitter } = req.body || {};
    const nums = [download, upload, ping, jitter];
    if (nums.some((n) => typeof n !== 'number' || Number.isNaN(n) || n < 0)) {
      return res.status(400).json({ error: 'download, upload, ping, jitter must all be non-negative numbers' });
    }
    const result = await Result.create({ download, upload, ping, jitter });
    return res.status(201).json({ id: result._id });
  }

  // Everything else (viewing and deleting individual results) is admin-only.
  const decoded = await requireAdmin(req, res);
  if (!decoded) return; // requireAdmin already sent the error response

  if (req.method === 'GET') {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 50, 200);

    const [results, total, agg] = await Promise.all([
      Result.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Result.countDocuments(),
      Result.aggregate([
        {
          $group: {
            _id: null,
            avgDownload: { $avg: '$download' },
            avgUpload: { $avg: '$upload' },
            avgPing: { $avg: '$ping' },
          },
        },
      ]),
    ]);

    return res.status(200).json({
      results,
      total,
      page,
      limit,
      stats: agg[0] || { avgDownload: 0, avgUpload: 0, avgPing: 0 },
    });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id query parameter is required' });
    await Result.findByIdAndDelete(id);
    return res.status(200).json({ deleted: true });
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'Method not allowed' });
}
