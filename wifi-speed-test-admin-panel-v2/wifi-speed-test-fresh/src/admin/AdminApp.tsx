import { useState } from 'react';
import { LayoutDashboard, Gauge, FileText, Megaphone, LogOut } from 'lucide-react';
import { useAdminAuth } from './useAdminAuth';
import { Login } from './components/Login';
import { DashboardTab } from './components/DashboardTab';
import { ResultsTab } from './components/ResultsTab';
import { ContentTab } from './components/ContentTab';
import { AdsTab } from './components/AdsTab';

type Tab = 'dashboard' | 'results' | 'content' | 'ads';

const NAV: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'results', label: 'Results', icon: Gauge },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'ads', label: 'Ads', icon: Megaphone },
];

export default function AdminApp() {
  const { user, loading, error, isAuthenticated, signIn, signOut, getToken } = useAdminAuth();
  const [tab, setTab] = useState<Tab>('dashboard');

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

  const initial = (user?.email || '?')[0].toUpperCase();

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-4">WiFi Speed Test</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/40 flex items-center justify-center text-[#00d4ff] font-semibold">
              {initial}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user?.displayName || 'Admin'}</p>
              <p className="text-xs text-white/40 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                tab === id
                  ? 'bg-[#00d4ff]/10 text-[#00d4ff]'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/[0.04] transition"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="px-8 py-6 border-b border-white/10">
          <h1 className="text-xl font-semibold capitalize">{tab}</h1>
          <p className="text-sm text-white/40 mt-0.5">
            {tab === 'dashboard' && "Overview of your site's speed test activity"}
            {tab === 'results' && 'Every recorded speed test, newest first'}
            {tab === 'content' && 'Edit homepage text and SEO tags'}
            {tab === 'ads' && 'Control ad slots shown on the site'}
          </p>
        </header>

        <main className="p-8">
          {tab === 'dashboard' && <DashboardTab getToken={getToken} />}
          {tab === 'results' && <ResultsTab getToken={getToken} />}
          {tab === 'content' && <ContentTab getToken={getToken} />}
          {tab === 'ads' && <AdsTab getToken={getToken} />}
        </main>
      </div>
    </div>
  );
}
