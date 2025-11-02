import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'it', // Forza italiano come lingua iniziale
    fallbackLng: 'it',
    supportedLngs: ['it', 'en'],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      // Priorità: SOLO localStorage (ignora navigator per mostrare sempre italiano ai crawler)
      // L'utente può comunque cambiare lingua manualmente con LanguageSelector
      order: ['localStorage'],
      caches: ['localStorage'],
      // Se localStorage è vuoto, usa 'it' come default (definito in lng sopra)
    },
    defaultNS: 'common',
    ns: ['common', 'home', 'sectors', 'ecommerce', 'casestudies', 'contact', 'privacy', 'cookie', 'terms'],
    react: {
      useSuspense: true,
    },
    load: 'languageOnly',
  });

export default i18n;