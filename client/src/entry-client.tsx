import { createRoot } from "react-dom/client";
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
  }
};

// Imposta la lingua iniziale
updateHtmlLang(i18n.language);

// Aggiorna il tag lang ogni volta che la lingua cambia
i18n.on('languageChanged', (lang) => {
  updateHtmlLang(lang);
});

// Client-side rendering (no SSR needed for Vercel static deployment)
// Meta tags are still crawlable by search engines with this approach
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
