# Deployment su DigitalOcean App Platform

## Prerequisiti

1. Account DigitalOcean
2. Repository GitHub con il codice
3. Database PostgreSQL (Neon o DigitalOcean Managed Database)

## Steps per il Deployment

### 1. Preparare il Repository GitHub

Assicurati che tutti i file siano committati e pushati su GitHub:

```bash
git add .
git commit -m "Prepare for DigitalOcean deployment"
git push origin main
```

### 2. Creare l'App su DigitalOcean

#### Opzione A: Deploy con Button (Raccomandato)

1. Vai su [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
2. Clicca su "Create App"
3. Seleziona "GitHub" come source
4. Autorizza DigitalOcean ad accedere al tuo repository
5. Seleziona il repository e il branch `main`
6. DigitalOcean rileverà automaticamente il file `.do/deploy.template.yaml`

#### Opzione B: Deploy Manuale

Se preferisci configurare manualmente:

1. Vai su App Platform e crea una nuova app
2. Configura come segue:
   - **Service Type**: Web Service
   - **Environment**: Node.js
   - **Build Command**: `npm install && npm run build`
   - **Run Command**: `npm start`
   - **HTTP Port**: 8080
   - **Instance Size**: Basic XXS (512 MB RAM, 1 vCPU)

### 3. Configurare le Variabili d'Ambiente

Aggiungi le seguenti variabili d'ambiente nell'App Platform:

| Variable | Type | Value | Required |
|----------|------|-------|----------|
| NODE_ENV | Plain | production | ✅ |
| DATABASE_URL | Secret | postgresql://... | ✅ |
| SESSION_SECRET | Secret | (genera una stringa casuale) | ✅ |
| PORT | Plain | 8080 | ✅ |
| OPENAI_API_KEY | Secret | sk-... | ⚠️ (se usi OpenAI) |
| SENDGRID_API_KEY | Secret | SG... | ⚠️ (se usi SendGrid) |

### 4. Database Setup

#### Se usi Neon:
- Usa il connection string dal tuo dashboard Neon
- Assicurati che il database sia accessibile da internet

#### Se usi DigitalOcean Database:
1. Crea un nuovo PostgreSQL cluster
2. Aggiungi l'app ai trusted sources
3. Usa il connection string fornito

### 5. Configurare il Dominio

1. Nelle impostazioni dell'app, vai su "Domains"
2. Aggiungi il dominio `leader24.ai`
3. Configura i DNS:
   - **CNAME Record**: `www` → `your-app.ondigitalocean.app`
   - **A Record**: `@` → IP fornito da DigitalOcean

### 6. Post-Deployment

Dopo il primo deployment:

1. Verifica che l'app sia raggiungibile
2. Testa tutte le funzionalità principali
3. Controlla i logs per eventuali errori
4. Abilita "Auto-deploy" per deployments automatici

## Comandi Utili

### Build Locale per Test
```bash
npm run build
NODE_ENV=production npm start
```

### Verificare le Variabili d'Ambiente
```bash
node -e "console.log(process.env.DATABASE_URL ? 'DB OK' : 'DB Missing')"
```

### Logs
Puoi vedere i logs dell'app dal dashboard DigitalOcean o usando il CLI:
```bash
doctl apps logs YOUR_APP_ID
```

## Troubleshooting

### L'app non si avvia
- Controlla i logs per errori
- Verifica che tutte le variabili d'ambiente siano configurate
- Assicurati che il database sia accessibile

### Errori di build
- Verifica che `package.json` abbia tutti i dependencies
- Controlla che Node.js version sia 20.x

### Problemi di connessione al database
- Verifica il connection string
- Controlla che il database accetti connessioni dall'app
- Se usi SSL, aggiungi `?sslmode=require` al connection string

## Costi Stimati

- **App Platform Basic**: ~$5/mese
- **Database** (se usi DigitalOcean): ~$15/mese
- **Totale**: ~$20/mese per un'app base

## Supporto

Per problemi specifici con DigitalOcean App Platform, consulta:
- [Documentazione DigitalOcean](https://docs.digitalocean.com/products/app-platform/)
- [Community DigitalOcean](https://www.digitalocean.com/community)