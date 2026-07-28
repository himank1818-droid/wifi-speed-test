export interface ServerData {
  id: string;
  name: string;
  location: string;
  country?: string;
  distance?: number;
}

export type { ServerData as Server };

interface ServerInfoProps {
  isp?: string;
  ip?: string;
  server?: ServerData;
  connections?: 'multi' | 'single';
  onConnectionsChange?: (type: 'multi' | 'single') => void;
  onChangeServer?: () => void;
  onScanNearby?: () => void;
  isLoading?: boolean;
}

export function ServerInfo({
  isp,
  ip,
  server,
  connections = 'multi',
  onConnectionsChange,
  onChangeServer,
  onScanNearby,
  isLoading = false,
}: ServerInfoProps) {
  // Show loading state or fallback values
  const displayIsp = isLoading ? 'Detecting...' : (isp || 'Unknown ISP');
  const displayIp = isLoading ? '...' : (ip || '0.0.0.0');
  const displayServer = isLoading ? 'Finding Server...' : (server?.name || 'Local Server');
  const displayLocation = isLoading ? '' : (server?.location || 'Unknown');
  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {/* ISP and Server Info */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
        {/* ISP Info (Left) */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-white font-medium text-sm sm:text-base">{displayIsp}</div>
            <div className="text-slate-400 text-xs sm:text-sm font-mono">{displayIp}</div>
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Divider (visible on mobile) */}
        <div className="w-px h-8 bg-slate-700 sm:hidden" />

        {/* Server Info (Right) */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-white font-medium text-sm sm:text-base">{displayServer}</div>
            <div className="text-slate-400 text-xs sm:text-sm flex items-center gap-2">
              {displayLocation}
              {server?.distance !== undefined && (
                <span className="text-[#00ff88] font-medium">• {server.distance} km away</span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <button
                onClick={onChangeServer}
                className="text-[#00d4ff] hover:text-[#00e5ff] text-xs font-medium transition-colors flex items-center gap-1"
                disabled={isLoading}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Change
              </button>
              <button
                onClick={onScanNearby}
                className="text-[#00ff88] hover:text-[#00e5ff] text-xs font-medium transition-colors flex items-center gap-1"
                disabled={isLoading}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Scan Nearby
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Connections Toggle */}
      <div className="flex items-center justify-center gap-3 pt-6">
        <span className="text-xs text-slate-500 uppercase tracking-wider">Connections</span>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={() => onConnectionsChange?.('multi')}
            className={`text-sm font-medium transition-colors ${
              connections === 'multi' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Multi
          </button>
          <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 5h8m-4-9v14" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h2m14 0h2" />
            </svg>
          </div>
          <button
            onClick={() => onConnectionsChange?.('single')}
            className={`text-sm font-medium transition-colors ${
              connections === 'single' ? 'text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Single
          </button>
        </div>
      </div>
    </div>
  );
}
