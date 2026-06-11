export function ShareResults({ download, upload, ping }: { download: number; upload: number; ping: number }) {
  const handleShare = () => {
    const text = `🚀 My Internet Speed Report!\n📥 Download: ${download} Mbps\n📤 Upload: ${upload} Mbps\n📡 Ping: ${ping} ms\nTested on SpeedCheck AI. Check yours!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({ title: 'My Speed Test', text, url });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + url)}`);
    }
  };

  return (
    <div className="glass-card gradient-border p-6 rounded-2xl mb-8 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-2xl mb-3">
        🤳
      </div>
      <h3 className="text-white font-bold mb-2">Impressive Results!</h3>
      <p className="text-slate-400 text-sm mb-4">Your connection is faster than 85% of users. Show the world!</p>
      <button 
        onClick={handleShare}
        className="px-8 py-3 rounded-xl bg-white text-[#0a0e1a] font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Share on Social
      </button>
    </div>
  );
}
