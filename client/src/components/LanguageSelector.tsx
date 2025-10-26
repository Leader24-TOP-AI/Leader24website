import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSelector() {
  const { i18n, t } = useTranslation('common');
  const { theme } = useTheme();
  
  // Mappa diretta italiano -> inglese per le pagine più comuni
  const pathMappingItalianToEnglish: Record<string, string> = {
    '/': '/en/',
    '/contatti': '/en/contact-us',
    '/casi-studio': '/en/case-studies',
    '/settori': '/en/industries',
    '/settori/ecommerce': '/en/industries/ecommerce',
    '/informativa-privacy': '/en/privacy',
    '/informativa-cookie': '/en/cookie',
    '/termini-di-servizio': '/en/terms-of-service'
  };
  
  // Mappa diretta inglese -> italiano per le pagine più comuni
  const pathMappingEnglishToItalian: Record<string, string> = {
    '/en/': '/',
    '/en': '/',
    '/en/contact-us': '/contatti',
    '/en/case-studies': '/casi-studio',
    '/en/industries': '/settori',
    '/en/industries/ecommerce': '/settori/ecommerce',
    '/en/privacy': '/informativa-privacy',
    '/en/cookie': '/informativa-cookie',
    '/en/terms-of-service': '/termini-di-servizio'
  };
  
  const switchLanguage = (lang: string) => {
    // Imposta la lingua subito
    i18n.changeLanguage(lang);
    
    // Ottieni il percorso corrente
    const currentPath = window.location.pathname;
    
    // Semplifica la gestione delle traduzioni utilizzando solo la mappa diretta
    let redirectPath;
    
    if (lang === 'it') {
      // Stiamo passando all'italiano
      redirectPath = pathMappingEnglishToItalian[currentPath];
      
      // Se non troviamo una traduzione diretta, torniamo alla home italiana
      if (!redirectPath) {
        redirectPath = '/';
      }
    } else {
      // Stiamo passando all'inglese
      redirectPath = pathMappingItalianToEnglish[currentPath];
      
      // Se non troviamo una traduzione diretta, creiamo un percorso inglese di base
      if (!redirectPath) {
        if (currentPath === '/' || currentPath === '') {
          redirectPath = '/en/';
        } else {
          // Rimuovi lo slash iniziale
          const pathSegment = currentPath.startsWith('/') ? currentPath.substring(1) : currentPath;
          redirectPath = `/en/${pathSegment}`;
        }
      }
    }
    
    // Reindirizza alla nuova URL
    setTimeout(() => {
      window.location.href = redirectPath;
    }, 10);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="bg-transparent rounded-full px-3 py-1.5 h-auto flex items-center gap-2 hover:bg-slate-100/50 dark:hover:bg-slate-800/20"
        >
          <span className="text-slate-700 dark:text-slate-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="font-medium text-slate-700 dark:text-slate-200">
            {i18n.language === 'it' ? 'EN' : 'IT'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="rounded-xl p-2 min-w-[120px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
      >
        <DropdownMenuItem 
          onSelect={() => switchLanguage('it')}
          className={`rounded-lg px-3 py-2 mb-1 flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 ${
            i18n.language === 'it' ? 'bg-slate-100 dark:bg-slate-700' : ''
          }`}
        >
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>IT</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onSelect={() => switchLanguage('en')}
          className={`rounded-lg px-3 py-2 flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 ${
            i18n.language === 'en' ? 'bg-slate-100 dark:bg-slate-700' : ''
          }`}
        >
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>EN</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}