import { useEffect, useState } from 'react';
import { api } from '../api';

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  seoTitle: string;
  seoDescription: string;
}

interface Props {
  getToken: () => Promise<string | null>;
}

export function ContentTab({ getToken }: Props) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    api.getContent(getToken).then(setContent).catch(() => setContent(null));
  }, [getToken]);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setStatus(null);
    try {
      await api.saveContent(getToken, content);
      setStatus('Saved');
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (!content) return <p className="text-white/40">Loading…</p>;

  const field = (key: keyof SiteContent, label: string, multiline = false) => (
    <div className="mb-4">
      <label className="block text-sm text-white/60 mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={content[key]}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          rows={3}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-sm"
        />
      ) : (
        <input
          value={content[key]}
          onChange={(e) => setContent({ ...content, [key]: e.target.value })}
          className="w-full bg-white/[0.03] border border-white/10 rounded-lg p-3 text-sm"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-xl">
      <h2 className="text-sm uppercase tracking-wide text-white/40 mb-4">Homepage</h2>
      {field('heroTitle', 'Hero title')}
      {field('heroSubtitle', 'Hero subtitle', true)}

      <h2 className="text-sm uppercase tracking-wide text-white/40 mb-4 mt-8">SEO</h2>
      {field('seoTitle', 'Page title (browser tab / search results)')}
      {field('seoDescription', 'Meta description', true)}

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-2 bg-[#00d4ff] text-black font-medium rounded-lg px-5 py-2.5 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save changes'}
      </button>
      {status && <span className="ml-3 text-sm text-white/50">{status}</span>}
    </div>
  );
}
