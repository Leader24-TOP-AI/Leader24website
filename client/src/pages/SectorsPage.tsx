import { useMemo, useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { industries, Industry } from '@/data/industries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import SEO from '@/components/SEO';
import { Zap, ArrowRight, Check } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { getMetadata, getIndustryMetadata } from '@/lib/metadata';

export default function SectorsPage() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(['sectors']);
  const lang = useMemo(() => {
    const newLang = i18n.language.startsWith('en') ? 'en' : 'it';
    console.log('[SectorsPage] Lang recalculated:', {
      'i18n.language': i18n.language,
      'newLang': newLang
    });
    return newLang;
  }, [i18n.language]);
  
  // Funzione per trovare l'industria dall'hash URL
  const findIndustryFromHash = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash) {
        // Cerca l'industria il cui slug tradotto corrisponde all'hash
        const industry = industries.find(ind => {
          const translatedName = ind.nameKey ? t(`industryNames.${ind.nameKey}`) : ind.name;
          const slug = translatedName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
          return slug === hash || ind.nameKey === hash; // Supporta sia slug tradotti che nameKey in inglese per retrocompatibilità
        });

        if (industry) {
          return industry;
        }
      }
    }
    return industries[0];
  };
  
  const [selectedIndustry, setSelectedIndustry] = useState(findIndustryFromHash());

  // Dynamic metadata based on selected industry or generic sectors page
  const metadata = useMemo(() => {
    const hasHash = typeof window !== 'undefined' && window.location.hash;
    const meta = hasHash && selectedIndustry?.nameKey
      ? getIndustryMetadata(selectedIndustry.nameKey, lang)
      : getMetadata('sectors', lang);
    console.log('[SectorsPage] Metadata recalculated:', {
      lang,
      title: meta.title
    });
    return meta;
  }, [selectedIndustry, lang]);

  // Funzione per ottenere il nome tradotto del settore
  const getTranslatedIndustryName = (industry: any) => {
    return industry.nameKey ? t(`industryNames.${industry.nameKey}`) : industry.name;
  };

  // Funzione per ottenere un ID URL-friendly dall'industria tradotta
  const getTranslatedIndustrySlug = (industry: any) => {
    const translatedName = getTranslatedIndustryName(industry);
    return translatedName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  };
  
  // Get translated industry data
  const translatedIndustries = t('industries', { returnObjects: true }) as any[];
  const getTranslatedIndustry = (industry: Industry) => {
    const industryIndex = industries.findIndex(ind => ind === industry);
    return translatedIndustries[industryIndex] || industry;
  };
  const [gradientPosition, setGradientPosition] = useState({
    x1: -40, 
    y1: 40,
    x2: -40, 
    y2: -40,
    x3: 70,  // Gradiente arancione
    y3: 60,
    x4: 30,  // Gradiente verde
    y4: -50,
    rotation1: 0,
    rotation2: 0,
    rotation3: 0,
    rotation4: 0,
    size1: 200,
    size2: 180,
    size3: 230,
    size4: 190
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Funzione per ottenere l'icona Lucide corrispondente
  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.split('-').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')] || LucideIcons.Briefcase;
    
    return <IconComponent className="w-6 h-6" />;
  };
  
  // Gestisce il movimento del mouse per aggiornare la posizione del gradiente
  const handleMouseMove = useCallback((event: MouseEvent) => {
    // Calcola la posizione relativa del mouse rispetto alla viewport
    const { clientX, clientY } = event;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Normalizza le coordinate del mouse (da -1 a 1)
    const normalizedX = (clientX / windowWidth) * 2 - 1;
    const normalizedY = (clientY / windowHeight) * 2 - 1;
    
    setMousePosition({ x: normalizedX, y: normalizedY });
  }, []);

  // Aggiunge un effetto per gestire i cambiamenti dell'hash nell'URL
  useEffect(() => {
    const handleHashChange = () => {
      setSelectedIndustry(findIndustryFromHash());
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  useEffect(() => {
    // Aggiungi event listener per il movimento del mouse
    window.addEventListener('mousemove', handleMouseMove);
    
    // Funzione avanzata per l'animazione gradiente con movimento molto più ampio e casuale
    const animateGradient = () => {
      const animationFrame = () => {
        const now = Date.now();
        
        setGradientPosition({
          // Gradiente BLU - movimento lento e fluido
          x1: -40 + Math.sin(now / 3000) * 100 + mousePosition.x * 50,
          y1: 40 + Math.cos(now / 3000) * 100 + mousePosition.y * 50,
          
          // Gradiente VIOLA - movimento lento e fluido in direzione opposta
          x2: -40 + Math.cos(now / 3500) * 110 - mousePosition.x * 50,
          y2: -40 + Math.sin(now / 3500) * 110 - mousePosition.y * 50,
          
          // Gradiente ARANCIONE - movimento lento e fluido
          x3: 70 + Math.sin(now / 4000) * 100 + mousePosition.y * 30,
          y3: 60 + Math.cos(now / 4000) * 100 - mousePosition.x * 40,
          
          // Gradiente VERDE - movimento lento e fluido
          x4: 30 + Math.cos(now / 3200) * 90 - mousePosition.y * 40,
          y4: -50 + Math.sin(now / 3200) * 90 + mousePosition.x * 30,
          
          // Rotazioni lente nel tempo
          rotation1: (Math.sin(now / 10000) * 10),
          rotation2: (Math.cos(now / 12000) * 15),
          rotation3: (Math.sin(now / 9000) * 12),
          rotation4: (Math.cos(now / 11000) * 8),
          
          // Pulsazione lenta delle dimensioni
          size1: 200 + Math.sin(now / 6000) * 30,
          size2: 180 + Math.cos(now / 7000) * 40,
          size3: 230 + Math.sin(now / 5000) * 35,
          size4: 190 + Math.cos(now / 8000) * 30
        });
        
        requestAnimationFrame(animationFrame);
      };
      
      return requestAnimationFrame(animationFrame);
    };
    
    const animationId = animateGradient();
    
    // Cleanup della funzione e dell'event listener
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition, handleMouseMove]);

  return (
    <>
      <SEO key={lang} metadata={metadata} lang={lang} />
      <div className={`min-h-screen font-sans overflow-x-hidden ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
        <Header />
      <MobileMenu />
      
      <section className={`py-16 md:py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
        <div className={`absolute inset-0 hero-gradient ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
          {/* Gradient overlay con animazioni molto più visibili, rotazione e pulsazione */}
          
          {/* Gradiente VIOLA - con dimensione variabile e rotazione */}
          <div 
            className="absolute rounded-full blur-3xl"
            style={{ 
              backgroundColor: 'rgba(147, 51, 234, 0.7)', /* Viola più intenso */
              width: `${gradientPosition.size2}px`, 
              height: `${gradientPosition.size2}px`,
              right: `${gradientPosition.x2}px`, 
              top: `${gradientPosition.y2}px`,
              transition: 'none', /* Rimuoviamo la transizione per un movimento più istantaneo */
              transform: `rotate(${gradientPosition.rotation2}deg)`,
              boxShadow: '0 0 180px 80px rgba(147, 51, 234, 0.45)',
              mixBlendMode: 'screen'
            }}
          ></div>
          
          {/* Gradiente BLU - con dimensione variabile e rotazione */}
          <div 
            className="absolute rounded-full blur-3xl"
            style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.7)', /* Blu più intenso */
              width: `${gradientPosition.size1}px`, 
              height: `${gradientPosition.size1}px`,
              left: `${gradientPosition.x1}px`, 
              top: `${gradientPosition.y1}px`,
              transition: 'none',
              transform: `rotate(${gradientPosition.rotation1}deg)`,
              boxShadow: '0 0 180px 80px rgba(59, 130, 246, 0.45)',
              mixBlendMode: 'screen'
            }}
          ></div>
          
          {/* Gradiente ARANCIONE - con dimensione variabile e rotazione */}
          <div 
            className="absolute rounded-full blur-3xl"
            style={{ 
              backgroundColor: 'rgba(54, 98, 227, 0.7)', /* Blu più intenso */
              width: `${gradientPosition.size3}px`, 
              height: `${gradientPosition.size3}px`,
              left: `${gradientPosition.x3}%`, 
              bottom: `${gradientPosition.y3}px`,
              transition: 'none',
              transform: `rotate(${gradientPosition.rotation3}deg)`,
              boxShadow: '0 0 200px 100px rgba(54, 98, 227, 0.45)',
              mixBlendMode: 'screen'
            }}
          ></div>
          
          {/* Gradiente VERDE - con dimensione variabile e rotazione */}
          <div 
            className="absolute rounded-full blur-3xl"
            style={{ 
              backgroundColor: 'rgba(29, 233, 182, 0.6)', /* Verde acqua più intenso */
              width: `${gradientPosition.size4}px`, 
              height: `${gradientPosition.size4}px`,
              right: `${gradientPosition.x4}%`, 
              bottom: `${gradientPosition.y4}px`,
              transition: 'none',
              transform: `rotate(${gradientPosition.rotation4}deg)`,
              boxShadow: '0 0 180px 80px rgba(29, 233, 182, 0.4)',
              mixBlendMode: 'screen'
            }}
          ></div>
        </div>
        
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#3662e3]/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center justify-center mb-12">
            <Badge variant="outline" className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${
              theme === 'dark' 
                ? 'bg-[#3662e3]/20 text-white border-[#3662e3]/20' 
                : 'bg-[#3662e3]/10 text-[#3662e3] border-[#3662e3]/20'
            }`}>
              <Zap className="w-5 h-5 mr-2 text-[#3662e3]" />
              {t('badge')}
            </Badge>
          </div>
          
          <h1 className={`text-3xl md:text-5xl font-bold mb-6 text-center ${
            theme === 'dark' 
              ? 'text-white' 
              : 'text-slate-800'
          }`}>
            {t('title')}<br />{t('title2')}
          </h1>
          
          <p className={`text-lg text-center mb-12 max-w-3xl mx-auto ${
            theme === 'dark' 
              ? 'text-[#E0E0E0]' 
              : 'text-slate-600'
          }`}>
            {t('subtitle')}
          </p>
          
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            {/* Sidebar with industry selection */}
            <div className="md:col-span-3">
              <div className={`rounded-xl p-4 sticky top-24 ${
                theme === 'dark' 
                  ? 'bg-[#111119] border border-white/10' 
                  : 'bg-white border border-slate-200 shadow-sm'
              }`}>
                <h3 className={`font-medium mb-4 text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>{t('sidebarTitle')}</h3>
                <div className="space-y-2">
                  {industries.map((industry, index) => (
                    <Button 
                      key={index}
                      variant={selectedIndustry.nameKey === industry.nameKey ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        selectedIndustry.nameKey === industry.nameKey 
                          ? 'bg-[#3662e3] hover:bg-[#3662e3] hover:opacity-90 text-white' 
                          : theme === 'dark'
                            ? 'text-white/70 hover:text-white'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      onClick={() => {
                        // Per E-commerce, reindirizziamo alla pagina dedicata italiana (uguale per tutte le lingue)
                        if (industry.nameKey === 'ecommerce') {
                          window.location.href = "/settori/ecommerce";
                        } else {
                          // Aggiorna l'hash dell'URL con lo slug tradotto
                          window.location.hash = getTranslatedIndustrySlug(industry);
                        }
                      }}
                    >
                      {industry.nameKey ? t(`industryNames.${industry.nameKey}`) : industry.name}
                      {industry.nameKey === "ecommerce" && (
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                          theme === 'dark'
                            ? 'bg-[#4CAF50] text-white'
                            : 'bg-[#4CAF50] text-white'
                        }`}>
                          {t('dedicated')}
                        </span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="md:col-span-9">
              <Card className={`${
                theme === 'dark' 
                  ? 'bg-[#111119] border-white/10 text-white' 
                  : 'bg-white border-slate-200 text-slate-800 shadow-sm'
              }`}>
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#60a5fa]/20 flex items-center justify-center text-[#60a5fa]">
                        {getIcon(selectedIndustry.icon)}
                      </div>
                      {selectedIndustry.nameKey ? t(`industryNames.${selectedIndustry.nameKey}`) : selectedIndustry.name}
                    </div>
                  </CardTitle>
                  <CardDescription className={`text-lg ${
                    theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
                  }`}>
                    {getTranslatedIndustry(selectedIndustry).description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`p-6 rounded-lg mb-8 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-[#3662e3]/10 to-transparent'
                      : 'bg-gradient-to-r from-[#3662e3]/5 to-white border border-slate-100'
                  }`}>
                    <h3 className={`text-xl mb-4 font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>{t('benefits')} {selectedIndustry.nameKey ? t(`industryNames.${selectedIndustry.nameKey}`) : selectedIndustry.name}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {getTranslatedIndustry(selectedIndustry).benefits.map((benefit: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="rounded-full bg-[#60a5fa]/20 p-1 mt-0.5">
                            <Check className="h-4 w-4 text-[#60a5fa]" />
                          </div>
                          <span className={`${
                            theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'
                          }`}>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`rounded-lg p-6 ${
                    theme === 'dark'
                      ? 'bg-[#1A1A27] border border-white/10'
                      : 'bg-slate-50 border border-slate-200'
                  }`}>
                    <h3 className={`text-xl mb-4 font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>{t('howItWorks')} {selectedIndustry.nameKey ? t(`industryNames.${selectedIndustry.nameKey}`) : selectedIndustry.name}</h3>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'
                    }`}>
                      {t('solutionsDesc', { industry: getTranslatedIndustryName(selectedIndustry) })}
                    </p>
                    <ul className={`space-y-2 mb-6 ${
                      theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'
                    }`}>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-[#60a5fa] min-w-[20px] mt-0.5" />
                        <span>{t('benefit1')}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-[#60a5fa] min-w-[20px] mt-0.5" />
                        <span>{t('benefit2')}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-[#60a5fa] min-w-[20px] mt-0.5" />
                        <span>{t('benefit3')}</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="bg-[#3662e3] hover:bg-[#3662e3] hover:opacity-90 text-white w-full"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      window.location.href = t('urls.contacts', '/contatti');
                    }}
                  >
                    {t('requestDemo')}
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`${
                  theme === 'dark' 
                    ? 'bg-[#111119] border-white/10 text-white' 
                    : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                }`}>
                  <CardHeader>
                    <CardTitle className="text-xl">{t('caseStudyTitle', { industry: getTranslatedIndustryName(selectedIndustry) })}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
                    }`}>
                      {t('caseStudyDesc', { industry: getTranslatedIndustryName(selectedIndustry) })}
                    </p>
                    <div className={`rounded-lg p-4 mb-4 ${
                      theme === 'dark'
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-slate-50 border border-slate-200'
                    }`}>
                      <p className={`text-sm italic ${
                        theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                      }`}>
                        "{t('testimonialQuote')}"
                      </p>
                      <p className={`text-xs mt-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                      }`}>— {t('testimonialSource', { industry: getTranslatedIndustryName(selectedIndustry) })}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className={`w-full ${
                        theme === 'dark'
                          ? 'border-white/20 text-white hover:bg-white/5'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        window.location.href = t('urls.caseStudies', '/casi-studio');
                      }}
                    >
                      {t('readCaseStudy')}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className={`${
                  theme === 'dark' 
                    ? 'bg-[#111119] border-white/10 text-white' 
                    : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                }`}>
                  <CardHeader>
                    <CardTitle className="text-xl">{t('faqTitle', { industry: getTranslatedIndustryName(selectedIndustry) })}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className={`font-medium mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>{t('faq1Title')}</h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
                        }`}>
                          {t('faq1Answer')}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>{t('faq2Title')}</h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
                        }`}>
                          {t('faq2Answer', { industry: getTranslatedIndustryName(selectedIndustry) })}
                        </p>
                      </div>
                      <div>
                        <h4 className={`font-medium mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>{t('faq3Title', { industry: getTranslatedIndustryName(selectedIndustry) })}</h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
                        }`}>
                          {t('faq3Answer')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className={`w-full ${
                        theme === 'dark'
                          ? 'border-white/20 text-white hover:bg-white/5'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => {
                        // Naviga alla pagina dei contatti e imposta una sessione per indicare che deve scrollare all'elemento
                        sessionStorage.setItem('scrollToFAQ', 'true');
                        window.location.href = t('urls.contacts', '/contatti');
                      }}
                    >
                      {t('moreFaq')}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl p-8 text-center max-w-5xl mx-auto ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#6200EA]/20 via-[#3662e3]/20 to-[#2196F3]/20 border border-white/10'
              : 'bg-gradient-to-r from-[#6200EA]/5 via-[#3662e3]/5 to-[#2196F3]/5 border border-slate-200 shadow-sm'
          }`}>
            <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {t('startNow')}
            </h2>
            <p className={`mb-6 max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
            }`}>
              {t('ctaDescription')}
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-[#3662e3] text-white hover:bg-[#3662e3] hover:opacity-90"
                onClick={() => {
                  window.scrollTo(0, 0);
                  window.location.href = t('urls.contacts', '/contatti');
                }}
              >
                {t('bookDemo')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      </div>
    </>
  );
}