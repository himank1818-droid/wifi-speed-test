import { useTranslation } from '../i18n/LanguageContext';

export function NetworkHealth() {
  const { t } = useTranslation();
  
  const metrics = [
    { label: t('feature.security') || 'Security', value: 'Protected', color: 'text-emerald-400', icon: '🛡️' },
    { label: t('gauge.signal') || 'Signal', value: 'Excellent', color: 'text-cyan-400', icon: '📶' },
    { label: t('gauge.stability') || 'Stability', value: '99.9%', color: 'text-emerald-400', icon: '⚖️' },
    { label: t('nav.data') || 'Type', value: 'Fiber/5G', color: 'text-purple-400', icon: '⚡' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {metrics.map((m, i) => (
        <div key={i} className="glass-card gradient-border p-4 rounded-2xl flex items-center gap-3">
          <span className="text-xl">{m.icon}</span>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest">{m.label}</div>
            <div className={`text-sm font-bold ${m.color}`}>{m.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
