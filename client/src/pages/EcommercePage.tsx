import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { industries } from '@/data/industries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { Zap, ArrowRight, Check, ShoppingCart, TrendingUp, RefreshCw, Users, CreditCard, Sparkles, Rocket, Bot } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { Link } from "wouter";

// Ottieni i dati specifici per E-commerce
const ecommerceData = industries.find(industry => industry.name === "E-commerce");

export default function EcommercePage() {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation(['ecommerce']);
  const currentLanguage = i18n.language;

  // I passaggi chiave del processo di customer care AI per e-commerce
  const automationSteps = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-[#60a5fa]" />,
      title: t('automationSteps.tracking.title'),
      description: t('automationSteps.tracking.description')
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#60a5fa]" />,
      title: t('automationSteps.catalog.title'),
      description: t('automationSteps.catalog.description')
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-[#60a5fa]" />,
      title: t('automationSteps.availability.title'),
      description: t('automationSteps.availability.description')
    },
    {
      icon: <Users className="h-8 w-8 text-[#60a5fa]" />,
      title: t('automationSteps.personalized.title'),
      description: t('automationSteps.personalized.description')
    }
  ];

  // Casi d'uso specifici per customer care AI in e-commerce
  const ecommerceCaseStudies = [
    {
      title: t('caseStudies.catalog.title'),
      description: t('caseStudies.catalog.description'),
      testimonial: "caseStudy.testimonial"
    },
    {
      title: t('caseStudies.tracking.title'),
      description: t('caseStudies.tracking.description'),
      testimonial: "testimonial.quote"
    }
  ];

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
      <Header />
      <MobileMenu />
      
      <div className={`min-h-screen py-16 md:py-24 ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
          
        <div className="container mx-auto px-4 md:px-6 relative z-10 pt-10 md:pt-16">
          <div className="flex items-center justify-center mb-8 md:mb-12">
            <Badge variant="outline" className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full ${
              theme === 'dark'
                ? 'bg-[#3662e3]/20 text-white border-[#3662e3]/20'
                : 'bg-[#3662e3]/30 text-[#1e40af] border-[#3662e3]/30 font-semibold'
            }`}>
              <Sparkles className="w-5 h-5 mr-2 text-[#60a5fa]" />
              {t('badge')}
            </Badge>
          </div>
          
          <div className="max-w-5xl mx-auto text-center">
            <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-center leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <span className={`bg-clip-text text-transparent ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-white to-white/80'
                  : 'bg-gradient-to-r from-slate-900 to-slate-700'
              }`}
              dangerouslySetInnerHTML={{ __html: t('title') }}>
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl text-center mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
            }`}>
              {t('subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-[#3662e3] hover:bg-[#3662e3] hover:opacity-90 text-white rounded-full font-medium px-6"
                onClick={() => window.open("https://dash.leader24.it/signup", "_blank")}
              >
                <Rocket className="w-5 h-5 mr-2" />
                {t('startDemo')}
              </Button>
              <Link href="/contatti">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className={`rounded-full px-6 ${
                    theme === 'dark' 
                      ? 'border-white/20 text-white hover:bg-white/5' 
                      : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                  }`}
                  onClick={() => {
                    // Assicura che lo scroll torni in cima alla pagina quando si naviga
                    setTimeout(() => window.scrollTo(0, 0), 100);
                  }}
                >
                  <Bot className="w-5 h-5 mr-2" />
                  {t('discoverHow')}
                </Button>
              </Link>
            </div>
            
            {/* Stats cards */}
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <Card className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#111119]/60 backdrop-blur-md border-white/10 text-white' 
                  : 'bg-white border-slate-200 shadow-md text-slate-800'
              }`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardContent className="p-6 text-center relative z-10">
                  <p className="text-4xl md:text-5xl font-bold text-[#3662e3] mb-2">+37%</p>
                  <p className={theme === 'dark' ? 'text-white/80' : 'text-slate-600'}>{t('statsCards.sales')}</p>
                </CardContent>
              </Card>
              
              <Card className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#111119]/60 backdrop-blur-md border-white/10 text-white' 
                  : 'bg-white border-slate-200 shadow-md text-slate-800'
              }`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardContent className="p-6 text-center relative z-10">
                  <p className="text-4xl md:text-5xl font-bold text-[#3662e3] mb-2">82%</p>
                  <p className={theme === 'dark' ? 'text-white/80' : 'text-slate-600'}>{t('statsCards.satisfaction')}</p>
                </CardContent>
              </Card>
              
              <Card className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-[#111119]/60 backdrop-blur-md border-white/10 text-white' 
                  : 'bg-white border-slate-200 shadow-md text-slate-800'
              }`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardContent className="p-6 text-center relative z-10">
                  <p className="text-4xl md:text-5xl font-bold text-[#3662e3] mb-2">-65%</p>
                  <p className={theme === 'dark' ? 'text-white/80' : 'text-slate-600'}>{t('statsCards.reduction')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <section className={`py-16 md:py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0A0A10]' : 'bg-gray-50'}`}>
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#3662e3]/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          {/* Sezione caratteristiche principali */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className={`${
              theme === 'dark'
                ? 'bg-[#111119] border-white/10 text-white'
                : 'bg-white border-slate-200 shadow-sm text-slate-800'
            }`}>
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3662e3]/20 flex items-center justify-center text-[#3662e3]">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  E-commerce
                </CardTitle>
                <CardDescription className={`text-lg ${
                  theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
                }`}>
                  {ecommerceData?.description || "Automatizza le risposte alle domande più frequenti e fornisci assistenza 24/7 ai tuoi clienti online."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="p-6 rounded-lg mb-8 relative overflow-hidden transition-all duration-200 group hover:shadow-xl"
                  style={{
                    position: 'relative',
                    background: theme === 'dark' 
                      ? 'linear-gradient(45deg, rgba(54, 98, 227, 0.1), rgba(0, 0, 0, 0))' 
                      : 'linear-gradient(45deg, rgba(54, 98, 227, 0.05), rgba(255, 255, 255, 0))',
                  }}
                >
                  {/* Gradienti interattivi che si muovono con il mouse */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.3) 0%, rgba(54, 98, 227, 0.1) 20%, transparent 60%)',
                      transformOrigin: 'var(--x) var(--y)',
                      mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      e.currentTarget.style.setProperty('--x', `${x}%`);
                      e.currentTarget.style.setProperty('--y', `${y}%`);
                    }}
                  ></div>
                  
                  <h3 className={`text-xl mb-4 font-medium relative z-10 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>{t('benefits')}</h3>
                  <div className="grid md:grid-cols-2 gap-4 relative z-10">
                    {ecommerceData?.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="rounded-full bg-[#3662e3]/20 p-1 mt-0.5">
                          <Check className="h-4 w-4 text-[#60a5fa]" />
                        </div>
                        <span className={theme === 'dark' ? 'text-white' : 'text-slate-600'}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/contatti">
                  <Button 
                    className="bg-[#3662e3] hover:bg-[#3662e3] hover:opacity-90 text-white w-full"
                    onClick={() => {
                      // Assicura che lo scroll torni in cima alla pagina quando si naviga
                      setTimeout(() => window.scrollTo(0, 0), 100);
                    }}
                  >
                    {t('requestDemo')}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <div className="grid gap-4">
              <Card className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#111119] border-white/10 text-white'
                  : 'bg-white border-slate-200 shadow-sm text-slate-800'
              }`}>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: 'overlay',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl">Statistiche E-commerce</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div className={`flex justify-between items-center p-2 rounded-lg transition-all ${
                      theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}>
                      <span className={theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}>Aumento vendite con AI catalogo</span>
                      <Badge className="bg-[#3662e3] shadow-glow text-white">+37%</Badge>
                    </div>
                    <div className={`flex justify-between items-center p-2 rounded-lg transition-all ${
                      theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}>
                      <span className={theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}>Risposta domande ordini</span>
                      <Badge className="bg-[#3662e3] shadow-glow text-white">24/7</Badge>
                    </div>
                    <div className={`flex justify-between items-center p-2 rounded-lg transition-all ${
                      theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}>
                      <span className={theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}>Soddisfazione clienti</span>
                      <Badge className="bg-[#3662e3] shadow-glow text-white">+82%</Badge>
                    </div>
                    <div className={`flex justify-between items-center p-2 rounded-lg transition-all ${
                      theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}>
                      <span className={theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}>Tasso di riacquisto</span>
                      <Badge className="bg-[#3662e3] shadow-glow text-white">+58%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#111119] border-white/10 text-white'
                  : 'bg-white border-slate-200 shadow-sm text-slate-800'
              }`}>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: 'overlay',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-xl">Integrazione con piattaforme leader</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div 
                      className="rounded-lg p-4 border border-white/10 overflow-hidden relative group hover:shadow-xl transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(54, 98, 227, 0.05), rgba(0, 0, 0, 0))',
                      }}
                    >
                      {/* Gradienti interattivi che si muovono con il mouse */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.3) 0%, rgba(54, 98, 227, 0.1) 20%, transparent 60%)',
                          transformOrigin: 'var(--x) var(--y)',
                          mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                        }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          e.currentTarget.style.setProperty('--x', `${x}%`);
                          e.currentTarget.style.setProperty('--y', `${y}%`);
                        }}
                      ></div>
                      
                      <h3 className="text-lg font-semibold text-[#3662e3] mb-2 flex items-center relative z-10">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1.75L5.75 4.5V9.25C5.75 14.31 8.21 19.01 12 20.5C15.79 19.01 18.25 14.31 18.25 9.25V4.5L12 1.75Z" stroke="#3662e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('shopify.title')}
                      </h3>
                      <p className={`text-sm relative z-10 ${
                        theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700 font-medium'
                      }`}>
                        {t('shopify.description')}
                      </p>
                    </div>
                    <div 
                      className="rounded-lg p-4 border border-white/10 overflow-hidden relative group hover:shadow-xl transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(54, 98, 227, 0.05), rgba(0, 0, 0, 0))',
                      }}
                    >
                      {/* Gradienti interattivi che si muovono con il mouse */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                        style={{
                          background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.3) 0%, rgba(54, 98, 227, 0.1) 20%, transparent 60%)',
                          transformOrigin: 'var(--x) var(--y)',
                          mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                        }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 100;
                          const y = ((e.clientY - rect.top) / rect.height) * 100;
                          e.currentTarget.style.setProperty('--x', `${x}%`);
                          e.currentTarget.style.setProperty('--y', `${y}%`);
                        }}
                      ></div>
                      
                      <h3 className="text-lg font-semibold text-[#3662e3] mb-2 flex items-center relative z-10">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 6L18 8M18 8L16 10M18 8H13M13 14L11 16M11 16L13 18M11 16H16M6 14H8C9.10457 14 10 13.1046 10 12V8C10 6.89543 9.10457 6 8 6H6C4.89543 6 4 6.89543 4 8V12C4 13.1046 4.89543 14 6 14Z" stroke="#3662e3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t('woocommerce.title')}
                      </h3>
                      <p className={`text-sm relative z-10 ${
                        theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700 font-medium'
                      }`}>
                        {t('woocommerce.description')}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm italic px-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'text-[#E0E0E0] bg-white/5' 
                      : 'text-slate-700 bg-slate-50 border border-slate-200'
                  }`}>
                    {t('testimonial.quote')}
                    <span className={`block mt-1 text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                    }`}>{t('testimonial.source')}</span>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Come funziona */}
          <div className="mb-20">
            <h2 className={`text-2xl md:text-3xl font-bold mb-10 text-center ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {t('howItWorks')}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {automationSteps.map((step, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-[#111119] border-white/10 text-white'
                      : 'bg-white border-slate-200 shadow-sm text-slate-800'
                  }`}
                >
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#3662e3] to-[#5b82ff]"></div>
                  
                  {/* Gradiente interattivo che segue il movimento del mouse */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                      mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      e.currentTarget.style.setProperty('--x', `${x}%`);
                      e.currentTarget.style.setProperty('--y', `${y}%`);
                    }}
                  ></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="mb-4 relative transition-transform group-hover:scale-110 duration-300">
                      {step.icon}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className={`text-sm ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}`}>{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Case studies */}
          <div className="mb-20">
            <h2 className={`text-2xl md:text-3xl font-bold mb-10 text-center ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {t('caseStudiesTitle')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {ecommerceCaseStudies.map((caseStudy, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-[#111119] border-white/10 text-white' 
                      : 'bg-white border-slate-200 shadow-sm text-slate-800'
                  }`}
                >
                  {/* Gradiente interattivo che segue il movimento del mouse */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                      mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                    }}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = ((e.clientX - rect.left) / rect.width) * 100;
                      const y = ((e.clientY - rect.top) / rect.height) * 100;
                      e.currentTarget.style.setProperty('--x', `${x}%`);
                      e.currentTarget.style.setProperty('--y', `${y}%`);
                    }}
                  ></div>
                  
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl">{caseStudy.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className={`mb-4 ${
                      theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'
                    }`}>
                      {caseStudy.description}
                    </p>
                    <div className={`rounded-lg p-4 mb-4 transform transition-transform group-hover:scale-[1.02] duration-300 ${
                      theme === 'dark' 
                        ? 'bg-white/5 border border-white/10' 
                        : 'bg-slate-50 border border-slate-200'
                    }`}>
                      <p className={`text-sm italic ${
                        theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                      }`}>
                        {t(caseStudy.testimonial)}
                      </p>
                      <p className={`text-xs mt-2 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                      }`}>— {caseStudy.testimonial === "testimonial.quote" ? t("testimonial.source") : t('caseStudy.client')}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="relative z-10">
                    <Link href={currentLanguage === 'it' ? "/casi-studio" : "/en/casi-studio"}>
                      <Button 
                        variant="outline" 
                        className={`w-full ${
                          theme === 'dark'
                            ? 'border-white/20 text-white hover:bg-white/5'
                            : 'border-slate-300 text-slate-800 hover:bg-slate-100'
                        }`}
                        onClick={() => {
                          // Assicura che lo scroll torni in cima alla pagina quando si naviga
                          setTimeout(() => window.scrollTo(0, 0), 100);
                        }}
                      >
                        {t('caseStudy.readMore')}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* CTA finale */}
          <div 
            className={`rounded-xl overflow-hidden p-8 md:p-12 relative mb-20 group transition-all duration-300 ${
              theme === 'dark' 
                ? 'border border-white/10 bg-[#111119] hover:shadow-[0_0_25px_rgba(255,87,34,0.15)]' 
                : 'border border-slate-200 bg-white/80 hover:shadow-lg'
            }`}
          >
            {/* Linee luminose superiore e inferiore */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#3662e3]/0 via-[#3662e3] to-[#3662e3]/0 group-hover:via-[#3662e3]/70 transition-all duration-700"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#3662e3]/0 via-[#3662e3] to-[#3662e3]/0 group-hover:via-[#3662e3]/70 transition-all duration-700"></div>
            
            {/* Gradiente interattivo che segue il movimento del mouse */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.4) 0%, rgba(54, 98, 227, 0.1) 30%, transparent 70%)',
                mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty('--x', `${x}%`);
                e.currentTarget.style.setProperty('--y', `${y}%`);
              }}
            ></div>
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className={`text-2xl md:text-4xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                {t('finalCta.title')}
              </h2>
              <p className={`text-lg mb-8 ${
                theme === 'dark'
                  ? 'text-[#E0E0E0] group-hover:text-white' 
                  : 'text-slate-600 group-hover:text-slate-800'
              } transition-colors duration-300`}>
                {t('finalCta.description')}
              </p>
              <div className="flex justify-center">
                <Link href={currentLanguage === 'it' ? "/contatti" : "/en/contatti"}>
                  <Button 
                    size="lg" 
                    className="bg-[#3662e3] hover:bg-[#3662e3]/90 text-white shadow-glow"
                    onClick={() => {
                      // Assicura che lo scroll torni in cima alla pagina quando si naviga
                      setTimeout(() => window.scrollTo(0, 0), 100);
                    }}
                  >
                    {t('finalCta.requestDemo')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* FAQ */}
          <div className="mb-20">
            <h2 className={`text-2xl md:text-3xl font-bold mb-10 text-center ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              {t('faq.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card 
                className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#111119] border-white/10 text-white'
                    : 'bg-white border-slate-200 shadow-sm text-slate-800'
                }`}
              >
                {/* Gradiente interattivo che segue il movimento del mouse */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-lg">{t('faq.questions.implementation.question')}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className={`transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-[#E0E0E0] group-hover:text-white' 
                      : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {t('faq.questions.implementation.answer')}
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#111119] border-white/10 text-white'
                    : 'bg-white border-slate-200 shadow-sm text-slate-800'
                }`}
              >
                {/* Gradiente interattivo che segue il movimento del mouse */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-lg">{t('faq.questions.integration.question')}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className={`transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-[#E0E0E0] group-hover:text-white' 
                      : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {t('faq.questions.integration.answer')}
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#111119] border-white/10 text-white'
                    : 'bg-white border-slate-200 shadow-sm text-slate-800'
                }`}
              >
                {/* Gradiente interattivo che segue il movimento del mouse */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-lg">{t('faq.questions.satisfaction.question')}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className={`transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-[#E0E0E0] group-hover:text-white' 
                      : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {t('faq.questions.satisfaction.answer')}
                  </p>
                </CardContent>
              </Card>
              
              <Card 
                className={`overflow-hidden relative group hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-[#111119] border-white/10 text-white'
                    : 'bg-white border-slate-200 shadow-sm text-slate-800'
                }`}
              >
                {/* Gradiente interattivo che segue il movimento del mouse */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{
                    background: theme === 'dark'
                      ? 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.2) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)'
                      : 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(54, 98, 227, 0.15) 0%, rgba(54, 98, 227, 0.05) 25%, transparent 70%)',
                    mixBlendMode: theme === 'dark'
                      ? 'soft-light'
                      : 'multiply',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                    e.currentTarget.style.setProperty('--x', `${x}%`);
                    e.currentTarget.style.setProperty('--y', `${y}%`);
                  }}
                ></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="text-lg">{t('faq.questions.catalog.question')}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className={`transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-[#E0E0E0] group-hover:text-white' 
                      : 'text-slate-600 group-hover:text-slate-800'
                  }`}>
                    {t('faq.questions.catalog.answer')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}