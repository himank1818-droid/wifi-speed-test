import { useState, useEffect, useCallback } from 'react';
import type { LanguageCode } from './translations';
import { LANGUAGES, getTranslation, isRTL } from './translations';

const LANGUAGE_STORAGE_KEY = 'speedtest-language';

export function useLanguage() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null;
    if (savedLang && LANGUAGES.some(l => l.code === savedLang)) {
      setCurrentLang(savedLang);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
      if (LANGUAGES.some(l => l.code === browserLang)) {
        setCurrentLang(browserLang);
      }
    }
  }, []);

  // Save language preference
  const changeLanguage = useCallback((lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    // Update document direction for RTL languages
    document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  // Translation helper
  const t = useCallback((key: string) => {
    return getTranslation(currentLang, key as any);
  }, [currentLang]);

  // Get current language info
  const currentLanguageInfo = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return {
    currentLang,
    currentLanguageInfo,
    languages: LANGUAGES,
    changeLanguage,
    t,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    isRTL: isRTL(currentLang),
  };
}
