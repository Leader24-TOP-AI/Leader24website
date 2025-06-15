import { Separator } from '@/components/ui/separator';
import { 
  FaLinkedin,
  FaFacebook,
  FaInstagram
} from 'react-icons/fa';
import logoImageWhite from '@assets/Leader24-Logo-white.png';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const { t } = useTranslation(['common']);
  
  return (
    <footer id="contact" className="py-12 dark:bg-[#121218] bg-slate-100 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-12">
          {/* Colonna 1: Logo e info azienda */}
          <div className="flex flex-col space-y-4">
            <div className="w-fit">
              <img 
                src={logoImageWhite} 
                alt="Leader24 Logo" 
                className="h-8 filter dark:brightness-100 brightness-0"
                style={{ width: 'auto', maxWidth: '100%' }}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm dark:text-[#BBBBBB] text-slate-600">Sevedo Co. Ltd.</p>
              <p className="text-sm dark:text-[#BBBBBB] text-slate-600">{t('footer.slogan')}</p>
            </div>
            
            {/* Social media */}
            <div className="pt-2">
              <div className="flex gap-5">
                <a href="https://www.linkedin.com/company/leader24/" target="_blank" rel="noopener noreferrer" 
                   className="dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  <FaInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Colonna 2: Menu di navigazione */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-medium dark:text-white text-slate-800">{t('footer.navigation')}</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              <li>
                <a href="/" className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.home')}
                </a>
              </li>
              <li>
                <a href={t('urls.sectors', '/settori')} className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.sectors')}
                </a>
              </li>
              <li>
                <a href={t('urls.sectors', '/settori') + "/ecommerce"} className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.ecommerce')}
                </a>
              </li>
              <li>
                <a href={t('urls.caseStudies', '/casi-studio')} className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.caseStudies')}
                </a>
              </li>
              <li>
                <a href={t('urls.contacts', '/contatti')} className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.contacts')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Colonna 3: Info aggiuntive e accesso */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-base font-medium dark:text-white text-slate-800">{t('footer.infoAccess')}</h3>
            <ul className="space-y-3">
              <li>
                <a href={t('urls.privacy', '/informativa-privacy')} className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href={t('urls.cookie', '/informativa-cookie')} className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.cookie')}
                </a>
              </li>
              <li>
                <a href={t('urls.terms', '/termini-di-servizio')} className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
              <li className="pt-1">
                <a 
                  href="https://dash.leader24.it/login" 
                  className="text-sm dark:text-[#BBBBBB] text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors flex items-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 mr-1.5"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  {t('footer.login')}
                </a>
              </li>
              <li>
                <a 
                  href="https://dash.leader24.it/signup" 
                  className="text-sm font-medium text-[#FF5722] dark:hover:text-white hover:text-orange-700 transition-colors"
                >
                  {t('footer.freeTrail')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="dark:bg-white/10 bg-slate-200 mb-6" />
        
        <div className="text-center md:text-left text-sm dark:text-[#999999] text-slate-500">
          © {currentYear} Leader24 - Sevedo Co. Ltd. | {t('footer.allRightsReserved')}
        </div>
      </div>
    </footer>
  );
}
