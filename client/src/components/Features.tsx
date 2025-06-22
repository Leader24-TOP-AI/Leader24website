import { features } from '@/data/features';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, 
  Layers, 
  Clock, 
  Globe, 
  CalendarDays, 
  Settings 
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function Features() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(['home']);
  
  // Gestisce il movimento del mouse
  const handleMouseMove = useCallback((event: MouseEvent) => {
    // Calcola la posizione relativa del mouse rispetto alla viewport
    const { clientX, clientY } = event;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Normalizza le coordinate (da -1 a 1)
    const normalizedX = (clientX / windowWidth) * 2 - 1;
    const normalizedY = (clientY / windowHeight) * 2 - 1;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  }, []);
  
  // Riferimento all'elemento h2 per lo scroll programmatico
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Per debug - stampa le dimensioni e posizione degli elementi
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Eseguiamo scroll programmatico se arrivano con hash in URL al montaggio
    const hash = window.location.hash;
    if (hash === '#funzionalita' || hash === '#funzionalita-anchor') {
      setTimeout(() => {
        const anchorElement = document.getElementById('funzionalita-anchor');
        if (anchorElement) {
          anchorElement.scrollIntoView({ behavior: 'smooth' });
          console.log('Eseguito scrollIntoView su funzionalita-anchor al caricamento');
        }
      }, 500);
    }
    
    // Verifichiamo elementi per debug
    setTimeout(() => {
      const element = document.getElementById('funzionalita');
      const anchorElement = document.getElementById('funzionalita-anchor');
      
      if (element) {
        const rect = element.getBoundingClientRect();
        console.log('Elemento funzionalita dimensioni e posizione:', {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          offsetTop: element.offsetTop
        });
      }
      
      if (anchorElement) {
        const rect = anchorElement.getBoundingClientRect();
        console.log('Elemento funzionalita-anchor dimensioni e posizione:', {
          top: rect.top,
          left: rect.left,
          offsetTop: anchorElement.offsetTop
        });
      }
    }, 800);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);
  
  // Map to render the correct icon based on iconName
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-6 h-6 text-[#60a5fa]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#60a5fa]" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-[#60a5fa]" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-[#60a5fa]" />;
      case 'CalendarDays':
        return <CalendarDays className="w-6 h-6 text-[#60a5fa]" />;
      case 'Settings':
        return <Settings className="w-6 h-6 text-[#60a5fa]" />;
      default:
        return <MessageSquare className="w-6 h-6 text-[#60a5fa]" />;
    }
  };

  return (
    <section id="features" className={`py-16 md:py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-[#091428] to-[#0A1A41]' : 'bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]'}`}>
      {/* Ancoraggio dedicato posizionato strategicamente per il focus con offset */}
      <div id="funzionalita-anchor" style={{ position: 'absolute', top: '-120px', left: 0, height: '1px', width: '1px', scrollMargin: '120px' }}></div>
      
      <div 
        className={`absolute w-96 h-96 ${theme === 'dark' ? 'bg-purple-900/15' : 'bg-purple-300/20'} rounded-full blur-3xl transition-all duration-300 ease-out`}
        style={{ 
          right: `${mousePosition.x * 20}px`, 
          bottom: `${mousePosition.y * 20}px`,
        }}
      ></div>
      <div 
        className={`absolute w-72 h-72 ${theme === 'dark' ? 'bg-blue-900/15' : 'bg-blue-300/20'} rounded-full blur-3xl transition-all duration-300 ease-out`}
        style={{ 
          left: `${-mousePosition.x * 20}px`, 
          top: `${-mousePosition.y * 20}px`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 ref={titleRef} id="funzionalita" className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-gray-300' : 'from-slate-800 to-slate-600'} text-transparent bg-clip-text`}>{t('features.title')}</h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'} relative inline-block`}>
            {t('features.subtitle')} <span className="bg-gradient-to-r from-[#3662e3] to-[#5b82ff] text-transparent bg-clip-text relative">Leader24</span>
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3662e3]/50 to-transparent"></span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              data-card-index={index}
              className={`relative grid-card overflow-hidden ${theme === 'dark' ? 'bg-[#121218]' : 'bg-white'} ${theme === 'dark' ? 'border-[#1E1E24]/50' : 'border-slate-200'} rounded-xl p-6 md:p-8 transition-all duration-500 hover:translate-y-[-5px] ${theme === 'dark' ? 'hover:shadow-[0_15px_30px_-15px_rgba(98,0,234,0.2)]' : 'hover:shadow-[0_15px_30px_-15px_rgba(255,87,34,0.2)]'} group`}
              onMouseMove={(e) => {
                // Calcola la posizione relativa del mouse all'interno della card
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;  // 0 - 1
                const y = (e.clientY - rect.top) / rect.height;  // 0 - 1
                
                // Normalizza da 0-1 a -1-1
                const normalizedX = (x * 2) - 1;
                const normalizedY = (y * 2) - 1;
                
                // Seleziona gli elementi di gradiente all'interno di questa card
                const purpleGradient = e.currentTarget.querySelector(`.purple-gradient-${index}`);
                const orangeGradient = e.currentTarget.querySelector(`.orange-gradient-${index}`);
                
                if (purpleGradient && orangeGradient) {
                  // Applica le trasformazioni basate sulla posizione del mouse con amplificazione
                  (purpleGradient as HTMLElement).style.right = `${-20 - normalizedX * 50}px`;
                  (purpleGradient as HTMLElement).style.bottom = `${-20 - normalizedY * 50}px`;
                  
                  (orangeGradient as HTMLElement).style.left = `${-20 + normalizedX * 50}px`;
                  (orangeGradient as HTMLElement).style.top = `${normalizedY * 50}px`;
                }
              }}
            >
              {/* Gradiente di sfondo animato visibile al passaggio del mouse */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-[#121218] to-[#121218]' : 'from-gray-50 to-white'}`}></div>
                <div 
                  className={`purple-gradient-${index} absolute w-56 h-56 ${theme === 'dark' ? 'bg-purple-500/25' : 'bg-purple-300/15'} rounded-full blur-3xl transition-all duration-300`}
                  style={{ 
                    right: `-20px`, 
                    bottom: `-20px`,
                  }}
                ></div>
                <div 
                  className={`orange-gradient-${index} absolute w-56 h-56 ${theme === 'dark' ? 'bg-[#3662e3]/15' : 'bg-[#3662e3]/10'} rounded-full blur-3xl transition-all duration-300`}
                  style={{ 
                    left: `-20px`, 
                    top: `0px`,
                  }}
                ></div>
                {/* Aggiunta di bordo luminoso e ombra interna per il tema chiaro */}
                <div className={`absolute inset-0 ${theme === 'dark' 
                  ? '' 
                  : 'border border-[#3662e3]/20 rounded-xl shadow-[inset_0_0_15px_rgba(54,98,227,0.1)]'
                }`}></div>
              </div>
              
              <CardContent className="p-0 relative z-10">
                <div className="w-12 h-12 bg-[#60a5fa]/20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#60a5fa]/30">
                  {getIconComponent(feature.iconName)}
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 transition-all duration-500 ${
                  theme === 'dark' 
                  ? 'text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300' 
                  : 'text-slate-800 group-hover:bg-gradient-to-r group-hover:from-[#3662e3] group-hover:to-[#5b82ff]'
                } group-hover:text-transparent group-hover:bg-clip-text`}>
                  {t(`features.featuresList.${index}.title`)}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' 
                  ? 'text-[#E0E0E0] group-hover:text-white' 
                  : 'text-slate-700 group-hover:text-slate-900'
                } mb-3 transition-colors duration-500`}>
                  {t(`features.featuresList.${index}.subtitle`)}
                </p>
                <p className={`text-sm ${
                  theme === 'dark' 
                  ? 'text-[#BBBBBB] group-hover:text-[#E0E0E0]' 
                  : 'text-slate-500 group-hover:text-slate-700'
                } transition-colors duration-500`}>
                  {t(`features.featuresList.${index}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 md:mt-24 max-w-3xl mx-auto text-center">
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r ${theme === 'dark' ? 'from-white to-gray-300' : 'from-slate-800 to-slate-600'} text-transparent bg-clip-text`}>{t('features.conclusion.title')}</h3>
          <p className={`text-base ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'} mb-8`}>
            {t('features.conclusion.description')}
          </p>
          
        </div>
        
        {/* Box per l'Assistente AI spostato qui dalla hero section */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className={`p-6 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border rounded-xl relative overflow-hidden group animate-float hover:shadow-xl`}>
            {/* Effetto highlight sull'angolo */}
            <div 
              className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#3662e3]/30 to-transparent rotate-12 blur-lg group-hover:scale-150 transition-transform duration-700 ease-out"
            ></div>
            
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#3662e3] via-[#5b82ff] to-[#60a5fa] animate-gradient-x text-transparent bg-clip-text">
              {t('features.aiAssistant.title')}
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-4 relative z-10`}>
              {t('features.aiAssistant.description')}
            </p>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-sm relative z-10`}>
              {t('features.aiAssistant.note')}
            </p>
            
            {/* Border shine effect */}
            <div className={`absolute inset-0 border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} rounded-xl overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-white/20' : 'via-black/10'} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-in-out`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
