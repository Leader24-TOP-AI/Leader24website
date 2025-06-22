import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function CTABanner() {
  const { theme } = useTheme();
  const { t } = useTranslation(['home']);

  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${
      theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'
    }`}>
      <div className={`absolute top-0 left-0 w-full h-full opacity-50 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-purple-500/10 via-red-500/10 to-blue-500/10' 
          : 'bg-gradient-to-b from-purple-400/5 via-blue-400/5 to-blue-400/5'
      }`}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`} dangerouslySetInnerHTML={{ __html: t('cta.title') }}>
          </h2>
          
          <p className={`text-lg mb-2 ${
            theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'
          }`}>{t('cta.subtitle')}</p>
          <p className={`text-lg mb-8 ${
            theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'
          }`} dangerouslySetInnerHTML={{ __html: t('cta.description') }}>
          </p>
          
          <a href="https://dash.leader24.ai/auth/register">
            <Button size="default" className="bg-[#3662e3] hover:bg-[#3662e3] hover:opacity-90 text-white px-6 py-2.5 h-auto text-base">
              {t('cta.button')}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
