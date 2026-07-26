import { useState } from 'react';
import { useAdminAuth } from './useAdminAuth';
import { Login } from './components/Login';
import { ResultsTab } from './components/ResultsTab';
import { ContentTab } from './components/ContentTab';
import { AdsTab } from './components/AdsTab';

type Tab = 'results' | 'content' | 'ads';

export default function AdminApp() {
  const { user, loading, error, isAuthenticated, signIn, signOut, getToken } = useAdminAuth();
  const [tab, setTab] = useState<Tab>('results');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white/40">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onSignIn={signIn} loading={loading} error={error} />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div>
          <h1 className="font-semibold">Admin panel</h1>
          <p className="text-xs text-white/40">Signed in as {user?.email}</p>
        </div>
        <button onClick={signOut} className="text-sm text-white/50 hover:text-white">
          Sign out
        </button>
      </header>

      <nav className="flex gap-1 px-6 pt-4 border-b border-white/10">
        {(['results', 'content', 'ads'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm rounded-t-lg capitalize ${
              tab === t
                ? 'bg-white/[0.05] text-white border-b-2 border-[#00d4ff]'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="p-6">
        {tab === 'results' && <ResultsTab getToken={getToken} />}
        {tab === 'content' && <ContentTab getToken={getToken} />}
        {tab === 'ads' && <AdsTab getToken={getToken} />}
      </main>
    </div>
  );
}
