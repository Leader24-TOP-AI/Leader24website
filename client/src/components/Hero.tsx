import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(['home']);
  // Stati estesi per una migliore animazione
  const [gradientPosition, setGradientPosition] = useState({ 
    x1: -40, 
    y1: 40, 
    x2: -40, 
    y2: -40,
    x3: 70,  // Nuovo gradiente arancione
    y3: 60,
    x4: 30,  // Nuovo gradiente verde
    y4: -50,
    rotation1: 0,
    rotation2: 0,
    rotation3: 0,
    rotation4: 0,
    size1: 96,
    size2: 96,
    size3: 120,
    size4: 110
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Funzione per generare un valore casuale tra min e max (solo per inizializzazione)
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

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
    
    // Funzione avanzata per l'animazione gradiente con movimento molto più ampio e casuale
    const animateGradient = () => {
      const animationFrame = () => {
        const now = Date.now();
        
        setGradientPosition({
          // Gradiente BLU - movimento lento e fluido
          x1: -40 + Math.sin(now / 3000) * 100 + mousePosition.x * 50,
          y1: 40 + Math.cos(now / 3000) * 100 + mousePosition.y * 50,
          
          // Gradiente VIOLA - movimento lento e fluido in direzione opposta
          x2: -40 + Math.cos(now / 3500) * 110 - mousePosition.x * 50,
          y2: -40 + Math.sin(now / 3500) * 110 - mousePosition.y * 50,
          
          // Gradiente ARANCIONE - movimento lento e fluido
          x3: 70 + Math.sin(now / 4000) * 100 + mousePosition.y * 30,
          y3: 60 + Math.cos(now / 4000) * 100 - mousePosition.x * 40,
          
          // Gradiente VERDE - movimento lento e fluido
          x4: 30 + Math.cos(now / 4500) * 110 - mousePosition.y * 40,
          y4: -50 + Math.sin(now / 4500) * 110 + mousePosition.x * 30,
          
          // Rotazioni lente e fluide
          rotation1: (now / 12000) * 360,
          rotation2: -(now / 15000) * 360,
          rotation3: (now / 18000) * 360,
          rotation4: -(now / 20000) * 360,
          
          // Dimensioni molto più grandi e con pulsazione lenta
          size1: 200 + Math.sin(now / 5000) * 50,
          size2: 220 + Math.cos(now / 5500) * 50,
          size3: 240 + Math.sin(now / 6000) * 50,
          size4: 230 + Math.cos(now / 6500) * 50
        });
        
        requestAnimationFrame(animationFrame);
      };
      
      const animationId = requestAnimationFrame(animationFrame);
      
      return () => cancelAnimationFrame(animationId);
    };

    const animation = animateGradient();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      animation();
    };
  }, [handleMouseMove, mousePosition]);

  return (
    <section className="pt-32 pb-32 md:pt-48 md:pb-40 relative overflow-hidden">
      {/* Video Background - implementazione con tag video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Video per tema scuro */}
        {theme === 'dark' && (
          <video 
            key="dark-video"
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute w-full h-full object-cover opacity-70"
            style={{ 
              filter: 'brightness(0.7) contrast(1.5)',
              pointerEvents: 'none'
            }}
          >
            <source src="https://vz-0e0772bf-9fb.b-cdn.net/e5530b4c-71c1-43d7-b166-4ee9c827afc2/play_720p.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Video per tema chiaro */}
        {theme === 'light' && (
          <video 
            key="light-video"
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute w-full h-full object-cover opacity-100"
            style={{ 
              filter: 'brightness(1) contrast(1.2)',
              pointerEvents: 'none'
            }}
          >
            <source src="https://vz-0e0772bf-9fb.b-cdn.net/75ce1227-684d-4df2-b651-0ac818788b9b/play_720p.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Overlay scuro/chiaro per far risaltare il video */}
        {theme === 'dark' && (
          <div className="absolute inset-0 bg-[#0A0A10]/30"></div>
        )}
        {theme === 'light' && (
          <div className="absolute inset-0 bg-white/5"></div>
        )}
      </div>
      
      <div className="absolute inset-0 hero-gradient dark:bg-[#0A0A10]/10 bg-white/10">
        {/* Gradient overlay con animazioni molto più visibili, rotazione e pulsazione */}
        
        {/* Gradiente VIOLA - con dimensione variabile e rotazione */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{ 
            backgroundColor: 'rgba(147, 51, 234, 0.1)', /* Viola più intenso */
            width: `${gradientPosition.size2}px`, 
            height: `${gradientPosition.size2}px`,
            right: `${gradientPosition.x2}px`, 
            top: `${gradientPosition.y2}px`,
            transition: 'none', /* Rimuoviamo la transizione per un movimento più istantaneo */
            transform: `rotate(${gradientPosition.rotation2}deg)`,
            boxShadow: '0 0 120px 40px rgba(147, 51, 234, 0.15)'
          }}
        ></div>
        
        {/* Gradiente BLU - con dimensione variabile e rotazione */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{ 
            backgroundColor: 'rgba(59, 130, 246, 0.1)', /* Blu più intenso */
            width: `${gradientPosition.size1}px`, 
            height: `${gradientPosition.size1}px`,
            left: `${gradientPosition.x1}px`, 
            top: `${gradientPosition.y1}px`,
            transition: 'none',
            transform: `rotate(${gradientPosition.rotation1}deg)`,
            boxShadow: '0 0 120px 40px rgba(59, 130, 246, 0.15)'
          }}
        ></div>
        
        {/* NUOVO Gradiente ARANCIONE */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(54, 98, 227, 0.1), rgba(91, 130, 255, 0.1))',
            width: `${gradientPosition.size3}px`, 
            height: `${gradientPosition.size3}px`,
            right: `${gradientPosition.x3}px`, 
            bottom: `${gradientPosition.y3}px`,
            transition: 'none',
            transform: `rotate(${gradientPosition.rotation3}deg)`,
            boxShadow: '0 0 120px 40px rgba(54, 98, 227, 0.15)'
          }}
        ></div>
        
        {/* NUOVO Gradiente VERDE */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
            width: `${gradientPosition.size4}px`, 
            height: `${gradientPosition.size4}px`,
            left: `${gradientPosition.x4}px`, 
            bottom: `${gradientPosition.y4}px`,
            transition: 'none',
            transform: `rotate(${gradientPosition.rotation4}deg)`,
            boxShadow: '0 0 120px 40px rgba(16, 185, 129, 0.15)'
          }}
        ></div>
        

      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-8 md:pt-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold mb-8 leading-tight relative">
            <span className="dark:bg-gradient-to-r dark:from-white dark:to-gray-300 bg-gradient-to-r from-slate-800 to-slate-600 text-transparent bg-clip-text">{t('hero.title.part1')}</span>{' '}
            <span className="bg-gradient-to-r from-[#3662e3] via-[#5b82ff] to-[#60a5fa] animate-gradient-x text-transparent bg-clip-text">{t('hero.title.part2')}</span>{' '}
            <span className="dark:bg-gradient-to-r dark:from-white dark:to-gray-300 bg-gradient-to-r from-slate-800 to-slate-600 text-transparent bg-clip-text">{t('hero.title.part3')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 dark:bg-gradient-to-r dark:from-[#E0E0E0] dark:via-white dark:to-[#BDBDBD] text-slate-700 dark:text-transparent dark:bg-clip-text">
            {t('hero.subtitle')}
          </p>
          
          
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 mb-16 mt-12">
            <a 
              href="https://dash.leader24.ai/auth/register"
              className="w-full md:w-auto"
            >
              <Button 
                size="lg" 
                className="relative overflow-hidden bg-gradient-to-r from-[#3662e3] to-[#5b82ff] text-white px-8 py-4 h-auto text-base font-medium w-full md:w-auto group shadow-md shadow-[#3662e3]/10 rounded-full"
              >
                <span className="relative z-10">Crea il tuo agente</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#5b82ff] to-[#3662e3] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-full"></span>
              </Button>
            </a>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="relative dark:border-white/30 border-slate-500/50 overflow-hidden px-8 py-4 h-auto text-base font-medium w-full md:w-auto group shadow-md dark:shadow-white/5 shadow-slate-500/10 rounded-full"
              onClick={() => scrollToElement('features')}
            >
              <span className="relative z-10 dark:bg-gradient-to-r dark:from-white dark:to-gray-300 bg-gradient-to-r from-slate-700 to-slate-900 text-transparent bg-clip-text transition-all duration-500 dark:group-hover:from-gray-300 dark:group-hover:to-white group-hover:from-slate-900 group-hover:to-slate-700">
                Scopri di Più
              </span>
              <span className="absolute inset-0 dark:border dark:border-white/30 border border-slate-500/50 rounded-full opacity-100"></span>
              <span className="absolute inset-0 dark:bg-white/10 bg-slate-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
