import { InfoModal } from './InfoModal';

interface NavModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: 'learn' | 'data' | 'about' | null;
}

export function NavModal({ isOpen, onClose, section }: NavModalProps) {
  if (!isOpen || !section) return null;

  const content: Record<string, React.ReactNode> = {
    learn: (
      <>
        <p className="text-lg">
          Welcome to the <strong>Learning Center</strong>! Here you'll find comprehensive guides and resources to help you understand internet speed testing and get the most out of your connection.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">📚 Popular Topics:</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">📖 Understanding Speed Tests</h4>
            <p className="text-sm text-slate-400">Learn how speed tests work, what they measure, and how to interpret your results.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">⚡ Internet Speed Basics</h4>
            <p className="text-sm text-slate-400">Download vs upload, Mbps explained, ping, jitter, and more.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">🎮 Gaming & Streaming</h4>
            <p className="text-sm text-slate-400">Optimal speeds for gaming, 4K streaming, and video conferencing.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 hover:border-[#00d4ff]/30 transition-all cursor-pointer">
            <h4 className="font-bold text-[#00d4ff] mb-2">🔧 Troubleshooting Guide</h4>
            <p className="text-sm text-slate-400">Fix slow speeds, connection drops, and WiFi issues.</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">🎓 Quick Guides:</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">📋</span>
            <div>
              <div className="font-bold text-white">How to Run a Speed Test</div>
              <div className="text-sm text-slate-400">Step-by-step guide for accurate results</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">📊</span>
            <div>
              <div className="font-bold text-white">Reading Your Results</div>
              <div className="text-sm text-slate-400">What do download, upload, and ping mean?</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">🏠</span>
            <div>
              <div className="font-bold text-white">Home Network Optimization</div>
              <div className="text-sm text-slate-400">Tips to improve your WiFi performance</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#00d4ff] text-lg">📱</span>
            <div>
              <div className="font-bold text-white">Mobile vs Desktop Testing</div>
              <div className="text-sm text-slate-400">When to use each platform for best results</div>
            </div>
          </li>
        </ul>

        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff]">
            💡 <strong>Tip:</strong> Check back regularly - we add new guides and tutorials every week!
          </p>
        </div>
      </>
    ),

    data: (
      <>
        <p className="text-lg">
          Access comprehensive <strong>internet performance data</strong> from millions of speed tests conducted worldwide. Make informed decisions based on real-world data.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">📊 Available Data:</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🌍</span>
              <h4 className="font-bold text-[#00d4ff]">Global Speed Index</h4>
            </div>
            <p className="text-sm text-slate-400 mb-3">
              Average internet speeds by country, updated monthly with data from millions of tests.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-[#00d4ff]/10">
                <div className="text-[#00d4ff] font-bold">Fixed Broadband</div>
                <div className="text-white">#1: Singapore - 262 Mbps</div>
              </div>
              <div className="p-2 rounded bg-[#00ff88]/10">
                <div className="text-[#00ff88] font-bold">Mobile</div>
                <div className="text-white">#1: UAE - 261 Mbps</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏙️</span>
              <h4 className="font-bold text-[#00d4ff]">City Rankings</h4>
            </div>
            <p className="text-sm text-slate-400">
              Compare internet speeds across major cities worldwide. Find the fastest cities for remote work, streaming, and gaming.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📈</span>
              <h4 className="font-bold text-[#00d4ff]">ISP Performance</h4>
            </div>
            <p className="text-sm text-slate-400">
              Compare internet service providers in your area. See which ISPs deliver on their promised speeds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📱</span>
              <h4 className="font-bold text-[#00d4ff]">5G Coverage Map</h4>
            </div>
            <p className="text-sm text-slate-400">
              Interactive map showing 5G coverage and speeds across different regions and carriers.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">📥 Download Reports:</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <button className="p-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-left hover:bg-[#00d4ff]/20 transition-all">
            <div className="font-bold text-[#00d4ff]">📄 Global State of Internet 2025</div>
            <div className="text-xs text-slate-400">PDF • 2.4 MB • Updated Monthly</div>
          </button>
          <button className="p-3 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-left hover:bg-[#00ff88]/20 transition-all">
            <div className="font-bold text-[#00ff88]">📊 ISP Performance Report</div>
            <div className="text-xs text-slate-400">PDF • 1.8 MB • Updated Quarterly</div>
          </button>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff]">
            📊 <strong>Data Source:</strong> Aggregated from 100+ million speed tests conducted monthly
          </p>
        </div>
      </>
    ),

    about: (
      <>
        <p className="text-lg">
          Welcome to <strong>SpeedCheck</strong> - your trusted source for accurate internet speed testing since 2024.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">🎯 Our Mission:</h3>
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
          <p className="text-slate-300">
            To provide everyone with free, accurate, and easy-to-use internet speed testing tools, helping millions of users worldwide understand and optimize their internet connections.
          </p>
        </div>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">✨ Why Choose SpeedCheck?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-bold text-[#00d4ff] mb-2">Lightning Fast</h4>
            <p className="text-sm text-slate-400">Tests complete in under 10 seconds with accurate results</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-bold text-[#00d4ff] mb-2">100% Free</h4>
            <p className="text-sm text-slate-400">No hidden fees, no premium tiers, completely free forever</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-2xl mb-2">🌍</div>
            <h4 className="font-bold text-[#00d4ff] mb-2">Global Servers</h4>
            <p className="text-sm text-slate-400">50,000+ servers worldwide for accurate local testing</p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-bold text-[#00d4ff] mb-2">Works Everywhere</h4>
            <p className="text-sm text-slate-400">Desktop, mobile, tablet - test on any device</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">📈 Our Impact:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-3xl font-bold text-[#00d4ff]">50M+</div>
            <div className="text-xs text-slate-400 mt-1">Tests Conducted</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-3xl font-bold text-[#00ff88]">195+</div>
            <div className="text-xs text-slate-400 mt-1">Countries</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-3xl font-bold text-[#b84dff]">50+</div>
            <div className="text-xs text-slate-400 mt-1">Languages</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/[0.05] border border-white/10">
            <div className="text-3xl font-bold text-[#00e5ff]">99.9%</div>
            <div className="text-xs text-slate-400 mt-1">Uptime</div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">👥 Our Team:</h3>
        <p className="text-slate-300">
          We're a team of network engineers, developers, and internet enthusiasts dedicated to making internet speed testing accessible to everyone. Our technology is built on years of experience in network performance analysis.
        </p>

        <h3 className="text-xl font-bold text-white mt-6 mb-4">📧 Contact Us:</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[#00d4ff]">📧</span>
            <span>support@speedcheck.app</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[#00d4ff]">🐦</span>
            <span>@SpeedCheckApp</span>
          </div>
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[#00d4ff]">💼</span>
            <span>LinkedIn: SpeedCheck</span>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
          <p className="text-sm text-[#00d4ff]">
            🏆 <strong>Award Winning:</strong> Best Speed Test Tool 2025 - TechReview Awards
          </p>
        </div>

        <h3 className="text-xl font-bold text-white mt-8 mb-4">👨‍💻 Developer Information</h3>
        <div className="glass-card p-6 rounded-2xl border border-[#00ff88]/20 bg-gradient-to-br from-[#00d4ff]/5 to-[#00ff88]/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-[#00ff88] flex items-center justify-center text-3xl shadow-lg">
              HS
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Himank Singh</h4>
              <p className="text-[#00ff88] text-sm font-medium">Lead Full Stack Developer</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Lead Developer of SpeedCheck AI. Expert in building high-performance web applications with React, Tailwind CSS, and AI integration. I specialize in creating premium UI/UX experiences and advanced networking tools.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="mailto:himanksingh733@gmail.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#00d4ff]/10 border border-white/10 hover:border-[#00d4ff]/30 transition-all">
              <span className="text-lg">📧</span>
              <span className="text-sm text-slate-300">himanksingh733@gmail.com</span>
            </a>
            <a href="https://github.com" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-[#00ff88]/10 border border-white/10 hover:border-[#00ff88]/30 transition-all">
              <span className="text-lg">💻</span>
              <span className="text-sm text-slate-300">GitHub Profile</span>
            </a>
            <a href="https://www.linkedin.com/in/himanksingh9648326698" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 transition-all">
              <span className="text-lg">🔗</span>
              <span className="text-sm text-slate-300">LinkedIn</span>
            </a>
            <a href="https://portfolio.com" target="_blank" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-purple-500/10 border border-white/10 hover:border-purple-500/30 transition-all">
              <span className="text-lg">🎨</span>
              <span className="text-sm text-slate-300">Portfolio</span>
            </a>
          </div>
        </div>
      </>
    ),
  };

  const titles: Record<string, string> = {
    learn: '📚 Learning Center',
    data: '📊 Internet Data & Reports',
    about: 'ℹ️ About SpeedCheck',
  };

  return (
    <InfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={titles[section] || ''}
      content={content[section] || null}
    />
  );
}
