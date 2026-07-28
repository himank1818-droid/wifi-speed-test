import { useEffect, useState, useCallback } from 'react';
import { api } from '../api';

interface ResultRow {
  _id: string;
  download: number;
  upload: number;
  ping: number;
  jitter: number;
  createdAt: string;
}

interface Props {
  getToken: () => Promise<string | null>;
}

export function ResultsTab({ getToken }: Props) {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [stats, setStats] = useState({ avgDownload: 0, avgUpload: 0, avgPing: 0 });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 50;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getResults(getToken, page, limit);
      setResults(data.results);
      setStats(data.stats);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load results');
    } finally {
      setLoading(false);
    }
  }, [getToken, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this result?')) return;
    try {
      await api.deleteResult(getToken, id);
      setResults((r) => r.filter((row) => row._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const totalPages = Math.max(Math.ceil(total / limit), 1);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Avg download" value={`${stats.avgDownload.toFixed(1)} Mbps`} />
        <StatCard label="Avg upload" value={`${stats.avgUpload.toFixed(1)} Mbps`} />
        <StatCard label="Avg ping" value={`${stats.avgPing.toFixed(0)} ms`} />
      </div>

      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-white/50">{total} total tests recorded</p>
        <button
          onClick={load}
          className="text-sm text-[#00d4ff] hover:underline"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/[0.03] text-white/50 text-left">
              <th className="p-3">Date</th>
              <th className="p-3">Download</th>
              <th className="p-3">Upload</th>
              <th className="p-3">Ping</th>
              <th className="p-3">Jitter</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-white/40">Loading…</td></tr>
            ) : results.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-white/40">No test results yet.</td></tr>
            ) : (
              results.map((r) => (
                <tr key={r._id} className="border-t border-white/5">
                  <td className="p-3 text-white/70">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="p-3">{r.download.toFixed(1)} Mbps</td>
                  <td className="p-3">{r.upload.toFixed(1)} Mbps</td>
                  <td className="p-3">{r.ping.toFixed(0)} ms</td>
                  <td className="p-3">{r.jitter.toFixed(0)} ms</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4 text-sm">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="disabled:opacity-30"
          >
            Previous
          </button>
          <span className="text-white/50">Page {page} of {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="disabled:opacity-30"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
      <p className="text-xs text-white/50 mb-1">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
