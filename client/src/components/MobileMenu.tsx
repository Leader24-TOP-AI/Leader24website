import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { X, Moon, Sun } from 'lucide-react';
import { scrollToElement } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/components/ThemeProvider';
import { LanguageSelector } from '@/components/LanguageSelector';
import logoImageWhite from '@/assets/images/Leader24-Logo-white.png';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleToggleEvent = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen);
      if (e.detail.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('toggleMobileMenu', handleToggleEvent as EventListener);

    return () => {
      window.removeEventListener('toggleMobileMenu', handleToggleEvent as EventListener);
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('toggleMobileMenu', { 
      detail: { isOpen: false } 
    }));
  };

  const handleNavClick = (sectionId: string) => {
    handleClose();
    setTimeout(() => {
      scrollToElement(sectionId);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[color:var(--background)] bg-opacity-95 z-50 flex flex-col justify-center items-center">
      <button 
        className="absolute top-6 right-6 text-[color:var(--foreground)]"
        onClick={handleClose}
        aria-label="Close menu"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Logo in alto */}
      <div className="absolute top-6 left-6">
        <Link 
          href={'/'} 
          onClick={handleClose}
          aria-label="Home"
        >
          <img 
            src={logoImageWhite} 
            alt="Leader24 Logo" 
            className={`h-8 cursor-pointer transition-all duration-300 ${
              theme === 'light' ? 'brightness-0' : ''
            }`}
          />
        </Link>
      </div>
      

      
      <div className="flex flex-col space-y-6 text-center">
        <a 
          href={'/#funzionalita-anchor'}
          className="text-xl font-medium text-[color:var(--foreground)]"
          onClick={(e) => {
            // Solo se siamo già in homepage, preveniamo il comportamento predefinito
            if (window.location.pathname === '/' || window.location.pathname === '/') {
              e.preventDefault();
              
              // Chiudi prima il menu
              handleClose();
              
              // Aspetta la chiusura del menu e poi scorri
              setTimeout(() => {
                // Usa l'elemento ancora dedicato per lo scroll
                const element = document.getElementById('funzionalita-anchor');
                
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  console.log('MobileMenu: scroll a funzionalita-anchor');
                } else {
                  console.log("MobileMenu: elemento 'funzionalita-anchor' non trovato");
                }
              }, 400); // Delay aumentato per dare tempo alla chiusura del menu
            } else {
              handleClose();
            }
          }}
        >
          {t('header.features', 'Funzionalità')}
        </a>
        <Link 
          href={t('urls.sectors', '/settori')} 
          className="text-xl font-medium text-[color:var(--foreground)]"
          onClick={handleClose}
        >
          {t('header.sectors', 'Settori')}
        </Link>
        <Link 
          href={t('urls.caseStudies', '/casi-studio')} 
          className="text-xl font-medium text-[color:var(--foreground)]"
          onClick={handleClose}
        >
          {t('header.caseStudies', 'Casi Studio')}
        </Link>
        <Link 
          href={t('urls.contacts', '/contatti')} 
          className="text-xl font-medium text-[color:var(--foreground)]"
          onClick={() => {
            handleClose();
            // Assicuriamo che la pagina contatti si apra dall'inizio
            setTimeout(() => window.scrollTo(0, 0), 100);
          }}
        >
          {t('header.contacts', 'Contatti')}
        </Link>
        

        
        <div className="flex flex-col space-y-4">
          <a 
            href="https://dash.leader24.ai" 
            className="px-6 py-2 border border-[color:var(--border-color)] text-[color:var(--foreground)] rounded-full text-lg font-medium hover:bg-[color:var(--hover-overlay)] transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              {t('header.login', 'Accedi')}
            </span>
          </a>
          <a
            href="https://dash.leader24.ai/"
            className="px-6 py-3 bg-[color:var(--btn-primary-bg)] text-[color:var(--btn-primary-text)] rounded-full text-lg font-medium hover:bg-[color:var(--btn-primary-bg)] hover:opacity-90 transition-colors"
          >
            {t('header.trial', 'Prova Gratis')}
          </a>
          
          {/* Theme and Language Controls */}
          <div className="flex items-center justify-center space-x-6 mt-6 pt-2">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center justify-center p-2 rounded-full bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/20"
              aria-label={theme === 'dark' ? t('theme.light', 'Chiaro') : t('theme.dark', 'Scuro')}
            >
              {theme === 'dark' ? (
                <Sun className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Moon className="h-6 w-6" strokeWidth={2} />
              )}
            </button>
            
            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </div>
  );
}
