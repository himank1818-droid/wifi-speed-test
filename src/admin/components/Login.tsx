interface Props {
  onSignIn: () => void;
  loading: boolean;
  error: string | null;
}

export function Login({ onSignIn, loading, error }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030712] text-white px-4">
      <div className="w-full max-w-sm bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-center">
        <h1 className="text-xl font-semibold mb-1">Admin panel</h1>
        <p className="text-sm text-white/50 mb-6">WiFi Speed Test</p>

        <button
          onClick={onSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-lg py-2.5 font-medium hover:bg-white/90 transition disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in with Google'}
        </button>

        {error && (
          <p className="mt-4 text-sm text-red-400">
            {error}
          </p>
        )}

        <p className="mt-6 text-xs text-white/30">
          Only the site owner's Google account can access this panel.
        </p>
      </div>
    </div>
  );
}
