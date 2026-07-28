import { useState } from 'react';
import type { Language } from '../i18n/translations';
import { LANGUAGES } from '../i18n/translations';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (lang: Language) => void;
  currentLanguage?: Language;
}

export function LanguageModal({ isOpen, onClose, onSelectLanguage, currentLanguage }: LanguageModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Group languages by region for better organization
  const popularLanguages = LANGUAGES.filter(l => 
    ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ar', 'hi', 'pt', 'ru'].includes(l.code)
  );
  
  const indianLanguages = LANGUAGES.filter(l => 
    ['hi', 'bn', 'pa', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'ur'].includes(l.code)
  );
  
  const europeanLanguages = LANGUAGES.filter(l => 
    ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'nl', 'pl', 'sv', 'da', 'no', 'fi', 'cs', 'sk', 'hu', 'ro', 'bg', 'hr', 'sr', 'uk', 'el', 'tr'].includes(l.code)
  );
  
  const otherLanguages = LANGUAGES.filter(l => 
    !popularLanguages.includes(l) && !indianLanguages.includes(l) && !europeanLanguages.includes(l)
  );

  // Filter function
  const filterLanguages = (langs: Language[]) => {
    if (!searchTerm) return langs;
    return langs.filter(l => 
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle language selection
  const handleSelect = (lang: Language) => {
    onSelectLanguage(lang);
    onClose();
  };

  // Close on Escape key
  useState(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  });

  if (!isOpen) return null;

  const LanguageSection = ({ title, languages }: { title: string; languages: Language[] }) => {
    const filtered = filterLanguages(languages);
    if (filtered.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {filtered.map((lang) => {
            const isSelected = lang.code === currentLanguage?.code;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-200 text-left ${
                  isSelected
                    ? 'bg-[#00d4ff]/10 border-[#00d4ff]/30 shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-[#00d4ff]/20 hover:bg-[#00d4ff]/[0.05]'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-white font-medium text-xs truncate">{lang.nativeName}</div>
                  <div className="text-slate-500 text-[10px] truncate">{lang.name}</div>
                </div>
                {isSelected && (
                  <svg className="w-4 h-4 text-[#00d4ff] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-modal-title"
    >
      <div
        className="glass-card gradient-border rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 id="language-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-[#00d4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.148" />
            </svg>
            Select Language
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
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/50 transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Language List */}
        <div className="p-5 overflow-y-auto max-h-[50vh]">
          <LanguageSection title="Popular Languages" languages={popularLanguages} />
          <LanguageSection title="Indian Languages" languages={indianLanguages} />
          <LanguageSection title="European Languages" languages={europeanLanguages} />
          {otherLanguages.length > 0 && (
            <LanguageSection title="Other Languages" languages={otherLanguages} />
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/[0.02]">
          <div className="text-xs text-slate-500">
            {LANGUAGES.length} languages available
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors border border-slate-700 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
