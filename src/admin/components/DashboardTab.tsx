import { useEffect, useState, useCallback } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
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

export function DashboardTab({ getToken }: Props) {
  const [results, setResults] = useState<ResultRow[]>([]);
  const [stats, setStats] = useState({ avgDownload: 0, avgUpload: 0, avgPing: 0 });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getResults(getToken, 1, 30);
      setResults(data.results);
      setStats(data.stats);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    load();
  }, [load]);

  const chartData = [...results]
    .reverse()
    .map((r) => ({
      time: new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      download: Number(r.download.toFixed(1)),
      upload: Number(r.upload.toFixed(1)),
      ping: Number(r.ping.toFixed(0)),
    }));

  if (error) {
    return (
      <div>
        <p className="text-red-400 text-sm mb-3">{error}</p>
        <button onClick={load} className="text-sm text-[#00d4ff] hover:underline">Try again</button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total tests" value={total.toString()} accent="#00d4ff" />
        <StatCard label="Avg download" value={`${stats.avgDownload.toFixed(1)} Mbps`} accent="#00ff88" />
        <StatCard label="Avg upload" value={`${stats.avgUpload.toFixed(1)} Mbps`} accent="#ffb800" />
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
        <h2 className="text-sm text-white/60 mb-4">Recent test speeds (Mbps)</h2>
        {loading ? (
          <p className="text-white/40 text-sm py-10 text-center">Loading…</p>
        ) : chartData.length === 0 ? (
          <p className="text-white/40 text-sm py-10 text-center">No test results yet — once visitors run the speed test, this chart fills in.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
              <Tooltip
                contentStyle={{ background: '#0a0e1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
              />
              <Legend />
              <Line type="monotone" dataKey="download" stroke="#00d4ff" strokeWidth={2} dot={false} name="Download" />
              <Line type="monotone" dataKey="upload" stroke="#00ff88" strokeWidth={2} dot={false} name="Upload" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-white/50 mb-1">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div
        className="w-10 h-10 rounded-full border-2"
        style={{ borderColor: accent, borderTopColor: 'transparent' }}
      />
    </div>
  );
}
