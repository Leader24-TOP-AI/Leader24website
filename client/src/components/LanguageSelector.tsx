import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Globe } from 'lucide-react';
import { useLocation } from 'wouter';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// URL mappings between Italian and English
const urlMappings: Record<string, string> = {
  // Italian to English
  '/': '/en',
  '/settori': '/en/industries',
  '/settori/ecommerce': '/en/industries/ecommerce',
  '/contatti': '/en/contact-us',
  '/casi-studio': '/en/case-studies',
  '/informativa-privacy': '/en/privacy',
  '/informativa-cookie': '/en/cookie',
  '/termini-di-servizio': '/en/terms-of-service',
  // English to Italian
  '/en': '/',
  '/en/industries': '/settori',
  '/en/industries/ecommerce': '/settori/ecommerce',
  '/en/contact-us': '/contatti',
  '/en/case-studies': '/casi-studio',
  '/en/privacy': '/informativa-privacy',
  '/en/cookie': '/informativa-cookie',
  '/en/terms-of-service': '/termini-di-servizio',
};

export function LanguageSelector() {
  const { i18n, t } = useTranslation('common');
  const { theme } = useTheme();
  const [location, setLocation] = useLocation();

  const switchLanguage = (lang: string) => {
    console.log(`[LanguageSelector] Switching language from ${i18n.language} to ${lang}`);

    // Get current path
    const currentPath = location;

    // Find corresponding path in target language
    const targetPath = urlMappings[currentPath] || (lang === 'en' ? '/en' : '/');

    console.log(`[LanguageSelector] Current path: ${currentPath}, Target path: ${targetPath}`);

    // Change language
    i18n.changeLanguage(lang);

    // Save preference to localStorage
    localStorage.setItem('i18nextLng', lang);

    // Navigate to the corresponding URL
    setLocation(targetPath);

    console.log(`[LanguageSelector] Language switched to: ${lang}`);
    console.log(`[LanguageSelector] Navigated to: ${targetPath}`);
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
            {i18n.language.startsWith('it') ? 'EN' : 'IT'}
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
            i18n.language.startsWith('it') ? 'bg-slate-100 dark:bg-slate-700' : ''
          }`}
        >
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>IT</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => switchLanguage('en')}
          className={`rounded-lg px-3 py-2 flex items-center hover:bg-slate-100 dark:hover:bg-slate-700 ${
            i18n.language.startsWith('en') ? 'bg-slate-100 dark:bg-slate-700' : ''
          }`}
        >
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>EN</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}