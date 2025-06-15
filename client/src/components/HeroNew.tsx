import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/utils';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function HeroNew() {
  const { theme } = useTheme();
  // Stati per gestire le posizioni e le dimensioni dei gradienti
  const [gradient1, setGradient1] = useState({ x: -40, y: 40, size: 96, opacity: 0.3 });
  const [gradient2, setGradient2] = useState({ x: -40, y: -40, size: 96, opacity: 0.3 });
  const [gradient3, setGradient3] = useState({ x: 50, y: 50, size: 80, opacity: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Riferimento per l'animazione
  const animationRef = useRef<number | null>(null);
  
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

  // Aggiungiamo stati aggiuntivi per una maggiore randomizzazione
  const [rotation, setRotation] = useState({ g1: 0, g2: 0, g3: 0 });
  const [randomOffsets] = useState({
    x1: Math.random() * 20 - 10,
    y1: Math.random() * 20 - 10,
    x2: Math.random() * 20 - 10,
    y2: Math.random() * 20 - 10,
    x3: Math.random() * 20 - 10,
    y3: Math.random() * 20 - 10,
  });
  
  // Funzione di animazione MOLTO più veloce
  const animate = useCallback(() => {
    const now = Date.now();
    
    // Rotazione più veloce e randomizzata
    setRotation({
      g1: (now / 80) % 360,
      g2: -(now / 60) % 360,
      g3: (now / 70) % 360
    });
    
    // Funzione per aggiungere randomicità al movimento
    const jitter = () => (Math.random() - 0.5) * 15;
    
    // Gradiente BLU - movimento ULTRA veloce e casuale
    setGradient1({
      // Movimento rapido + posizione mouse + randomicità + offset casuale costante
      x: -20 + Math.sin(now / 500) * 80 + mousePosition.x * 40 + jitter() + randomOffsets.x1,
      y: 20 + Math.cos(now / 400) * 70 + mousePosition.y * 40 + jitter() + randomOffsets.y1,
      // Pulsazione dimensionale più evidente
      size: 110 + Math.sin(now / 300) * 60,
      // Pulsazione visibilità
      opacity: 0.5 + Math.sin(now / 600) * 0.3
    });
    
    // Gradiente VIOLA - movimento ULTRA veloce in direzione opposta
    setGradient2({
      x: -30 + Math.cos(now / 450) * 90 - mousePosition.x * 40 + jitter() + randomOffsets.x2,
      y: -30 + Math.sin(now / 350) * 80 - mousePosition.y * 40 + jitter() + randomOffsets.y2,
      size: 130 + Math.cos(now / 250) * 70,
      opacity: 0.5 + Math.cos(now / 500) * 0.3
    });
    
    // Gradiente ARANCIONE - movimento estremamente rapido
    setGradient3({
      x: 30 + Math.sin(now / 350) * 85 + mousePosition.y * 30 + jitter() + randomOffsets.x3,
      y: 30 + Math.cos(now / 300) * 75 - mousePosition.x * 30 + jitter() + randomOffsets.y3,
      size: 120 + Math.sin(now / 200) * 65,
      opacity: 0.45 + Math.sin(now / 400) * 0.25
    });
    
    // Continua l'animazione
    animationRef.current = requestAnimationFrame(animate);
  }, [mousePosition]);

  useEffect(() => {
    // Aggiungi event listener per il movimento del mouse
    window.addEventListener('mousemove', handleMouseMove);
    
    // Avvia l'animazione
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleMouseMove, animate]);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className={`absolute inset-0 hero-gradient ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
        {/* Gradienti animati sullo sfondo */}
        {/* Aggiungiamo un nuovo gradiente VERDE per più movimento */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.4), rgba(5, 150, 105, 0.4))', 
            width: '500px', 
            height: '500px',
            left: '70%', 
            top: '60%',
            opacity: 0.4 + Math.sin(Date.now() / 500) * 0.3,
            transition: 'none',
            boxShadow: '0 0 120px 40px rgba(16, 185, 129, 0.2)',
            transform: `rotate(${Date.now() / 50 % 360}deg)`,
            animation: 'pulse 4s ease-in-out infinite alternate'
          }}
        ></div>
      
        <div 
          className="absolute rounded-full blur-3xl animate-pulse-slow"
          style={{ 
            backgroundColor: 'rgba(111, 76, 255, 0.4)', 
            width: `${gradient2.size * 4}px`, 
            height: `${gradient2.size * 4}px`,
            right: `${gradient2.x}%`, 
            top: `${gradient2.y}%`,
            opacity: gradient2.opacity,
            transition: 'none',
            boxShadow: '0 0 120px 40px rgba(111, 76, 255, 0.2)',
            transform: `rotate(${rotation.g2}deg)`,
          }}
        ></div>
        <div 
          className="absolute rounded-full blur-3xl"
          style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.4)', 
            width: `${gradient1.size * 4}px`, 
            height: `${gradient1.size * 4}px`,
            left: `${gradient1.x}%`, 
            top: `${gradient1.y}%`,
            opacity: gradient1.opacity,
            transition: 'none',
            boxShadow: '0 0 120px 40px rgba(59, 130, 246, 0.25)',
            transform: `rotate(${rotation.g1}deg)`,
          }}
        ></div>
        <div 
          className="absolute rounded-full blur-3xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(255, 87, 34, 0.4), rgba(255, 160, 122, 0.4))', 
            width: `${gradient3.size * 4}px`, 
            height: `${gradient3.size * 4}px`,
            left: `${gradient3.x}%`, 
            bottom: `${gradient3.y}%`,
            opacity: gradient3.opacity,
            transition: 'none',
            boxShadow: '0 0 120px 40px rgba(255, 87, 34, 0.25)',
            transform: `rotate(${rotation.g3}deg)`,
          }}
        ></div>
        
        {/* Overlay di rumore per aggiungere texture */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'overlay',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight relative">
            <span className={`${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300' : 'bg-gradient-to-r from-slate-800 to-slate-600'} text-transparent bg-clip-text`}>Automazioni AI per</span>{' '}
            <span className="bg-gradient-to-r from-[#FF5722] via-[#FF8C4C] to-[#FFA07A] animate-gradient-x text-transparent bg-clip-text">LiveChat e WhatsApp</span>{' '}
            <span className={`${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300' : 'bg-gradient-to-r from-slate-800 to-slate-600'} text-transparent bg-clip-text`}>Aziendali</span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 ${theme === 'dark' ? 'bg-gradient-to-r from-[#E0E0E0] via-white to-[#BDBDBD]' : 'bg-gradient-to-r from-slate-700 to-slate-900'} animate-gradient-slow text-transparent bg-clip-text`}>
            Automatizza, Rispondi, Eccelli. Sempre, Ovunque, 24/7
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
            <a 
              href="https://api.whatsapp.com/send?phone=393762493961&text=Salve,%20vorrei%20una%20dimostrazione%20su%20come%20funziona%20il%20vostro%20servizio"
            >
              <Button 
                size="lg" 
                className="relative overflow-hidden bg-gradient-to-r from-[#FF5722] to-[#FFA07A] text-white px-8 py-6 h-auto text-lg group"
              >
                <span className="relative z-10">Provaci su WhatsApp</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#FFA07A] to-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
              </Button>
            </a>
            
            <Button 
              size="lg" 
              variant="outline" 
              className={`relative ${theme === 'dark' ? 'border-white/30' : 'border-slate-500/50'} overflow-hidden px-8 py-6 h-auto text-lg group`}
              onClick={() => scrollToElement('features')}
            >
              <span className={`relative z-10 ${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300' : 'bg-gradient-to-r from-slate-700 to-slate-900'} text-transparent bg-clip-text transition-all duration-500 ${theme === 'dark' ? 'group-hover:from-gray-300 group-hover:to-white' : 'group-hover:from-slate-900 group-hover:to-slate-700'}`}>
                Scopri di Più
              </span>
              <span className={`absolute inset-0 border ${theme === 'dark' ? 'border-white/30' : 'border-slate-500/50'} rounded-md opacity-100`}></span>
              <span className={`absolute inset-0 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></span>
            </Button>
          </div>
          
          <div className="mx-auto max-w-2xl mt-12">
            <div className={`p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-500/5 border-slate-500/10'} border rounded-xl relative overflow-hidden group animate-float`}>
              {/* Effetto highlight sull'angolo */}
              <div 
                className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#FF5722]/30 to-transparent rotate-12 blur-lg group-hover:scale-150 transition-transform duration-700 ease-out"
              ></div>
              
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FF5722] via-[#FF8C4C] to-[#FFA07A] animate-gradient-x text-transparent bg-clip-text">
                Prova il nostro Assistente AI
              </h2>
              <p className={`mb-4 relative z-10 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                Il nostro assistente virtuale è sempre disponibile sulla destra dello schermo per rispondere alle tue domande. Non esitare a chattare con lui!
              </p>
              <p className={`text-sm relative z-10 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                La stessa tecnologia può essere integrata nei tuoi canali di comunicazione aziendali.
              </p>
              
              {/* Border shine effect */}
              <div className={`absolute inset-0 border ${theme === 'dark' ? 'border-white/10' : 'border-slate-400/10'} rounded-xl overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-white/20' : 'via-slate-400/20'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}