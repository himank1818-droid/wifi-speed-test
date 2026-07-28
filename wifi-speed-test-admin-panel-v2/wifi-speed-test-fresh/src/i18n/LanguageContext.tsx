import { createContext, useContext } from 'react';
import type { Language } from './translations';
import { getTranslation, isRTL } from './translations';

interface LanguageContextType {
  currentLang: string;
  currentLanguageInfo: Language;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  currentLang, 
  currentLanguageInfo 
}: { 
  children: React.ReactNode;
  currentLang: string;
  currentLanguageInfo: Language;
}) {
  const t = (key: string) => getTranslation(currentLang as any, key as any);
  const rtl = isRTL(currentLang as any);

  return (
    <LanguageContext.Provider value={{ currentLang, currentLanguageInfo, t, isRTL: rtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
