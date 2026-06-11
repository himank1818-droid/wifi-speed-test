import { useState } from 'react';

interface EmailLoginProps {
  onLogin: (email: string, name: string) => void;
  onClose: () => void;
}

export function EmailLogin({ onLogin, onClose }: EmailLoginProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    // Auto-generate name from email
    const emailName = email.split('@')[0];
    const displayName = emailName.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const user = {
      uid: 'user-' + Date.now(),
      email: email.toLowerCase().trim(),
      displayName: displayName,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=00d4ff&color=0a0e1a&size=128`,
    };

    localStorage.setItem('speedtest-user', JSON.stringify(user));
    onLogin(user.email, user.displayName);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal - Centered */}
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="glass-card gradient-border rounded-2xl p-6 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Create Your Account</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all"
                autoFocus
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff] transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#0a0e1a] font-bold shadow-lg disabled:opacity-50 transition-all"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#111827] text-slate-500">or</span>
            </div>
          </div>

          {/* Google Demo */}
          <button
            onClick={() => {
              const demoUser = {
                uid: 'demo-' + Date.now(),
                email: 'demo@gmail.com',
                displayName: 'Demo User',
                photoURL: 'https://ui-avatars.com/api/?name=Demo+User&background=00d4ff&color=0a0e1a&size=128',
              };
              localStorage.setItem('speedtest-user', JSON.stringify(demoUser));
              onLogin(demoUser.email, demoUser.displayName);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-[#00d4ff]/30 transition-all text-sm font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google (Demo)
          </button>

          {/* Info */}
          <p className="mt-4 text-xs text-slate-500 text-center">
            No password required - login persists in your browser
          </p>
        </div>
      </div>
    </>
  );
}
