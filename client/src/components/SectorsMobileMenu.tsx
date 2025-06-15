import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function SectorsMobileMenu() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-center items-center ${
      theme === 'dark' 
        ? 'bg-[#0A0A10] bg-opacity-95' 
        : 'bg-white bg-opacity-98'
    }`}>
      <button 
        className={`absolute top-6 right-6 ${
          theme === 'dark' ? 'text-white' : 'text-slate-800'
        }`}
        onClick={handleClose}
        aria-label="Close menu"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="flex flex-col space-y-6 text-center">
        <Link 
          href="/#features" 
          className={`text-xl font-medium ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}
          onClick={handleClose}
        >
          Funzionalità
        </Link>
        <div className="flex flex-col space-y-3">
          <Link 
            href="/#sectors" 
            className={`text-xl font-medium ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}
            onClick={handleClose}
          >
            Settori
          </Link>
          <Link 
            href="/settori" 
            className="text-base font-medium text-[#FF5722]"
            onClick={handleClose}
          >
            Visualizza tutti i settori →
          </Link>
        </div>
        <Link 
          href="/#testimonials" 
          className={`text-xl font-medium ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}
          onClick={handleClose}
        >
          Casi Studio
        </Link>
        <Link 
          href="/#contact" 
          className={`text-xl font-medium ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}
          onClick={handleClose}
        >
          Contatti
        </Link>
        
        <a 
          href="https://api.whatsapp.com/send?phone=393762493961&text=Salve,%20vorrei%20una%20dimostrazione%20su%20come%20funziona%20il%20vostro%20servizio" 
          className="mt-8 px-6 py-3 bg-[#FF5722] text-white rounded-md text-lg font-medium"
        >
          Prova Gratuita
        </a>
      </div>
    </div>
  );
}