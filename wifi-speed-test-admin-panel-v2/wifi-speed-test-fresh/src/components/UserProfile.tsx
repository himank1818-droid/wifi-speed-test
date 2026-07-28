import { useState } from 'react';
import { EmailLogin } from './EmailLogin';
import { useAuth } from '../firebase/useAuth';

export function UserProfile() {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/30">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="w-5 h-5 rounded-full" />
          ) : (
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#00ff88] flex items-center justify-center text-xs font-bold text-[#0a0e1a]">
              {user.displayName?.charAt(0) || 'U'}
            </div>
          )}
          <span className="text-xs text-white font-medium">{user.displayName}</span>
        </div>
        <button onClick={logout} className="text-xs text-slate-400 hover:text-red-400 transition-colors px-3 py-2 rounded-full hover:bg-red-500/10">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowLoginModal(true)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00d4ff]/10 to-[#00ff88]/10 border border-[#00d4ff]/30 text-white hover:border-[#00d4ff]/50 transition-all text-sm font-medium"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>Create Account</span>
      </button>

      {showLoginModal && (
        <EmailLogin
          onLogin={() => setShowLoginModal(false)}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
}
