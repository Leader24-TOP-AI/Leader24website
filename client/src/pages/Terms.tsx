import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Separator } from '@/components/ui/separator';

export default function Terms() {
  const { t, i18n } = useTranslation(['terms', 'common']);
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
      
      <main className="flex-1 py-16 md:py-24 mt-10 relative overflow-hidden">
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
              {t('title')}
            </h1>
            
            <div className={`flex items-center mb-8 text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <div className="mr-4">
                <span className="font-semibold">{t('effective_date')}:</span> {t('date')}
              </div>
              <div>
                <span className="font-semibold">{t('last_updated')}:</span> {t('updated_date')}
              </div>
            </div>
            
            <div className={`space-y-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
            }`}>
              {Object.keys(t('sections', { returnObjects: true })).map((sectionKey) => (
                <section key={sectionKey} className="hover:bg-opacity-50 hover:bg-gray-100/10 p-4 rounded-md transition-colors">
                  <h2 className={`text-xl font-semibold mb-3 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {t(`sections.${sectionKey}.title`)}
                  </h2>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                    {t(`sections.${sectionKey}.content`)}
                  </p>
                  {Object.keys(t('sections', { returnObjects: true })).indexOf(sectionKey) < Object.keys(t('sections', { returnObjects: true })).length - 1 && 
                    <div className={`mt-4 h-px ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}></div>
                  }
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}