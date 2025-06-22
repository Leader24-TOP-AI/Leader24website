import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { caseStudies } from '@/data/caseStudies';
import { Zap } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(['home']);
  return (
    <section id="testimonials" className={`py-16 md:py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-slate-100'}`}>
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#3662e3]/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex items-center justify-center mb-12">
          <Badge variant="outline" className={`inline-flex items-center px-4 py-2 bg-[#3662e3]/20 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'} rounded-full border-[#3662e3]/20`}>
            <Zap className="w-5 h-5 mr-2 text-[#3662e3]" />
            {t('testimonials.badge')}
          </Badge>
        </div>
        
        <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t('testimonials.title')}</h2>
        <p className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'} mb-12 max-w-2xl mx-auto`}>
          {t('testimonials.subtitle')}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {(t('testimonials.caseStudies', { returnObjects: true }) as any[]).map((study: any, index: number) => {
            // Manteniamo le classi di gradiente dal file originale
            const gradientClass = caseStudies[index]?.gradient || '';
            
            return (
              <div 
                key={index}
                className={`testimonial-card ${theme === 'dark' ? gradientClass : ''} ${theme === 'dark' ? 'bg-[#0c0c14]' : 'bg-white'} rounded-xl p-6 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'} shadow-sm`}
              >
                <div className="flex items-start mb-6">
                  <div className="h-10 w-auto flex items-center">
                    <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-800'} font-bold`}>{study.company}</span>
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-3 dark:text-white text-slate-800 leading-tight">
                  {study.titleStart} <span className="dark:text-white/90 text-slate-800 dark:bg-white/10 bg-slate-100 px-1 rounded">{study.titleHighlight}</span> {study.titleEnd}
                </h3>
                
                <p className="text-base dark:text-[#E0E0E0] text-slate-600 mb-6">
                  "{study.quote}"
                </p>
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3 dark:bg-white/10 bg-slate-100 dark:border-white/20 border-slate-200">
                    {/* Avatar placeholder */}
                    <div className="w-full h-full flex items-center justify-center dark:text-white text-slate-700">
                      {study.person.name.split(' ').map((n: string) => n.charAt(0)).join('')}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold dark:text-white text-slate-800">{study.person.name}</p>
                    <p className="text-sm dark:text-[#BBBBBB] text-slate-500">{study.person.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <a href={i18n.language === 'en' ? '/en/case-studies' : '/casi-studio'} onClick={() => window.scrollTo(0, 0)}>
            <Button variant="outline" className="dark:text-white/70 text-slate-700 dark:border-white/20 border-slate-300 dark:hover:bg-white/10 hover:bg-slate-200">
              {t('testimonials.viewAllCaseStudies')}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
