# Leader24 Website

Leader24 è una piattaforma di automazione AI per LiveChat e WhatsApp aziendali che trasforma le interazioni con i clienti attraverso l'intelligenza artificiale.

## 🚀 Tecnologie

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL con Drizzle ORM
- **Internazionalizzazione**: i18next (IT/EN)
- **Autenticazione**: Passport.js
- **AI Integration**: OpenAI API, N8N Chat

## 📋 Prerequisiti

- Node.js v18+ 
- npm o yarn
- PostgreSQL database
- Variabili d'ambiente (vedere `.env.example`)

## 🛠️ Installazione

1. Clona il repository
```bash
git clone https://github.com/Leader24-TOP-AI/Leader24website.git
cd Leader24website
```

2. Installa le dipendenze
```bash
npm install
```

3. Configura le variabili d'ambiente
```bash
cp .env.example .env
# Modifica .env con le tue configurazioni
```

4. Configura il database
```bash
npm run db:push
```

## 🚀 Avvio

### Sviluppo
```bash
npm run dev
```
L'applicazione sarà disponibile su `http://localhost:8080`

### Produzione
```bash
npm run build
npm run start
```

## 📁 Struttura del Progetto

```
Leader24website/
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Componenti UI riutilizzabili
│   │   ├── pages/        # Pagine dell'applicazione
│   │   ├── data/         # Dati statici
│   │   └── lib/          # Utilities e configurazioni
├── server/               # Backend Express
│   ├── index.ts          # Entry point del server
│   ├── routes.ts         # Definizione delle API routes
│   └── db.ts             # Configurazione database
├── shared/               # Codice condiviso (schemas)
└── public/
    └── locales/          # File di traduzione i18n
```

## 🌐 Funzionalità Principali

- **Multi-lingua**: Supporto completo per italiano e inglese
- **Dark/Light Mode**: Tema personalizzabile con persistenza
- **Settori Specifici**: Soluzioni dedicate per E-commerce, Sanità, Real Estate, etc.
- **AI Chat Integration**: Integrazione con chatbot AI per supporto clienti 24/7
- **Responsive Design**: Ottimizzato per desktop e mobile

## 🔧 Script Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Build di produzione
- `npm run start` - Avvia il server di produzione
- `npm run check` - Type checking con TypeScript
- `npm run db:push` - Aggiorna lo schema del database

## 🤝 Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push del branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza

Questo progetto è proprietario di Leader24. Tutti i diritti riservati.

## 📞 Contatti

- Website: [https://leader24.it](https://leader24.it)
- Email: info@leader24.it

---

Built with ❤️ by Leader24 Team