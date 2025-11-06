/**
 * Metadata Configuration for SEO and Social Media
 * Generates dynamic meta tags based on page content
 */

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

export interface MetadataConfig {
  [key: string]: {
    it: PageMetadata;
    en: PageMetadata;
  };
}

const defaultOgImage = "https://leader24.ai/og-image.jpg";
const siteName = "Leader24";
const baseUrl = "https://leader24.ai";

export const metadata: MetadataConfig = {
  home: {
    it: {
      title: "Leader24 - Automazioni AI per LiveChat e WhatsApp Aziendali",
      description: "Leader24 trasforma WhatsApp nel tuo assistente clienti personale grazie all'intelligenza artificiale, rispondendo automaticamente ai messaggi 24/7.",
      keywords: "automazione whatsapp, AI chatbot, assistente virtuale, customer service automatico, intelligenza artificiale, whatsapp business",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: baseUrl
    },
    en: {
      title: "Leader24 - AI Automation for LiveChat and Business WhatsApp",
      description: "Leader24 transforms WhatsApp into your personal customer assistant using artificial intelligence, automatically responding to messages 24/7.",
      keywords: "whatsapp automation, AI chatbot, virtual assistant, automated customer service, artificial intelligence, whatsapp business",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/en`
    }
  },
  sectors: {
    it: {
      title: "Settori e Industrie - Automazione AI per Ogni Business | Leader24",
      description: "Scopri come Leader24 può automatizzare il customer service del tuo settore: E-commerce, Assicurazioni, Turismo, Immobiliare, Marketing e molti altri.",
      keywords: "automazione settori, AI per ecommerce, chatbot assicurazioni, turismo digitale, immobiliare AI, marketing automation",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/settori`
    },
    en: {
      title: "Industries & Sectors - AI Automation for Every Business | Leader24",
      description: "Discover how Leader24 can automate customer service for your industry: E-commerce, Insurance, Tourism, Real Estate, Marketing and many more.",
      keywords: "industry automation, AI for ecommerce, insurance chatbot, digital tourism, real estate AI, marketing automation",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/en/industries`
    }
  },
  ecommerce: {
    it: {
      title: "Automazione AI per E-commerce - Assistenza Clienti 24/7 | Leader24",
      description: "Automatizza le risposte alle domande più frequenti, gestisci ordini e tracciamenti, fornisci assistenza 24/7 ai tuoi clienti e-commerce con Leader24.",
      keywords: "ecommerce automation, chatbot ecommerce, assistenza clienti online, ordini automatici, tracciamento spedizioni",
      ogImage: defaultOgImage,
      ogType: "article",
      canonical: `${baseUrl}/settori/ecommerce`
    },
    en: {
      title: "AI Automation for E-commerce - 24/7 Customer Support | Leader24",
      description: "Automate responses to FAQs, manage orders and tracking, provide 24/7 support to your e-commerce customers with Leader24.",
      keywords: "ecommerce automation, ecommerce chatbot, online customer support, automated orders, shipping tracking",
      ogImage: defaultOgImage,
      ogType: "article",
      canonical: `${baseUrl}/en/industries/ecommerce`
    }
  },
  contacts: {
    it: {
      title: "Contattaci - Richiedi una Demo Gratuita | Leader24",
      description: "Richiedi una demo gratuita di Leader24 e scopri come automatizzare il customer service della tua azienda con l'intelligenza artificiale.",
      keywords: "contatti leader24, demo gratuita, richiesta informazioni, consulenza AI, automazione whatsapp",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/contatti`
    },
    en: {
      title: "Contact Us - Request a Free Demo | Leader24",
      description: "Request a free demo of Leader24 and discover how to automate your company's customer service with artificial intelligence.",
      keywords: "leader24 contact, free demo, request information, AI consulting, whatsapp automation",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/en/contact-us`
    }
  },
  caseStudies: {
    it: {
      title: "Casi Studio - Risultati Reali con Leader24 | Success Stories",
      description: "Scopri i casi di successo delle aziende che hanno automatizzato il customer service con Leader24: risultati concreti e ROI misurabili.",
      keywords: "casi studio, success stories, risultati leader24, testimonianze clienti, ROI automazione",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/casi-studio`
    },
    en: {
      title: "Case Studies - Real Results with Leader24 | Success Stories",
      description: "Discover the success stories of companies that automated customer service with Leader24: concrete results and measurable ROI.",
      keywords: "case studies, success stories, leader24 results, customer testimonials, automation ROI",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/en/case-studies`
    }
  },
  privacy: {
    it: {
      title: "Informativa Privacy - Leader24",
      description: "Informativa sulla privacy e protezione dei dati personali di Leader24. Scopri come trattiamo e proteggiamo le tue informazioni.",
      keywords: "privacy policy, protezione dati, GDPR, informativa privacy",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/informativa-privacy`
    },
    en: {
      title: "Privacy Policy - Leader24",
      description: "Privacy policy and personal data protection of Leader24. Discover how we process and protect your information.",
      keywords: "privacy policy, data protection, GDPR, privacy information",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/en/privacy`
    }
  },
  cookie: {
    it: {
      title: "Informativa Cookie - Leader24",
      description: "Informativa sull'utilizzo dei cookie da parte di Leader24. Scopri quali cookie utilizziamo e come gestirli.",
      keywords: "cookie policy, gestione cookie, privacy cookie",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/informativa-cookie`
    },
    en: {
      title: "Cookie Policy - Leader24",
      description: "Information on the use of cookies by Leader24. Discover which cookies we use and how to manage them.",
      keywords: "cookie policy, cookie management, cookie privacy",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/en/cookie`
    }
  },
  terms: {
    it: {
      title: "Termini di Servizio - Leader24",
      description: "Termini e condizioni di utilizzo dei servizi Leader24. Leggi le regole e le condizioni per l'uso della nostra piattaforma.",
      keywords: "termini servizio, condizioni utilizzo, contratto servizio",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/termini-di-servizio`
    },
    en: {
      title: "Terms of Service - Leader24",
      description: "Terms and conditions for using Leader24 services. Read the rules and conditions for using our platform.",
      keywords: "terms of service, conditions of use, service contract",
      ogImage: defaultOgImage,
      ogType: "website",
      canonical: `${baseUrl}/en/terms-of-service`
    }
  }
};

/**
 * Get metadata for a specific page and language
 */
export function getMetadata(page: string, lang: 'it' | 'en' = 'it'): PageMetadata {
  const pageMetadata = metadata[page];

  if (!pageMetadata) {
    // Fallback to home metadata if page not found
    return metadata.home[lang];
  }

  return pageMetadata[lang];
}

/**
 * Generate dynamic metadata for industry-specific pages
 */
export function getIndustryMetadata(industryKey: string, lang: 'it' | 'en' = 'it'): PageMetadata {
  const industryNames: Record<string, { it: string; en: string }> = {
    ecommerce: { it: "E-commerce", en: "E-commerce" },
    insurance: { it: "Assicurazioni", en: "Insurance" },
    tourism: { it: "Turismo", en: "Tourism" },
    realEstate: { it: "Immobiliare", en: "Real Estate" },
    marketing: { it: "Marketing", en: "Marketing" },
    automotive: { it: "Automotive", en: "Automotive" },
    healthcare: { it: "Sanità", en: "Healthcare" },
    education: { it: "Formazione", en: "Education" },
    food: { it: "Food & Beverage", en: "Food & Beverage" },
    finance: { it: "Finanza", en: "Finance" }
  };

  const name = industryNames[industryKey] || { it: "Settore", en: "Industry" };

  if (lang === 'it') {
    return {
      title: `Automazione AI per ${name.it} - Customer Service 24/7 | Leader24`,
      description: `Scopri come Leader24 può automatizzare il customer service del settore ${name.it} con intelligenza artificiale: assistenza 24/7, risposte automatiche e gestione clienti ottimizzata.`,
      keywords: `automazione ${name.it.toLowerCase()}, AI ${name.it.toLowerCase()}, chatbot ${name.it.toLowerCase()}, customer service ${name.it.toLowerCase()}`,
      ogImage: defaultOgImage,
      ogType: "article",
      canonical: `${baseUrl}/settori#${industryKey}`
    };
  } else {
    return {
      title: `AI Automation for ${name.en} - 24/7 Customer Service | Leader24`,
      description: `Discover how Leader24 can automate customer service for the ${name.en} industry with artificial intelligence: 24/7 support, automated responses and optimized customer management.`,
      keywords: `${name.en.toLowerCase()} automation, AI ${name.en.toLowerCase()}, ${name.en.toLowerCase()} chatbot, ${name.en.toLowerCase()} customer service`,
      ogImage: defaultOgImage,
      ogType: "article",
      canonical: `${baseUrl}/en/industries#${industryKey}`
    };
  }
}
