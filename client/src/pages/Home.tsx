import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Sectors from "@/components/Sectors";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { useLocation } from "wouter";

export default function Home() {
  const [location] = useLocation();

  // Scroll to section if hash is present in URL
  useEffect(() => {
    // Funzione base per scorrere all'elemento con un particolare ID
    const scrollToElementById = (id: string) => {
      console.log(`Tentativo di scorrere all'elemento con ID: ${id}`);
      const element = document.getElementById(id);
      if (element) {
        console.log(`Elemento ${id} trovato, scrolling...`);
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log(`Elemento con ID ${id} non trovato`);
      }
    };

    if (location.includes('#')) {
      const id = location.split('#')[1];
      
      // Aggiunta di timeout per assicurarsi che il DOM sia completamente caricato
      setTimeout(() => {
        scrollToElementById(id);
      }, 500); // Aumento del timeout per garantire il caricamento completo
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#0A0A10] font-sans overflow-x-hidden">
      <Header />
      <MobileMenu />
      <Hero />
      <Introduction />
      <Features />
      <Testimonials />
      <Sectors />
      <CTABanner />
      <Footer />
    </div>
  );
}
