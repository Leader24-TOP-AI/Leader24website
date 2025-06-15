import React, { useState, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";

export default function CaseStudies() {
  const { theme } = useTheme();
  const { t } = useTranslation('casestudies');
  
  // Otteniamo i case study dalle traduzioni
  const extendedCaseStudies = t('caseStudies', { returnObjects: true }) as any[];
  
  // Coordinate del mouse per effetto di movimento dello sfondo
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    setMousePosition({
      x: clientX / windowWidth,
      y: clientY / windowHeight
    });
  }, []);

  // Effetto per aggiungere l'event listener del mouse
  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <>
      <Header />
      <MobileMenu />
      <main className="flex flex-col min-h-screen">
        {/* Hero section */}
        <section className={`py-16 md:py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-[#091428] to-[#0A1A41]' : 'bg-gradient-to-br from-slate-50 to-slate-200'}`}>
          {/* Gradienti di sfondo animati */}
          <div 
            className={`absolute w-96 h-96 rounded-full blur-3xl transition-all duration-300 ease-out ${theme === 'dark' ? 'bg-purple-900/15' : 'bg-purple-400/10'}`}
            style={{ 
              right: `${mousePosition.x * 20}px`, 
              bottom: `${mousePosition.y * 20}px`,
            }}
          ></div>
          <div 
            className={`absolute w-72 h-72 rounded-full blur-3xl transition-all duration-300 ease-out ${theme === 'dark' ? 'bg-blue-900/15' : 'bg-blue-400/10'}`}
            style={{ 
              left: `${-mousePosition.x * 20}px`, 
              top: `${-mousePosition.y * 20}px`,
            }}
          ></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text' : 'bg-gradient-to-r from-slate-800 to-slate-600 text-transparent bg-clip-text'}`}>{t('title')}</h1>
                <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>
                  {t('subtitle')}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className={`rounded-lg p-4 text-center ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-800/5 border border-slate-200'}`}>
                    <div className="text-[#FF5722] text-3xl font-bold mb-2">{t('stats.customerSatisfaction.value')}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>{t('stats.customerSatisfaction.text')}</div>
                  </div>
                  <div className={`rounded-lg p-4 text-center ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-800/5 border border-slate-200'}`}>
                    <div className="text-[#FF5722] text-3xl font-bold mb-2">{t('stats.timeReduction.value')}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>{t('stats.timeReduction.text')}</div>
                  </div>
                  <div className={`rounded-lg p-4 text-center ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-800/5 border border-slate-200'}`}>
                    <div className="text-[#FF5722] text-3xl font-bold mb-2">{t('stats.support.value')}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>{t('stats.support.text')}</div>
                  </div>
                </div>
                
                <Link href="/contatti">
                  <Button className="bg-gradient-to-r from-[#FF5722] to-[#FFA07A] hover:from-[#FFA07A] hover:to-[#FF5722] text-white px-8 py-6 text-lg">
                    {t('cta')}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              
              <div className="hidden lg:block">
                <div className="relative">
                  {/* Mockup di un telefono con WhatsApp */}
                  <div className="bg-[#121218] border-4 border-[#0F0F17] rounded-[32px] p-3 shadow-xl w-[280px] mx-auto">
                    {/* Header del telefono */}
                    <div className="h-6 flex justify-center mb-1">
                      <div className="w-24 h-4 bg-black rounded-full"></div>
                    </div>
                    
                    {/* Schermo */}
                    <div className="bg-[#0D1117] rounded-[18px] overflow-hidden">
                      {/* Header WhatsApp */}
                      <div className="bg-[#075E54] text-white p-3 flex items-center">
                        <div className="font-medium">Leader24 Business</div>
                      </div>
                      
                      {/* Chat */}
                      <div className="h-[420px] p-3 bg-[#0D1117] relative">
                        {/* Pattern di sfondo */}
                        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0tMTAgMTBsMjAtMjBNMTAgMzBsMjAtMjBNLTEwIDMwbDIwLTIwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTAgMGg0MHY0MEgweiIvPjwvc3ZnPg==')]"></div>
                        
                        <div className="flex flex-col space-y-2 relative z-10">
                          {/* Messaggio utente */}
                          <div className="self-end max-w-[75%] bg-[#005C4B] text-white p-2 rounded-lg text-sm">
                            {t('chatDemo.userMsg1')}
                          </div>
                          
                          {/* Risposta bot */}
                          <div className="self-start max-w-[75%] bg-[#1F2C34] text-white p-2 rounded-lg text-sm">
                            {t('chatDemo.botReply1')}
                          </div>
                          
                          {/* Messaggio utente */}
                          <div className="self-end max-w-[75%] bg-[#005C4B] text-white p-2 rounded-lg text-sm">
                            {t('chatDemo.userMsg2')}
                          </div>
                          
                          {/* Risposta bot */}
                          <div className="self-start max-w-[75%] bg-[#1F2C34] text-white p-2 rounded-lg text-sm">
                            {t('chatDemo.botReply2')}
                          </div>
                        </div>
                        
                        {/* Input bar */}
                        <div className="absolute bottom-3 left-3 right-3 bg-[#1F2C34] rounded-full flex items-center p-1">
                          <div className="bg-[#00A884] rounded-full w-8 h-8 flex items-center justify-center ml-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom bar */}
                    <div className="h-1 w-32 bg-white/20 rounded-full mx-auto mt-4"></div>
                  </div>
                  
                  {/* Elementi decorativi */}
                  <div className="absolute top-10 -left-10 w-32 h-32 bg-[#FF5722]/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-10 -right-10 w-32 h-32 bg-[#FF5722]/10 rounded-full blur-xl"></div>
                </div>
              </div>
            </div>
            
            {/* Statistiche aziende */}
            <div className={`mt-16 pt-8 ${theme === 'dark' ? 'border-t border-white/10' : 'border-t border-slate-200'}`}>
              <div className={`text-center mb-4 text-sm uppercase tracking-wider ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>{t('trustedBy')}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-[#FF5722] text-2xl font-bold mb-1">{t('companies.count')}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-500'}`}>{t('companies.label')}</div>
                </div>
                <div>
                  <div className="text-[#FF5722] text-2xl font-bold mb-1">{t('sectors.count')}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-500'}`}>{t('sectors.label')}</div>
                </div>
                <div>
                  <div className="text-[#FF5722] text-2xl font-bold mb-1">{t('countries.count')}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-500'}`}>{t('countries.label')}</div>
                </div>
                <div>
                  <div className="text-[#FF5722] text-2xl font-bold mb-1">{t('languages.count')}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-500'}`}>{t('languages.label')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Case studies full */}
        <section className={`py-16 ${theme === 'dark' ? 'bg-[#0F111A]' : 'bg-slate-50'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-20">
              {extendedCaseStudies.map((caseStudy: any, index: number) => (
                <div key={index} className="grid md:grid-cols-2 gap-10 items-start" id={caseStudy.company.toLowerCase().replace(/\s+/g, '-')}>
                  {/* Informazioni caso studio */}
                  <div>
                    <div className={`${caseStudy.gradient} rounded-lg p-2 mb-6 inline-block`}>
                      <span className="text-white font-medium text-sm">{caseStudy.industry}</span>
                    </div>
                    <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{caseStudy.fullTitle}</h2>
                    
                    <div className={`mb-8 p-6 rounded-lg ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                      <blockquote className={`italic mb-4 ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>&ldquo;{caseStudy.quote}&rdquo;</blockquote>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[#FF5722]/20 flex items-center justify-center mr-3">
                          <span className="text-[#FF5722] font-bold">
                            {caseStudy.person.name.includes("Laura") ? "L" : caseStudy.person.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{caseStudy.person.name}</p>
                          <p className={`text-sm ${theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-500'}`}>{caseStudy.person.title}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t('detailsLabels.challenges')}</h3>
                      <ul className="space-y-2">
                        {caseStudy.challenges.map((challenge: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[#FF5722] mr-2">•</span>
                            <span className={`${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t('detailsLabels.solution')}</h3>
                      <p className={`${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>{caseStudy.solution}</p>
                    </div>
                    
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t('detailsLabels.results')}</h3>
                      <ul className="space-y-2">
                        {caseStudy.results.map((result: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-[#FF5722] mr-2">✓</span>
                            <span className={`${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Immagine e testimonianza completa */}
                  <div>
                    <div className={`rounded-lg overflow-hidden mb-6 ${theme === 'dark' ? 'bg-[#0A0A10] border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                      <div className={`aspect-[4/3] flex items-center justify-center ${theme === 'dark' ? 'bg-gradient-to-br from-[#14213D] to-[#141B2D]' : 'bg-gradient-to-br from-slate-100 to-slate-200'}`}>
                        <div className="p-8 text-center">
                          <img 
                            src={`/logo-${caseStudy.company.toLowerCase().replace(/\s+/g, '-')}.png`} 
                            alt={`Logo ${caseStudy.company}`}
                            className="max-h-16 mx-auto mb-4 opacity-80"
                            onError={(e) => {
                              // Fallback se l'immagine non esiste
                              const target = e.target as HTMLImageElement;
                              target.src = '';
                              target.alt = caseStudy.company;
                              // Non modifichiamo il DOM direttamente per evitare errori
                              target.style.display = 'none';
                            }}
                          />
                          <div className={`italic ${theme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>
                            "{caseStudy.company} ha trasformato la propria comunicazione con Leader24"
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-[#121218] border border-white/10' : 'bg-white border border-slate-200 shadow-sm'}`}>
                      <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t('detailsLabels.testimonial')}</h3>
                      <blockquote className={`${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>
                        {caseStudy.testimonial}
                      </blockquote>
                    </div>
                    
                    <div className="mt-8">
                      <Link href="/contatti">
                        <Button className="w-full bg-gradient-to-r from-[#FF5722] to-[#FFA07A] hover:from-[#FFA07A] hover:to-[#FF5722] text-white">
                          {t('detailsLabels.contact')}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  {index < extendedCaseStudies.length - 1 && (
                    <div className={`col-span-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}