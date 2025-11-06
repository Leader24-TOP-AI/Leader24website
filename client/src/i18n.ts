import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Custom language detector based on URL path
const urlLanguageDetector = {
  name: 'urlPath',
  lookup() {
    const path = window.location.pathname;
    // Check if URL starts with /en
    if (path.startsWith('/en')) {
      return 'en';
    }
    // Default to Italian
    return 'it';
  },
  cacheUserLanguage(lng: string) {
    // Store in localStorage for persistence
    localStorage.setItem('i18nextLng', lng);
  }
};

// Create custom language detector
const languageDetector = new LanguageDetector();
languageDetector.addDetector(urlLanguageDetector);

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'it',
    supportedLngs: ['it', 'en'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      // Priority: URL path first, then localStorage, then default to Italian
      order: ['urlPath', 'localStorage'],
      caches: ['localStorage'],
    },
    defaultNS: 'common',
    ns: ['common', 'home', 'sectors', 'ecommerce', 'casestudies', 'contact', 'privacy', 'cookie', 'terms'],
    react: {
      useSuspense: true,
    },
    load: 'languageOnly',
  });

export default i18n;