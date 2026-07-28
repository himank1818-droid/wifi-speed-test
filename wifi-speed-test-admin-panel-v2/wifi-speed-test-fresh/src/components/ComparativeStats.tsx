export function ComparativeStats() {
  return (
    <div className="glass-card gradient-border rounded-2xl p-6 mb-8 overflow-hidden relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>📈</span> Global Comparison
        </h3>
        <span className="text-[10px] bg-[#00d4ff]/10 text-[#00d4ff] px-2 py-1 rounded-full uppercase font-bold tracking-tighter">Live Updates</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Your Speed</span>
            <span className="text-[#00ff88] font-bold">You are here</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00ff88]" style={{ width: '65%' }}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center border-t border-white/5 pt-4 mt-2">
          <div>
            <div className="text-xl font-bold text-white">45.2 <span className="text-[10px] text-slate-500">Mbps</span></div>
            <div className="text-[10px] text-slate-500 uppercase">Global Avg</div>
          </div>
          <div>
            <div className="text-xl font-bold text-white">128.4 <span className="text-[10px] text-slate-500">Mbps</span></div>
            <div className="text-[10px] text-slate-500 uppercase">Top 10% Avg</div>
          </div>
        </div>
      </div>
    </div>
  );
}
