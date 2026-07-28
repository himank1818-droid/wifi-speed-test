import { useTranslation } from '../i18n/LanguageContext';
import type { TestResult } from '../hooks/useRealSpeedTest';

interface HistoryProps {
  results: TestResult[];
  onClear: () => void;
}

function formatDateTime(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

export function History({ results, onClear }: HistoryProps) {
  const { t } = useTranslation();
  
  if (!results || results.length === 0) {
    return (
      <section id="history-section" aria-label="Test history" className="w-full max-w-4xl mx-auto mb-12">
        <div className="glass-card gradient-border rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-white mb-2">{t('history.title')}</h3>
          <p className="text-slate-400 text-sm mb-6">
            No test results yet. Click "START TEST" to measure your internet speed!
          </p>
          <div className="text-xs text-slate-500">
            Your test results will be saved here automatically
          </div>
        </div>
      </section>
    );
  }

  // Calculate statistics
  const avgDownload = results.length > 0 
    ? (results.reduce((sum, r) => sum + r.download, 0) / results.length).toFixed(1) 
    : '0';
  const avgUpload = results.length > 0 
    ? (results.reduce((sum, r) => sum + r.upload, 0) / results.length).toFixed(1) 
    : '0';
  const avgPing = results.length > 0 
    ? (results.reduce((sum, r) => sum + r.ping, 0) / results.length).toFixed(0) 
    : '0';

  return (
    <section id="history-section" aria-label="Test history" className="w-full max-w-4xl mx-auto mb-12">
      {/* Header with stats */}
      <div className="glass-card gradient-border rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#00ff88] flex items-center justify-center text-2xl">
              📊
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{t('history.title')}</h3>
              <p className="text-xs text-slate-400">{results.length} test{results.length !== 1 ? 's' : ''} saved</p>
            </div>
          </div>
          <button
            onClick={onClear}
            className="px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors rounded-lg border border-red-500/20 hover:border-red-500/40"
            aria-label={t('history.clear')}
          >
            {t('history.clear')}
          </button>
        </div>

        {/* Average Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00d4ff]">{avgDownload}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Avg Download (Mbps)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00ff88]">{avgUpload}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Avg Upload (Mbps)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#b84dff]">{avgPing}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Avg Ping (ms)</div>
          </div>
        </div>
      </div>

      {/* Test Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((r, index) => (
          <article
            key={r.id}
            className={`glass-card rounded-xl p-5 border transition-all duration-300 hover:scale-[1.02] cursor-pointer group ${
              index === 0 
                ? 'border-[#00d4ff]/30 shadow-[0_0_20px_rgba(0,212,255,0.15)]' 
                : 'border-white/5 hover:border-[#00d4ff]/20'
            }`}
          >
            {/* Latest badge */}
            {index === 0 && (
              <div className="absolute -top-2 -right-2 px-2 py-1 bg-[#00d4ff] text-[#0a0e1a] text-[10px] font-bold rounded-full uppercase tracking-wider">
                Latest
              </div>
            )}

            {/* Timestamp */}
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-slate-400">{formatDateTime(r.timestamp)}</span>
            </div>

            {/* Results */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#00d4ff]/5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📥</span>
                  <span className="text-xs text-slate-400">{t('results.download')}</span>
                </div>
                <span className="text-lg font-bold text-[#00d4ff]">{r.download.toFixed(1)}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#00ff88]/5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📤</span>
                  <span className="text-xs text-slate-400">{t('results.upload')}</span>
                </div>
                <span className="text-lg font-bold text-[#00ff88]">{r.upload.toFixed(1)}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#b84dff]/5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📡</span>
                  <span className="text-xs text-slate-400">{t('results.ping')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-[#b84dff]">{r.ping.toFixed(0)}</span>
                  <span className="text-[10px] text-slate-500">ms</span>
                </div>
              </div>

              {/* Jitter (if available) */}
              {r.jitter !== undefined && r.jitter > 0 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">〰️</span>
                    <span className="text-xs text-slate-400">Jitter</span>
                  </div>
                  <span className="text-sm font-bold text-slate-300">{r.jitter.toFixed(0)} ms</span>
                </div>
              )}
            </div>

            {/* Performance indicator */}
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Performance</span>
                <span className={`font-medium ${
                  r.download > 100 ? 'text-[#00ff88]' :
                  r.download > 50 ? 'text-[#00d4ff]' :
                  r.download > 25 ? 'text-[#ffd700]' :
                  'text-red-400'
                }`}>
                  {r.download > 100 ? '⚡ Excellent' :
                   r.download > 50 ? '✓ Good' :
                   r.download > 25 ? '⚠ Fair' :
                   '✕ Poor'}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Export button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            const dataStr = JSON.stringify(results, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = 'speedtest-history.json';
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
          }}
          className="px-6 py-3 text-sm text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 rounded-xl"
        >
          📥 Export Results (JSON)
        </button>
      </div>
    </section>
  );
}
