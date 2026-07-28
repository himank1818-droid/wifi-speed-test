interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

export function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-2xl p-4">
        <div className="glass-card gradient-border rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="text-slate-300 space-y-4">
            {content}
          </div>

          {/* Close Button */}
          <div className="mt-8 pt-4 border-t border-white/10">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#0a0e1a] font-bold transition-all hover:shadow-lg"
            >
              Got It!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
