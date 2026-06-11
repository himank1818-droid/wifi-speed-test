import { useState, useEffect } from 'react';
import { getNearbyServers, getUserLocation } from '../utils/getNearbyServers';

export interface Server {
  id: string;
  name: string;
  location: string;
  country: string;
  distance?: number;
  latency?: number;
  lat?: string;
  lon?: string;
  sponsor?: string;
}

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServer: (server: Server) => void;
  currentServer?: Server;
}

export function ServerModal({ isOpen, onClose, onSelectServer, currentServer }: ServerModalProps) {
  const [servers, setServers] = useState<Server[]>([]);
  const [allServers, setAllServers] = useState<Server[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [maxDistance, setMaxDistance] = useState<number>(10); // Default: 10 km radius
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  // Fetch real nearby servers when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      
      getUserLocation()
        .then((location) => {
          setUserLocation(location ? { lat: location.latitude, lon: location.longitude } : null);
          return getNearbyServers(location);
        })
        .then((serversWithDistance) => {
          setAllServers(serversWithDistance);
          // Initially filter to 10km radius
          const filtered = serversWithDistance.filter(s => (s.distance || 9999) <= 10);
          setServers(filtered.length > 0 ? filtered : serversWithDistance.slice(0, 30));
          setSelectedId(currentServer?.id || (filtered[0]?.id || serversWithDistance[0]?.id) || null);
          setIsLoading(false);
        })
        .catch((error) => {
          console.warn('Failed to fetch servers:', error);
          getNearbyServers(null).then((fallback) => {
            setAllServers(fallback);
            setServers(fallback.slice(0, 30));
            setSelectedId(currentServer?.id || fallback[0]?.id || null);
            setIsLoading(false);
          });
        });
    }
  }, [isOpen, currentServer]);

  // Filter servers based on search AND distance
  const filteredServers = allServers
    .filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDistance = (s.distance || 9999) <= maxDistance;
      return matchesSearch && matchesDistance;
    })
    .sort((a, b) => (a.distance || 9999) - (b.distance || 9999));

  // Handle server selection
  const handleSelect = () => {
    const selected = servers.find((s) => s.id === selectedId);
    if (selected) {
      onSelectServer(selected);
      onClose();
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="server-modal-title"
    >
      <div
        className="glass-card gradient-border rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 id="server-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Select Nearby Server
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Location Info & Distance Filter */}
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00ff88]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-slate-400">
                {userLocation ? 'Using your location' : 'Using IP location'}
              </span>
            </div>
            <span className="text-xs text-[#00d4ff] font-medium">
              {filteredServers.length} servers within {maxDistance} km
            </span>
          </div>
          
          {/* Distance Filter Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider">Radius:</span>
            {[5, 10, 25, 50, 100].map((dist) => (
              <button
                key={dist}
                onClick={() => setMaxDistance(dist)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  maxDistance === dist
                    ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:border-[#00d4ff]/20'
                }`}
              >
                {dist} km
              </button>
            ))}
            <button
              onClick={() => setMaxDistance(9999)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                maxDistance === 9999
                  ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:border-[#00d4ff]/20'
              }`}
            >
              All
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by city, ISP, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Server List */}
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
              <p className="text-slate-400 text-sm">Finding nearby servers...</p>
            </div>
          ) : filteredServers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-400 text-sm">No servers found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredServers.map((server) => {
                const isSelected = server.id === selectedId;
                const isCurrent = server.id === currentServer?.id;
                return (
                  <button
                    key={server.id}
                    onClick={() => setSelectedId(server.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#00d4ff]/10 border-[#00d4ff]/30 shadow-[0_0_20px_rgba(0,212,255,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/[0.05]'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-left">
                      {/* Radio button */}
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-[#00d4ff] bg-[#00d4ff]'
                            : 'border-slate-600 bg-transparent'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-[#0a0e1a]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                      {/* Server info */}
                      <div>
                        <div className="text-white font-medium text-sm">{server.name}</div>
                        <div className="text-slate-400 text-xs">
                          {server.location}, {server.country}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      {server.distance !== undefined && (
                        <div className="text-[#00ff88] text-xs font-medium">{server.distance} km</div>
                      )}
                      {isCurrent && (
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Current</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-white/5 bg-white/[0.02]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors border border-slate-700 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={!selectedId || isLoading}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#00ff88] text-[#0a0e1a] font-bold shadow-[0_0_20px_rgba(0,212,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm btn-glow"
          >
            Change Server
          </button>
        </div>
      </div>
    </div>
  );
}
