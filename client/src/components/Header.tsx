import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { scrollToElement } from '@/lib/utils';
import logoImageWhite from '@/assets/images/Leader24-Logo-white.png';
import { industries } from '@/data/industries';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Dispatch custom event for MobileMenu component to listen to
    window.dispatchEvent(new CustomEvent('toggleMobileMenu', { 
      detail: { isOpen: !isMobileMenuOpen } 
    }));
  };

  const navItemClasses = "text-[color:var(--nav-text)] hover:text-[color:var(--nav-text-hover)] transition-colors duration-200 text-sm font-medium";

  return (
    <header 
      className={`py-4 fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[color:var(--header-bg-scrolled)] shadow-md border-b border-[color:var(--header-border)]' 
          : 'bg-[color:var(--header-bg)]'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={window.location.pathname.includes('/en') ? '/en/' : '/'} onClick={(e) => {
            // Se siamo già in homepage, scrolliamo all'inizio della pagina
            if (window.location.pathname === '/' || window.location.pathname === '/en' || window.location.pathname === '/en/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              console.log('Header: click sul logo - scrollato in cima');
            }
          }}>
            <img 
              src={logoImageWhite} 
              alt="Leader24 Logo" 
              className={`h-8 md:h-10 cursor-pointer transition-all duration-300 ${
                theme === 'light' ? 'brightness-0' : ''
              }`}
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href={window.location.pathname.includes('/en') ? '/en/#funzionalita-anchor' : '/#funzionalita-anchor'}
            className={navItemClasses}
            onClick={(e) => {
              // Solo se siamo già in homepage, preveniamo il comportamento predefinito
              if (window.location.pathname === '/' || window.location.pathname === '/en' || window.location.pathname === '/en/') {
                e.preventDefault();
                
                // Usa l'elemento ancora dedicato per lo scroll
                const element = document.getElementById('funzionalita-anchor');
                
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  console.log('Header: scroll a funzionalita-anchor');
                } else {
                  console.log("Header: elemento 'funzionalita-anchor' non trovato");
                }
              }
            }}
          >
            {t('header.features', 'Funzionalità')}
          </a>
          <Link
            href={t('urls.sectors', '/settori')}
            className={navItemClasses}
          >
            {t('header.sectors')}
          </Link>
          <Link
            href="/settori/ecommerce"
            className={navItemClasses}
          >
            E-commerce
          </Link>
          <Link href={t('urls.caseStudies', '/casi-studio')} className={navItemClasses}>
            {t('header.caseStudies')}
          </Link>
          <Link href={t('urls.contacts', '/contatti')} className={navItemClasses} onClick={() => window.scrollTo(0, 0)}>
            {t('header.contacts')}
          </Link>
        </div>
        
        <div className="flex items-center gap-3 md:gap-3">
          {/* Language Selector - Desktop */}
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          
          {/* Theme Toggle - Desktop */}
          <div className="hidden md:block">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="bg-transparent rounded-full p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/20 transition-colors"
              aria-label={theme === 'dark' ? t('theme.light', 'Chiaro') : t('theme.dark', 'Scuro')}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
          
          {/* Login Button - Desktop */}
          <a 
            href="https://dash.leader24.ai" 
            className="hidden md:flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
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
            <span className="font-medium">{t('header.login', 'Accedi')}</span>
          </a>
          
          {/* Free Trial Button - Desktop */}
          <a 
            href="https://dash.leader24.it/signup" 
            className="hidden md:block"
          >
            <Button 
              size="lg"
              className="bg-[#3662e3] hover:bg-[#2952d3] px-6 py-2 h-auto rounded-full text-white font-medium"
            >
              {t('header.trial', 'Prova Gratis')}
            </Button>
          </a>
          
          <div className="md:hidden">
            {/* Mobile Menu Toggle */}
            <button 
              className="bg-transparent rounded-full p-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/20" 
              onClick={handleMobileMenuToggle}
              aria-label="Toggle mobile menu"
              style={{ touchAction: 'manipulation' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
