interface CountrySpeed {
  country: string;
  flag: string;
  speed: number;
}

export function GlobalReportCard({ userSpeed }: { userSpeed: number }) {
  
  const benchmarks: CountrySpeed[] = [
    { country: 'Singapore', flag: '🇸🇬', speed: 263.5 },
    { country: 'United Arab Emirates', flag: '🇦🇪', speed: 257.1 },
    { country: 'United States', flag: '🇺🇸', speed: 215.3 },
    { country: 'South Korea', flag: '🇰🇷', speed: 198.4 },
    { country: 'United Kingdom', flag: '🇬🇧', speed: 110.2 },
    { country: 'India (Avg)', flag: '🇮🇳', speed: 95.4 },
    { country: 'Global Average', flag: '🌐', speed: 45.2 },
  ];

  // Find where user fits
  const beatCountries = benchmarks.filter(b => userSpeed > b.speed);
  const percentage = Math.round((beatCountries.length / benchmarks.length) * 100);

  return (
    <div className="glass-card gradient-border rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden relative animate-reveal">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">🌍 Global Report Card</h3>
            <p className="text-slate-400 text-sm">How your speed ranks against the world</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-[#00ff88]">{percentage}%</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">World Rank</div>
          </div>
        </div>

        <div className="space-y-4">
          {benchmarks.map((b, i) => {
            const isUserBetter = userSpeed > b.speed;
            return (
              <div key={i} className="relative">
                <div className="flex items-center justify-between mb-1.5 px-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{b.flag}</span>
                    <span className={`text-sm ${isUserBetter ? 'text-slate-300' : 'text-slate-500'}`}>{b.country}</span>
                  </div>
                  <span className={`text-xs font-mono ${isUserBetter ? 'text-[#00ff88]' : 'text-slate-600'}`}>
                    {b.speed} Mbps
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${isUserBetter ? 'bg-gradient-to-r from-[#00d4ff] to-[#00ff88]' : 'bg-slate-700/30'}`}
                    style={{ width: `${Math.min((b.speed / 300) * 100, 100)}%` }}
                  ></div>
                </div>
                {i === benchmarks.findIndex(curr => userSpeed > curr.speed) && (
                  <div className="absolute -top-1 left-0 w-full flex justify-end pr-2 pointer-events-none">
                     <span className="bg-[#00d4ff] text-[#0a0e1a] text-[9px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-[0_0_10px_rgba(0,212,255,0.5)]">YOU ARE HERE</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p className="text-slate-300 text-sm">
            {userSpeed > 100 
              ? "🚀 You're in the elite tier! Your connection handles 8K streaming and pro gaming with ease."
              : userSpeed > 50 
              ? "✅ Great connection! Perfectly optimized for high-quality video calls and 4K Netflix."
              : "📈 Decent speed for daily tasks. Consider a 5GHz router upgrade for even better performance."}
          </p>
        </div>
      </div>
      
      {/* Decorative World Map Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 pointer-events-none">
        <svg width="400" height="200" viewBox="0 0 800 400" fill="white">
          <path d="M150 100h100v100h-100zM350 150h100v100h-100zM550 100h100v100h-100zM200 250h100v100h-100zM450 250h100v100h-100z" />
        </svg>
      </div>
    </div>
  );
}
