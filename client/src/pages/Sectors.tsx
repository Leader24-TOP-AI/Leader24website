import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { industries } from '@/data/industries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileMenu from '@/components/MobileMenu';
import { Zap, ArrowRight, Check } from 'lucide-react';

export default function Sectors() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return (
    <div className="min-h-screen bg-[#0A0A10] font-sans overflow-x-hidden">
      <Header />
      <MobileMenu />
      
      <section className="py-16 md:py-24 relative overflow-hidden bg-[#0A0A10]">
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#FF5722]/5 to-transparent"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex items-center justify-center mb-12">
            <Badge variant="outline" className="inline-flex items-center px-4 py-2 bg-[#FF5722]/20 text-sm font-medium text-white rounded-full border-[#FF5722]/20">
              <Zap className="w-5 h-5 mr-2 text-[#FF5722]" />
              Automazione Per Il Tuo Settore
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white">
            Soluzioni di automazione <br />specifiche per il tuo settore
          </h1>
          
          <p className="text-lg text-center text-[#E0E0E0] mb-12 max-w-3xl mx-auto">
            Scopri come Leader24 può trasformare le operazioni quotidiane nella tua industria con soluzioni di automazione personalizzate.
          </p>
          
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            {/* Sidebar with industry selection */}
            <div className="md:col-span-3">
              <div className="bg-[#111119] rounded-xl p-4 border border-white/10 sticky top-24">
                <h3 className="text-white font-medium mb-4 text-lg">Settori</h3>
                <div className="space-y-2">
                  {industries.map((industry, index) => (
                    <Button 
                      key={index}
                      variant={selectedIndustry.name === industry.name ? "default" : "ghost"}
                      className={`w-full justify-start ${selectedIndustry.name === industry.name ? 'bg-[#FF5722] hover:bg-[#FF5722]/90' : 'text-white/70 hover:text-white'}`}
                      onClick={() => setSelectedIndustry(industry)}
                    >
                      {industry.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="md:col-span-9">
              <Card className="bg-[#111119] border-white/10 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">
                    {selectedIndustry.name}
                  </CardTitle>
                  <CardDescription className="text-[#E0E0E0] text-lg">
                    {selectedIndustry.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-[#FF5722]/10 to-transparent p-6 rounded-lg mb-8">
                    <h3 className="text-xl mb-4 font-medium">Vantaggi per il settore {selectedIndustry.name}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedIndustry.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="rounded-full bg-[#FF5722]/20 p-1 mt-0.5">
                            <Check className="h-4 w-4 text-[#FF5722]" />
                          </div>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-[#1A1A27] p-6 border border-white/10">
                    <h3 className="text-xl mb-4 font-medium">Come funziona per {selectedIndustry.name}</h3>
                    <p className="text-[#E0E0E0] mb-4">
                      Le nostre soluzioni per il settore {selectedIndustry.name} sono progettate per affrontare le sfide specifiche che incontri ogni giorno. Leader24 integra le tue piattaforme esistenti e automatizza i flussi di lavoro ripetitivi, permettendoti di:
                    </p>
                    <ul className="space-y-2 text-[#E0E0E0] mb-6">
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-[#FF5722] min-w-[20px] mt-0.5" />
                        <span>Migliorare l'esperienza cliente con risposte immediate 24/7</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-[#FF5722] min-w-[20px] mt-0.5" />
                        <span>Ridurre il carico di lavoro manuale del tuo team</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <ArrowRight className="h-5 w-5 text-[#FF5722] min-w-[20px] mt-0.5" />
                        <span>Incrementare l'efficienza operativa con processi automatizzati</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-[#FF5722] hover:bg-[#FF5722]/90 text-white">
                    Richiedi una demo personalizzata
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#6200EA]/20 via-[#FF5722]/20 to-[#2196F3]/20 rounded-xl p-8 text-center max-w-5xl mx-auto border border-white/10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Non vedi il tuo settore?
            </h2>
            <p className="text-[#E0E0E0] mb-6 max-w-3xl mx-auto">
              Leader24 può essere personalizzato per qualsiasi settore. Contattaci per scoprire come possiamo aiutarti a ottimizzare i processi della tua azienda.
            </p>
            <Button size="lg" className="bg-white text-[#0A0A10] hover:bg-white/90">
              Contattaci
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}