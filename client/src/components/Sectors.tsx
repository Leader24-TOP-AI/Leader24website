import { useState, useRef, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { industries } from '@/data/industries';
import * as LucideIcons from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'wouter';

export default function Sectors() {
  const { t, i18n } = useTranslation(['sectors']);
  const [isMobile, setIsMobile] = useState(false);
  const { theme } = useTheme();
  const lang = i18n.language.startsWith('en') ? 'en' : 'it';
  
  // Usa le industrie dal nostro array con traduzione dinamica dei nomi
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  
  // Funzione per ottenere il nome tradotto dell'industria
  const getTranslatedIndustryName = (industry: any) => {
    return industry.nameKey ? t(`industryNames.${industry.nameKey}`) : industry.name;
  };

  // Funzione per ottenere la descrizione tradotta dell'industria
  const getTranslatedIndustryDescription = (industry: any) => {
    const index = industries.findIndex(ind => ind.nameKey === industry.nameKey);
    return index !== -1 ? t(`industries.${index}.description`) : industry.description;
  };

  // Funzione per ottenere i benefits tradotti dell'industria
  const getTranslatedIndustryBenefits = (industry: any): string[] => {
    const index = industries.findIndex(ind => ind.nameKey === industry.nameKey);
    if (index === -1) return industry.benefits;

    return industry.benefits.map((_: any, benefitIndex: number) =>
      t(`industries.${index}.benefits.${benefitIndex}`)
    );
  };

  // Funzione per ottenere un ID URL-friendly dall'industria tradotta
  const getTranslatedIndustrySlug = (industry: any) => {
    const translatedName = getTranslatedIndustryName(industry);
    return translatedName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  };
  const detailsRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);
  
  // Controlla se la visualizzazione è mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Controlla all'inizio
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Gestisce lo scroll iniziale quando la sezione è caricata
  useEffect(() => {
    // Verifica la presenza di un hash in URL per lo scroll iniziale
    if (isInitialRender.current) {
      const hash = window.location.hash;
      if (hash === '#sectors' || hash === '#sectors-anchor') {
        setTimeout(() => {
          const anchorElement = document.getElementById('sectors-anchor');
          if (anchorElement) {
            anchorElement.scrollIntoView({ behavior: 'smooth' });
            console.log('Eseguito scrollIntoView su sectors-anchor al caricamento');
          }
        }, 500);
      }
      isInitialRender.current = false;
    }
    
    // Debug - visualizza le posizioni degli elementi
    setTimeout(() => {
      const element = document.getElementById('sectors');
      const anchorElement = document.getElementById('sectors-anchor');
      
      if (element) {
        const rect = element.getBoundingClientRect();
        console.log('Elemento sectors dimensioni e posizione:', {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
      
      if (anchorElement) {
        const rect = anchorElement.getBoundingClientRect();
        console.log('Elemento sectors-anchor dimensioni e posizione:', {
          top: rect.top,
          left: rect.left,
        });
      }
    }, 800);
  }, []);
  
  // Gestisce il cambio di settore selezionato
  const handleIndustryClick = (industry: typeof industries[0]) => {
    setSelectedIndustry(industry);

    // Aggiorna l'URL hash con lo slug tradotto
    const translatedSlug = getTranslatedIndustrySlug(industry);
    window.history.replaceState(null, '', `#${translatedSlug}`);

    // Scroll to details section su mobile dopo una breve pausa per l'animazione
    if (isMobile && detailsRef.current) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  // Funzione per ottenere l'icona Lucide corrispondente
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.split('-').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')] || LucideIcons.Briefcase;
    
    return <IconComponent className="w-6 h-6" />;
  };
  
  // Funzione per convertire le stringhe in PascalCase per le icone Lucide
  const formatIconName = (name: string) => {
    return name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
  };

  return (
    <section id="sectors" className={`py-16 md:py-24 relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-[#0A0A10] to-[#1A1A2E]' 
        : 'bg-gradient-to-br from-gray-100 to-white'
    }`}>
      {/* Ancoraggio dedicato posizionato strategicamente per il focus con offset */}
      <div id="sectors-anchor" style={{ position: 'absolute', top: '-120px', left: 0, height: '1px', width: '1px', scrollMargin: '120px' }}></div>
      {/* Gradienti di sfondo animati */}
      <div className={`absolute right-0 bottom-0 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${
        theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-400/10'
      }`}></div>
      <div className={`absolute left-0 top-0 w-72 h-72 rounded-full blur-3xl animate-pulse-slow ${
        theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-400/10'
      }`}></div>
      <div className={`absolute left-1/3 bottom-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse-slow ${
        theme === 'dark' ? 'bg-[#60a5fa]/10' : 'bg-[#60a5fa]/5'
      }`}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="outline" className={`mb-4 text-[#3662e3] ${
            theme === 'dark' ? 'border-[#3662e3]/20' : 'border-[#3662e3]/30'
          } px-4 py-1`}>
            {t('badge')}
          </Badge>
          <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text'
              : 'text-slate-800'
          }`}>
            {t('title')}
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'
          } mb-8 max-w-3xl mx-auto`}>
            {t('subtitle')}
          </p>
        </div>
        
        {/* Card grid per la selezione del settore */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 mb-12">
          {industries.map((industry, index) => {
            // Cerco di convertire il nome dell'icona al formato di Lucide
            const IconComponent = (LucideIcons as any)[formatIconName(industry.icon)] || LucideIcons.Briefcase;

            // Per E-commerce, usa un vero link HTML per SEO
            const isEcommerce = industry.nameKey === 'ecommerce';
            const ecommerceUrl = lang === 'en' ? '/en/industries/ecommerce' : '/settori/ecommerce';

            const cardContent = (
              <Card
                key={index}
                className={`
                  cursor-pointer transition-all backdrop-blur-sm
                  ${theme === 'dark'
                    ? 'border border-white/5 hover:bg-white/10'
                    : 'border border-slate-200 hover:bg-slate-50'
                  }
                  ${selectedIndustry.nameKey === industry.nameKey
                    ? `ring-2 ring-[#3662e3] ${theme === 'dark' ? 'bg-white/10' : 'bg-blue-50/50'}`
                    : theme === 'dark' ? 'bg-white/5' : 'bg-white'
                  }
                `}
                onClick={isEcommerce ? undefined : () => handleIndustryClick(industry)}
              >
                <CardContent className="p-3 md:p-4 text-center">
                  <div className={`
                    mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2 md:mb-3
                    ${selectedIndustry.nameKey === industry.nameKey
                      ? 'bg-[#3662e3]/20 text-[#3662e3]'
                      : theme === 'dark'
                        ? 'bg-white/10 text-white/70'
                        : 'bg-slate-100 text-slate-600'
                    }
                  `}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className={`text-sm font-medium leading-tight ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>{getTranslatedIndustryName(industry)}</h3>

                  {/* Indicatore di scorrimento visibile solo su mobile */}
                  {isMobile && (
                    <div className="mt-2 text-xs text-[#3662e3] flex items-center justify-center">
                      <span>{t('details')}</span>
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );

            // Wrap con Link se è e-commerce
            return isEcommerce ? (
              <Link key={index} href={ecommerceUrl}>
                {cardContent}
              </Link>
            ) : cardContent;
          })}
        </div>
        
        {/* Dettaglio del settore selezionato */}
        <div
          ref={detailsRef}
          id={getTranslatedIndustrySlug(selectedIndustry)}
          className={`rounded-xl p-6 md:p-8 backdrop-blur-md ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-white/5 to-white/10 border border-white/10'
              : 'bg-white border border-slate-200 shadow-sm'
          }`}
        >
          {/* Indicatore per mobile che mostra il settore corrente */}
          {isMobile && (
            <div className={`rounded-md p-3 mb-6 flex items-center ${
              theme === 'dark' 
                ? 'bg-[#3662e3]/10 text-white' 
                : 'bg-blue-50 text-slate-800'
            }`}>
              <div className="w-8 h-8 rounded-full bg-[#3662e3]/20 flex items-center justify-center text-[#3662e3] mr-3">
                {getIcon(selectedIndustry.icon)}
              </div>
              <div>
                <div className={`text-sm ${theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-500'}`}>
                  {t('selectedSector')}
                </div>
                <div className="font-semibold">{getTranslatedIndustryName(selectedIndustry)}</div>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#3662e3]/20 flex items-center justify-center text-[#3662e3]">
                  {getIcon(selectedIndustry.icon)}
                </div>
                <h3 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>{getTranslatedIndustryName(selectedIndustry)}</h3>
              </div>
              
              <p className={`mb-6 text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
              }`}>{getTranslatedIndustryDescription(selectedIndustry)}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-[#3662e3]/10 text-[#3662e3] border-[#3662e3]/20">
                  {t('commonTags.automation')}
                </Badge>
                <Badge variant="outline" className={`${
                  theme === 'dark'
                    ? 'bg-white/5 text-white/70 border-white/10'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {t('commonTags.twentyFourSeven')}
                </Badge>
                <Badge variant="outline" className={`${
                  theme === 'dark'
                    ? 'bg-white/5 text-white/70 border-white/10'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {t('commonTags.customerSupport')}
                </Badge>
                <Badge variant="outline" className={`${
                  theme === 'dark'
                    ? 'bg-white/5 text-white/70 border-white/10'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {t('commonTags.artificialIntelligence')}
                </Badge>
              </div>
              
              <a 
                href={i18n.language === 'en' ? '/en/contact-us' : '/contatti'} 
                onClick={() => window.scrollTo(0, 0)}
              >
                <Button className="bg-[#3662e3] hover:bg-[#3662e3] hover:opacity-90 text-white px-6">
                  {t('discoverMore')}
                </Button>
              </a>
            </div>
            
            <div className={`rounded-xl p-5 ${
              theme === 'dark'
                ? 'bg-[#0A0A15] border border-white/5'
                : 'bg-slate-50 border border-slate-200'
            }`}>
              <h4 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                <LucideIcons.CheckCircle className="h-5 w-5 text-[#60a5fa]" />
                {t('advantages')}
              </h4>
              
              <ul className="space-y-3">
                {getTranslatedIndustryBenefits(selectedIndustry).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 text-[#60a5fa]">
                      <LucideIcons.Check className="h-4 w-4" />
                    </span>
                    <span className={`${
                      theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                    }`}>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className={`mt-6 p-4 rounded-lg ${
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10'
                  : 'bg-white border border-slate-200'
              }`}>
                <p className={`text-sm italic ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  "{t('testimonial.quote')}"
                </p>
                <p className={`text-xs mt-2 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                }`}>— {t('testimonial.client')} {getTranslatedIndustryName(selectedIndustry)}</p>
              </div>
            </div>
          </div>
          
          {/* Pulsante per tornare alla griglia (solo mobile) */}
          {isMobile && (
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                size="sm"
                className="text-[#3662e3] border-[#3662e3]/20 hover:bg-[#3662e3]/10"
                onClick={() => {
                  const sectorsGrid = document.querySelector('#sectors');
                  sectorsGrid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                <LucideIcons.ArrowUp className="w-4 h-4 mr-2" />
                {t('backToSectors')}
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className={`mb-6 ${
            theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
          }`}>
            {t('notFound')}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href={i18n.language === 'en' ? '/en/industries' : '/settori'} onClick={() => window.scrollTo(0, 0)}>
              <Button className="bg-[#3662e3] text-white hover:bg-[#3662e3] hover:opacity-90 w-full md:w-auto">
                {t('viewAllSectors')}
              </Button>
            </a>
            <a href={i18n.language === 'en' ? '/en/contact-us' : '/contatti'} onClick={() => window.scrollTo(0, 0)}>
              <Button variant="outline" className="border-[#3662e3] text-[#3662e3] hover:bg-[#3662e3]/10 w-full md:w-auto">
                {t('requestCustomDemo')}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
