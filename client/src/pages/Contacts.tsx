import React, { useState, useCallback } from "react";
import { Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { useTheme } from "@/components/ThemeProvider";
import { useTranslation } from "react-i18next";

export default function Contacts() {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { t } = useTranslation('contact');
  
  // Scroll in cima alla pagina quando il componente viene montato
  React.useEffect(() => {
    window.scrollTo(0, 0);
    console.log("Contacts: pagina caricata - scrollato in cima");
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Effetto per gestire lo scrolling alle FAQ in modo personalizzato
  React.useEffect(() => {
    // Controlla se c'è un hash nell'URL o un flag in sessionStorage
    const shouldScrollToFAQ = sessionStorage.getItem('scrollToFAQ') === 'true';
    
    if (window.location.hash || shouldScrollToFAQ) {
      // Attende che il DOM sia completamente caricato
      setTimeout(() => {
        let element;
        
        if (shouldScrollToFAQ) {
          // Rimuovi il flag dalla sessionStorage
          sessionStorage.removeItem('scrollToFAQ');
          // Trova l'elemento FAQ h2
          element = document.getElementById('Frequently asked questions');
        } else if (window.location.hash) {
          // Gestisci il caso del hash nell'URL
          const id = window.location.hash.substring(1);
          element = document.getElementById(id);
        }
        
        if (element) {
          // Calcola la posizione esatta dell'elemento
          const rect = element.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Scorre alla posizione dell'elemento con un offset verso l'alto per maggiore visibilità
          window.scrollTo({
            top: scrollTop + rect.top - 100, // Offset di 100px per miglior visualizzazione
            behavior: 'smooth'
          });
        }
      }, 500); // Aumenta il timeout per assicurarsi che la pagina sia completamente caricata
    }
  }, []);
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione base
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: t('validation.formError'),
        description: t('validation.requiredFields')
      });
      return;
    }
    
    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: t('validation.invalidEmail'),
        description: t('validation.enterValidEmail')
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulazione invio dati
    try {
      // Qui andrà la chiamata API reale
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('validation.messageSent'),
        description: t('validation.willRespond'),
      });
      
      // Reset del form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('validation.sendError'),
        description: t('validation.tryAgain')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // FAQ data from translations
  // Gestione sicura dell'oggetto FAQ
  const rawFaqItems = t('faq.items', { returnObjects: true });
  const faqItems = Array.isArray(rawFaqItems) ? rawFaqItems : [];
  
  // Stato per tenere traccia di quale FAQ è attualmente aperta
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Funzione per gestire il click su una FAQ
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Header />
      <MobileMenu />
      <main className="flex flex-col min-h-screen">
        {/* Hero section with contact form */}
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
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Hero text */}
              <div>
                <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text' : 'bg-gradient-to-r from-slate-800 to-slate-600 text-transparent bg-clip-text'}`}>{t('title')}</h1>
                <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>
                  {t('subtitle')}
                </p>
                <div className="hidden md:block">
                  <div className={`rounded-lg p-6 backdrop-blur-sm ${theme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-slate-800/5 border border-slate-300'}`}>
                    <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t('whyChoose')}</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-[#60a5fa] mr-2">✓</span>
                        <span className={`${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>{t('benefits.1')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#60a5fa] mr-2">✓</span>
                        <span className={`${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>{t('benefits.2')}</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#60a5fa] mr-2">✓</span>
                        <span className={`${theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-700'}`}>{t('benefits.3')}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Contact form */}
              <div>
                <Card className={`shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-[#121218] border-white/10' : 'bg-white border-slate-200'}`}>
                  <CardHeader>
                    <CardTitle className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{t('form.title')}</CardTitle>
                    <CardDescription className={theme === 'dark' ? 'text-[#BBBBBB]' : 'text-slate-500'}>
                      {t('form.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className={theme === 'dark' ? 'text-white' : 'text-slate-700'}>{t('form.fullName')}</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            placeholder="Mario Rossi" 
                            className={theme === 'dark' 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                            }
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email" className={theme === 'dark' ? 'text-white' : 'text-slate-700'}>{t('form.email')}</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="mario.rossi@azienda.com" 
                            className={theme === 'dark' 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                            }
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className={theme === 'dark' ? 'text-white' : 'text-slate-700'}>{t('form.phone')}</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            placeholder="+39 123 456 7890" 
                            className={theme === 'dark' 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                            }
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="company" className={theme === 'dark' ? 'text-white' : 'text-slate-700'}>{t('form.company')}</Label>
                          <Input 
                            id="company" 
                            name="company" 
                            placeholder="Nome Azienda" 
                            className={theme === 'dark' 
                              ? 'bg-white/5 border-white/10 text-white' 
                              : 'bg-slate-50 border-slate-200 text-slate-900'
                            }
                            value={formData.company}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className={theme === 'dark' ? 'text-white' : 'text-slate-700'}>{t('form.message')}</Label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          rows={4} 
                          placeholder={t('form.messagePlaceholder')} 
                          className={theme === 'dark' 
                            ? 'bg-white/5 border-white/10 text-white resize-none' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 resize-none'
                          }
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#3662e3] to-[#5b82ff] hover:from-[#5b82ff] hover:to-[#3662e3] text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                            {t('form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" /> {t('form.submit')}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ section */}
        <section id="Domande frequenti" className={`py-16 ${theme === 'dark' ? 'bg-[#0F111A]' : 'bg-slate-100'}`}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 id="Frequently asked questions" className={`text-2xl md:text-4xl font-bold mb-4 ${theme === 'dark' 
                ? 'bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text'
                : 'bg-gradient-to-r from-slate-800 to-slate-600 text-transparent bg-clip-text'
              }`}>{t('faq.title')}</h2>
              <p className={theme === 'dark' ? 'text-[#E0E0E0]' : 'text-slate-600'}>
                {t('faq.subtitle')}
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-12">
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div 
                    key={index}
                    className={`${theme === 'dark' 
                      ? 'border-b border-white/10 last:border-b-0' 
                      : 'border-b border-slate-300 last:border-b-0'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left py-4 flex justify-between items-center focus:outline-none"
                    >
                      <span className={`font-medium ${theme === 'dark' 
                        ? 'text-white hover:text-[#3662e3]' 
                        : 'text-slate-800 hover:text-[#3662e3]'
                      }`}>{item.question}</span>
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform duration-200 ${
                          openFaq === index ? 'transform rotate-180' : ''
                        } ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`} 
                      />
                    </button>
                    
                    {openFaq === index && (
                      <div className={`pb-4 text-sm animate-accordion-down ${theme === 'dark' 
                        ? 'text-[#BBBBBB]' 
                        : 'text-slate-600'
                      }`}>
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        

      </main>
      <Footer />
    </>
  );
}