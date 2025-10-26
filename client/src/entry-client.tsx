import { hydrateRoot } from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import App from "./App";
import "./index.css";
// Import i18n configuration
import i18n from "./i18n";

// Funzione per aggiornare il tag lang in base alla lingua corrente
const updateHtmlLang = (language: string) => {
  const htmlElement = document.getElementById('html-root');
  if (htmlElement) {
    htmlElement.setAttribute('lang', language);
    console.log(`Lingua HTML impostata a: ${language}`);
  }
};

// Imposta la lingua iniziale
updateHtmlLang(i18n.language);

// Aggiorna il tag lang ogni volta che la lingua cambia
i18n.on('languageChanged', (lang) => {
  updateHtmlLang(lang);
});

// Hydrate instead of render for SSR
hydrateRoot(
  document.getElementById("root")!,
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
