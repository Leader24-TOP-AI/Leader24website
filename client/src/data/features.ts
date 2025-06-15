import {
  MessageSquare,
  Layers,
  Clock,
  Globe,
  CalendarDays,
  Settings
} from 'lucide-react';

// Define feature type with iconName instead of direct JSX
export type Feature = {
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
};

export const features: Feature[] = [
  {
    iconName: "MessageSquare",
    title: "Risposte Automatizzate",
    subtitle: "Risposte naturali e informate grazie all'AI",
    description: "Leader24 utilizza un'AI avanzata per rispondere ai messaggi in modo naturale, conoscendo i tuoi servizi e garantendo risposte precise."
  },
  {
    iconName: "Layers",
    title: "Integrazione Multi-Canale",
    subtitle: "Connettiti ovunque siano i tuoi clienti",
    description: "Supporta la comunicazione su diverse piattaforme, come il sito web e WhatsApp, per un servizio clienti sempre disponibile."
  },
  {
    iconName: "Clock",
    title: "Disponibilità Continua",
    subtitle: "Sempre a disposizione dei tuoi clienti",
    description: "Leader24 garantisce una presenza costante, rispondendo alle richieste dei clienti 24 ore su 24, 7 giorni su 7."
  },
  {
    iconName: "Globe",
    title: "Supporto Multilingua",
    subtitle: "Comunica con clienti da tutto il mondo",
    description: "Leader24 gestisce richieste in diverse lingue, offrendo un'esperienza cliente senza barriere linguistiche o culturali."
  },
  {
    iconName: "CalendarDays",
    title: "Gestione Appuntamenti",
    subtitle: "Organizza e ottimizza il tuo tempo",
    description: "Automatizza la gestione degli appuntamenti, riducendo i tempi di attesa e migliorando la tua efficienza operativa."
  },
  {
    iconName: "Settings",
    title: "Facilità d'Uso",
    subtitle: "Installazione semplice, gestione senza stress",
    description: "Leader24 è facile da configurare e usare, permettendoti di concentrarti sul business senza preoccupazioni tecniche."
  }
];
