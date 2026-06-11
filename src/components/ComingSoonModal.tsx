import { InfoModal } from './InfoModal';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function ComingSoonModal({ isOpen, onClose, title }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <InfoModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      content={
        <div className="text-center py-8">
          {/* Icon */}
          <div className="text-6xl mb-6">🚧</div>
          
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-4">Coming Soon!</h3>
          
          {/* Description */}
          <p className="text-slate-300 mb-6">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>
          
          {/* Features List */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-bold text-[#00d4ff]">Fast Development</div>
              <div className="text-xs text-slate-400">We're building it right</div>
            </div>
            <div className="p-4 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20">
              <div className="text-2xl mb-2">💎</div>
              <div className="font-bold text-[#00ff88]">Quality First</div>
              <div className="text-xs text-slate-400">No shortcuts, just quality</div>
            </div>
          </div>
          
          {/* Notify Me Section */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/20">
            <p className="text-sm text-slate-300 mb-4">
              Want to be notified when this launches?
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] text-sm"
              />
              <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#0a0e1a] font-bold text-sm hover:shadow-lg transition-all">
                Notify Me
              </button>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all">
              <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all">
              <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all">
              <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3">Follow us for updates</p>
        </div>
      }
    />
  );
}
