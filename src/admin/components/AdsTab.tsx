import { useEffect, useState } from 'react';
import { api } from '../api';

interface AdsConfig {
  enabled: boolean;
  headerSlotHtml: string;
  footerSlotHtml: string;
}

interface Props {
  getToken: () => Promise<string | null>;
}

export function AdsTab({ getToken }: Props) {
  const [ads, setAds] = useState<AdsConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    api.getAds(getToken).then(setAds).catch(() => setAds(null));
  }, [getToken]);

  const handleSave = async () => {
    if (!ads) return;
    setSaving(true);
    setStatus(null);
    try {
      await api.saveAds(getToken, ads);
      setStatus('Saved');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!ads) return <p className="text-white/40">Loading…</p>;

  return (
    <div className="max-w-xl">
      <label className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          checked={ads.enabled}
          onChange={(e) => setAds({ ...ads, enabled: e.target.checked })}
          className="w-4 h-4"
        />
        <span>Show ads on the site</span>
      </label>

      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-1">Header ad slot (HTML/script tag from your ad network)</label>
        <textarea
          value={ads.headerSlotHtml}
          onChange={(e) => setAds({ ...ads, headerSlotHtml: e.target.value })}
          rows={4}
          placeholder="<!-- paste your ad network's snippet here -->"
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-sm font-mono"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm text-white/60 mb-1">Footer ad slot</label>
        <textarea
          value={ads.footerSlotHtml}
          onChange={(e) => setAds({ ...ads, footerSlotHtml: e.target.value })}
          rows={4}
          placeholder="<!-- paste your ad network's snippet here -->"
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-sm font-mono"
        />
      </div>

      <p className="text-xs text-white/30 mb-4">
        These snippets are inserted as-is into the page. Only paste code from ad networks you trust —
        anything placed here runs directly in your visitors' browsers.
      </p>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-[#00d4ff] text-black font-medium rounded-lg px-5 py-2.5 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save changes'}
      </button>
      {status && <span className="ml-3 text-sm text-white/50">{status}</span>}
    </div>
  );
}
