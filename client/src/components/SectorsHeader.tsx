import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/images/Leader24-Logo-white.png';
import { industries } from '@/data/industries';
import { useTheme } from '@/components/ThemeProvider';

export default function SectorsHeader() {
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navItemClasses = theme === 'dark' 
    ? "text-[#E0E0E0] hover:text-white text-sm font-medium"
    : "text-slate-700 hover:text-slate-900 text-sm font-medium";

  return (
    <header 
      className={`py-4 fixed w-full z-50 transition-all duration-300 ${
        theme === 'dark'
          ? isScrolled 
            ? 'bg-[#0A0A10] shadow-md' 
            : 'bg-gradient-to-b from-[rgba(10,10,16,0.8)] to-[rgba(10,10,16,1)]'
          : isScrolled
            ? 'bg-white shadow-md'
            : 'bg-gradient-to-b from-[rgba(255,255,255,0.9)] to-white'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <img 
              src={logoImage}
              alt="Leader24 Logo" 
              className={`h-8 md:h-10 cursor-pointer ${theme === 'dark' ? '' : 'brightness-0 invert-0'}`}
            />
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/#features" 
            className={navItemClasses}
          >
            Funzionalità
          </Link>
          <div className="relative group">
            <Link 
              href="/#sectors" 
              className={navItemClasses}
            >
              Settori
            </Link>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#111119] ring-1 ring-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <Link href="/settori" className="block px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors">
                  Visualizza tutti i settori
                </Link>
                {industries.slice(0, 5).map((industry, index) => (
                  <a 
                    key={index}
                    href={`/settori#${industry.nameKey || industry.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {industry.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Link 
            href="/#testimonials" 
            className={navItemClasses}
          >
            Casi Studio
          </Link>
          <Link 
            href="/#contact" 
            className={navItemClasses}
          >
            Contatti
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <a 
            href="https://api.whatsapp.com/send?phone=393762493961&text=Salve,%20vorrei%20una%20dimostrazione%20su%20come%20funziona%20il%20vostro%20servizio" 
            className="hidden md:block"
          >
            <Button className="bg-[#FF5722] hover:bg-opacity-90 text-white">
              Prova Gratuita
            </Button>
          </a>
          
          <button 
            className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}