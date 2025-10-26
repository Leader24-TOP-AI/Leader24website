import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
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
      order: ['path', 'localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie'],
      lookupFromPathIndex: 0,
    },
    defaultNS: 'common',
    ns: ['common', 'home', 'sectors', 'ecommerce', 'casestudies', 'contact', 'privacy', 'cookie', 'terms'],
    react: {
      useSuspense: true,
    },
    load: 'languageOnly',
  });

export default i18n;