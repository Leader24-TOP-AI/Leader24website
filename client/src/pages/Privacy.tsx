import { useCallback, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { useTheme } from '@/components/ThemeProvider';

export default function Privacy() {
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
              Informativa Privacy
            </h1>
            
            <div className={`flex items-center mb-8 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="mr-4">
                <span className="font-semibold">Ultimo Aggiornamento:</span> 24-Ago-2024
              </div>
              <div>
                <span className="font-semibold">Data di Entrata in Vigore:</span> 25-Ago-2024
              </div>
            </div>
            
            <div className={`space-y-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              <section>
                <p className="mb-4">
                  Questa Informativa sulla Privacy descrive le politiche di Sevedo Co. Ltd.,
                  291 Vichitsongkram Road, Phuket 83120, Thailandia, email: info@leader24.it,
                  telefono: +393762493961 riguardo la raccolta, l'uso e la divulgazione delle informazioni che raccogliamo
                  quando utilizzi il nostro sito web (leader24.it) (il "Servizio"). Accedendo o utilizzando il
                  Servizio, acconsenti alla raccolta, all'uso e alla divulgazione delle tue informazioni in conformità con questa
                  Informativa sulla Privacy. Se non acconsenti a quanto sopra, ti preghiamo di non accedere o utilizzare il Servizio.
                </p>
                
                <p>
                  Potremmo modificare questa Informativa sulla Privacy in qualsiasi momento senza
                  previo avviso e pubblicheremo la versione aggiornata sul Servizio. La nuova Politica entrerà
                  in vigore 180 giorni dopo la sua pubblicazione sul Servizio e il tuo
                  accesso o utilizzo continuato del Servizio dopo tale data
                  costituirà l'accettazione della nuova Informativa sulla Privacy. Ti consigliamo pertanto di
                  rivedere periodicamente questa pagina.
                </p>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>1. Informazioni che Raccogliamo:</h2>
                <p className="mb-4">
                  Raccoglieremo e tratteremo le seguenti informazioni personali:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Nome</li>
                  <li>Email</li>
                  <li>Numero di telefono</li>
                </ul>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>2. Come Utilizziamo le Tue Informazioni:</h2>
                <p className="mb-4">
                  Utilizzeremo le informazioni che raccogliamo su di te per i seguenti scopi:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Marketing/Promozionale</li>
                  <li>Creazione di un account utente</li>
                  <li>Elaborazione dei pagamenti</li>
                  <li>Gestione delle informazioni amministrative</li>
                  <li>Gestione degli ordini dei clienti</li>
                </ul>
                <p>
                  Se desideriamo utilizzare le tue informazioni per qualsiasi altro
                  scopo, ti chiederemo il consenso e utilizzeremo
                  le tue informazioni solo dopo aver ricevuto il
                  tuo consenso e solo per lo scopo/i per cui
                  hai dato il consenso, salvo obblighi di legge contrari.
                </p>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>3. Come Condividiamo le Tue Informazioni:</h2>
                <p>
                  Non trasferiremo le tue informazioni personali
                  a terzi senza il tuo consenso, 
                  salvo in circostanze limitate descritte nella nostra politica sulla privacy. Adottiamo misure ragionevoli per garantire che i tuoi dati siano protetti quando vengono trasferiti a terzi.
                </p>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>4. Collegamenti a Terze Parti & Uso delle Tue Informazioni:</h2>
                <p>
                  Il nostro Servizio può contenere collegamenti ad altri siti web
                  che non sono gestiti da noi. Questa Informativa sulla Privacy
                  non affronta la politica sulla privacy e altre
                  pratiche di terze parti, inclusi eventuali
                  terzi che operano qualsiasi sito web o servizio
                  a cui si può accedere tramite un collegamento sul
                  Servizio. Ti consigliamo vivamente di esaminare
                  l'informativa sulla privacy di ogni sito che visiti. Non abbiamo
                  controllo e non ci assumiamo alcuna responsabilità per
                  il contenuto, le politiche sulla privacy o le pratiche di
                  siti o servizi di terze parti.
                </p>
              </section>
              
              <section>
                <h2 className={`text-xl font-semibold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>5. Responsabile della Protezione dei Dati:</h2>
                <p>
                  Se hai domande o preoccupazioni riguardo al
                  trattamento delle tue informazioni da parte nostra,
                  puoi inviare un'email al nostro Responsabile della Protezione dei Dati presso
                  Sevedo Co. Ltd.,
                  291 Vichitsongkram Road,
                  email: <a href="mailto:info@leader24.it" className="text-[#FF5722] hover:underline">info@leader24.it</a>.
                  Affronteremo le tue preoccupazioni in conformità con la legge applicabile.
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