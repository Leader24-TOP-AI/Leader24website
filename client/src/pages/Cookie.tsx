import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

export default function Cookie() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Gestisce il movimento del mouse per aggiornare la posizione del gradiente
  const handleMouseMove = useCallback((event: MouseEvent) => {
    // Calcola la posizione relativa del mouse rispetto alla viewport
    const { clientX, clientY } = event;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Normalizza le coordinate del mouse (da -1 a 1)
    const normalizedX = (clientX / windowWidth) * 2 - 1;
    const normalizedY = (clientY / windowHeight) * 2 - 1;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  }, []);

  useEffect(() => {
    // Aggiungi event listener per il movimento del mouse
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
      <Header />
      <MobileMenu />
      
      <main className="flex-1 py-16 md:py-24 relative overflow-hidden">
        {/* Sfondo con gradiente scuro e interattivo */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#0A0A10]/80' : 'bg-gray-100/50'}`}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className={`max-w-4xl mx-auto p-6 md:p-10 rounded-xl ${
            theme === 'dark' 
              ? 'bg-black/40 backdrop-blur-sm border border-white/10' 
              : 'bg-white shadow-lg border border-gray-100'
          }`}>
            <h1 className={`text-3xl md:text-4xl font-bold mb-8 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text'
                : 'text-slate-800'
            }`}>
              Informativa Cookie
            </h1>
            
            <div className={`flex items-center mb-8 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="mr-4">
                <span className="font-semibold">Data di Entrata in Vigore:</span> 24-Ago-2024
              </div>
              <div>
                <span className="font-semibold">Ultimo Aggiornamento:</span> 24-Ago-2024
              </div>
            </div>
            
            <div className={`space-y-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              <section>
                <h2 className={`text-xl font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>Cosa sono i cookie?</h2>
                <p className="mb-4">
                  Questa Politica sui Cookie spiega cosa sono i cookie e come li utilizziamo, i tipi di cookie che utilizziamo, 
                  cioè le informazioni che raccogliamo tramite i cookie e come tali informazioni vengono utilizzate, e come gestire 
                  le impostazioni dei cookie.
                </p>
                <p>
                  I cookie sono piccoli file di testo utilizzati per memorizzare piccole porzioni di informazioni. Vengono memorizzati 
                  sul tuo dispositivo quando il sito web viene caricato nel tuo browser. Questi cookie ci aiutano a far funzionare 
                  correttamente il sito web, a renderlo più sicuro, a fornire una migliore esperienza utente, e a comprendere come 
                  il sito web funziona e a analizzare cosa funziona e dove è necessario migliorare.
                </p>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>Come utilizziamo i cookie?</h2>
                <p className="mb-4">
                  Come la maggior parte dei servizi online, il nostro sito utilizza cookie di prima e di terza parte per diversi 
                  scopi. I cookie di prima parte sono principalmente necessari per il corretto funzionamento del sito web e non 
                  raccolgono alcun dato personale identificabile.
                </p>
                <p>
                  I cookie di terze parti utilizzati sul nostro sito servono principalmente a comprendere come il sito web funziona, 
                  come interagisci con il nostro sito, a mantenere i nostri servizi sicuri, a fornire pubblicità rilevanti per te, 
                  e in generale a offrirti una migliore e migliorata esperienza utente e a velocizzare le tue future interazioni 
                  con il nostro sito.
                </p>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>Cookies utilizzati</h2>
                <div className={`border rounded-lg p-4 ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-900/50'
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <p className={`italic ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>Informazioni dettagliate sui cookie utilizzati saranno visualizzate qui.</p>
                </div>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>Gestisci le preferenze dei cookie</h2>
                <Button 
                  className={`mb-6 ${
                    theme === 'dark'
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Impostazioni dei Cookie
                </Button>
                
                <p className="mb-4">
                  Puoi modificare le tue preferenze sui cookie in qualsiasi momento cliccando sul pulsante sopra. Questo ti 
                  permetterà di rivedere il banner di consenso ai cookie e modificare le tue preferenze o revocare il tuo 
                  consenso immediatamente.
                </p>
                
                <p className="mb-4">
                  Oltre a questo, diversi browser offrono diversi metodi per bloccare ed eliminare i cookie utilizzati dai siti web. 
                  Puoi modificare le impostazioni del tuo browser per bloccare/eliminare i cookie. Di seguito sono elencati i link 
                  ai documenti di supporto su come gestire ed eliminare i cookie dai principali browser web.
                </p>
                
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>
                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-800 font-medium'}>Chrome: </span>
                    <a 
                      href="https://support.google.com/accounts/answer/32050" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF5722] hover:underline"
                    >
                      https://support.google.com/accounts/answer/32050
                    </a>
                  </li>
                  <li>
                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-800 font-medium'}>Safari: </span>
                    <a 
                      href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF5722] hover:underline"
                    >
                      https://support.apple.com/it-it/guide/safari/sfri11471/mac
                    </a>
                  </li>
                  <li>
                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-800 font-medium'}>Firefox: </span>
                    <a 
                      href="https://support.mozilla.org/it/kb/attivare-e-disattivare-i-cookie" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF5722] hover:underline"
                    >
                      https://support.mozilla.org/it/kb/attivare-e-disattivare-i-cookie
                    </a>
                  </li>
                  <li>
                    <span className={theme === 'dark' ? 'text-white' : 'text-slate-800 font-medium'}>Internet Explorer: </span>
                    <a 
                      href="https://support.microsoft.com/it-it/topic/come-eliminare-i-file-cookie-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#FF5722] hover:underline"
                    >
                      https://support.microsoft.com/it-it/topic/come-eliminare-i-file-cookie-in-internet-explorer-bca9446f-d873-78de-77ba-d42645fa52fc
                    </a>
                  </li>
                </ul>
                
                <p>
                  Se utilizzi un altro browser web, visita i documenti di supporto ufficiali del tuo browser.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}