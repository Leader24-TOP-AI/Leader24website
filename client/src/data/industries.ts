export interface Industry {
  name: string;
  description: string;
  icon: string;
  benefits: string[];
  nameKey?: string; // Chiave di traduzione per il nome
}

export const industries: Industry[] = [
  {
    name: "E-commerce",
    nameKey: "ecommerce",
    description: "Automatizza le risposte alle domande più frequenti e fornisci assistenza 24/7 ai tuoi clienti online.",
    icon: "shopping-cart",
    benefits: [
      "Gestione automatica degli ordini",
      "Tracciamento delle spedizioni",
      "Risposte immediate sulle politiche di reso",
      "Supporto clienti 24/7",
      "Riduzione dei tempi di attesa"
    ]
  },
  {
    name: "Assicurazioni",
    nameKey: "insurance",
    description: "Ottimizza la gestione delle richieste di assistenza e fornisci risposte immediate sulle polizze.",
    icon: "shield",
    benefits: [
      "Risposte immediate su coperture e franchigie",
      "Gestione automatizzata delle richieste",
      "Aggiornamenti in tempo reale sullo stato dei sinistri",
      "Supporto personalizzato ai clienti",
      "Verifica rapida delle condizioni di polizza"
    ]
  },
  {
    name: "Turismo",
    nameKey: "tourism",
    description: "Offri assistenza immediata per prenotazioni, modifiche e informazioni turistiche 24/7.",
    icon: "plane",
    benefits: [
      "Gestione automatica delle prenotazioni",
      "Risposte immediate a domande frequenti",
      "Assistenza multilingua",
      "Consigli personalizzati per i viaggiatori",
      "Aggiornamenti in tempo reale su disponibilità"
    ]
  },
  {
    name: "Immobiliare",
    nameKey: "realEstate",
    description: "Gestisci richieste di informazioni su immobili e organizza visite e appuntamenti automaticamente.",
    icon: "home",
    benefits: [
      "Qualificazione automatica dei lead",
      "Organizzazione degli appuntamenti",
      "Risposte immediate su disponibilità e caratteristiche",
      "Follow-up automatici post-visita",
      "Gestione efficiente delle richieste multiple"
    ]
  },
  {
    name: "Agenzie Marketing/Web",
    nameKey: "marketing",
    description: "Migliora l'efficienza del tuo team gestendo richieste dei clienti e supporto tecnico in modo automatico.",
    icon: "megaphone",
    benefits: [
      "Gestione delle richieste dei clienti",
      "Assegnazione automatica ai team corretti",
      "Risposte rapide alle domande tecniche comuni",
      "Monitoraggio avanzamento progetti",
      "Raccolta feedback in modo strutturato"
    ]
  },
  {
    name: "Automotive",
    nameKey: "automotive",
    description: "Fornisci assistenza per prenotazioni test drive, manutenzione e informazioni su veicoli nuovi e usati.",
    icon: "car",
    benefits: [
      "Prenotazione test drive automatizzata",
      "Gestione appuntamenti per manutenzione",
      "Aggiornamenti su disponibilità veicoli",
      "Assistenza post-vendita immediata",
      "Informazioni tecniche sui modelli disponibili"
    ]
  },
  {
    name: "Salute e Benessere",
    nameKey: "health",
    description: "Gestisci appuntamenti, rispondi a domande su trattamenti e servizi, e fornisci supporto ai pazienti.",
    icon: "heart-pulse",
    benefits: [
      "Prenotazione e modifica appuntamenti",
      "Risposta a domande sui servizi offerti",
      "Promemoria per visite e trattamenti",
      "Raccolta dati preliminari",
      "Follow-up post trattamento personalizzati"
    ]
  },
  {
    name: "Servizi IT",
    nameKey: "it",
    description: "Offri supporto tecnico immediato, gestisci ticket e fornisci soluzioni ai problemi più comuni.",
    icon: "code",
    benefits: [
      "Risposte immediate a problemi comuni",
      "Escalation automatica per casi complessi",
      "Raccolta informazioni diagnostiche",
      "Monitoraggio stato dei ticket",
      "Documentazione tecnica on-demand"
    ]
  },
  {
    name: "Educazione",
    nameKey: "education",
    description: "Fornisci supporto a studenti e genitori, gestisci iscrizioni e offri informazioni su corsi e programmi.",
    icon: "graduation-cap",
    benefits: [
      "Risposte immediate su offerta formativa",
      "Gestione delle iscrizioni e scadenze",
      "Supporto amministrativo 24/7",
      "Informazioni su eventi e attività",
      "Assistenza personalizzata per studenti e genitori"
    ]
  },
  {
    name: "Hospitality",
    nameKey: "hospitality",
    description: "Migliora l'esperienza degli ospiti con assistenza immediata per prenotazioni, servizi e informazioni.",
    icon: "hotel",
    benefits: [
      "Check-in/check-out semplificato",
      "Richieste di servizi in camera automatizzate",
      "Informazioni su strutture e orari",
      "Gestione prenotazioni ristorante",
      "Risposte immediate a richieste frequenti"
    ]
  },
  {
    name: "Finance",
    nameKey: "finance",
    description: "Assistenza per operazioni bancarie, investimenti e consulenza finanziaria in modo sicuro e immediato.",
    icon: "banknote",
    benefits: [
      "Informazioni su prodotti finanziari",
      "Assistenza per operazioni bancarie",
      "Verifica stato pratiche e richieste",
      "Notifiche personalizzate",
      "Protezione delle informazioni sensibili"
    ]
  },
  {
    name: "Servizi Professionali",
    nameKey: "professionalServices",
    description: "Supporto per consulenze, appuntamenti e gestione delle richieste dei clienti in modo efficiente.",
    icon: "briefcase",
    benefits: [
      "Prequalificazione automatica dei clienti",
      "Programmazione consulenze e appuntamenti",
      "Raccolta informazioni preliminari",
      "Follow-up strutturati post-consulenza",
      "Gestione efficiente del tempo"
    ]
  }
];
