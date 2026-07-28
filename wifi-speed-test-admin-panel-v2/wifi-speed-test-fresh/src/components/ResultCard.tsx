interface ResultCardProps {
  icon: string;
  label: string;
  value: number;
  unit: string;
  color: 'blue' | 'green' | 'cyan' | 'purple';
  status?: string;
  isLoading?: boolean;
}

const colorMap = {
  blue: {
    text: 'text-[#00d4ff]',
    border: 'border-[#00d4ff]/20',
    bg: 'bg-[#00d4ff]/5',
    shadow: 'shadow-[0_0_20px_rgba(0,212,255,0.15)]',
    glow: 'neon-text-blue',
  },
  green: {
    text: 'text-[#00ff88]',
    border: 'border-[#00ff88]/20',
    bg: 'bg-[#00ff88]/5',
    shadow: 'shadow-[0_0_20px_rgba(0,255,136,0.15)]',
    glow: 'neon-text-green',
  },
  cyan: {
    text: 'text-[#00e5ff]',
    border: 'border-[#00e5ff]/20',
    bg: 'bg-[#00e5ff]/5',
    shadow: 'shadow-[0_0_20px_rgba(0,229,255,0.15)]',
    glow: 'neon-text-cyan',
  },
  purple: {
    text: 'text-[#b84dff]',
    border: 'border-[#b84dff]/20',
    bg: 'bg-[#b84dff]/5',
    shadow: 'shadow-[0_0_20px_rgba(184,77,255,0.15)]',
    glow: '',
  },
};

export function ResultCard({ icon, label, value, unit, color, status, isLoading }: ResultCardProps) {
  const c = colorMap[color];

  return (
    <div
      className={`glass-card gradient-border rounded-2xl p-5 sm:p-6 ${c.border} ${c.shadow} transition-all duration-500 hover:scale-[1.02]`}
      role="region"
      aria-label={`${label}: ${value} ${unit}`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-xl`}>
          {icon}
        </div>
        <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">{label}</span>
      </div>

      <div className="flex items-baseline gap-2">
        {isLoading ? (
          <div className={`text-3xl sm:text-4xl font-bold ${c.text} ${c.glow} number-tick`}>
            {value > 0 ? value.toFixed(1) : '—'}
          </div>
        ) : (
          <div className={`text-3xl sm:text-4xl font-bold ${c.text} ${c.glow}`}>
            {value > 0 ? value.toFixed(1) : '—'}
          </div>
        )}
        <span className="text-sm text-slate-500 font-medium">{unit}</span>
      </div>

      {status && (
        <div className={`mt-3 text-xs font-medium ${c.text} opacity-70`}>
          {status}
        </div>
      )}

      {isLoading && (
        <div className="mt-3 h-1 rounded-full bg-slate-700/50 overflow-hidden">
          <div className={`h-full ${c.bg.replace('/5', '/40')} progress-shimmer rounded-full`} style={{ width: '60%' }} />
        </div>
      )}
    </div>
  );
}
