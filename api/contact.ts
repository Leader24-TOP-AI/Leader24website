import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Aggiungi CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Gestisci preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Permetti solo richieste POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    // Validazione base
    const { name, email, message, phone, company } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Campi obbligatori mancanti',
        message: 'Nome, email e messaggio sono obbligatori'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Email non valida',
        message: 'Inserisci un indirizzo email valido'
      });
    }

    // Per ora simuliamo il successo (database e email disabilitati temporaneamente)
    console.log('Contatto ricevuto:', { name, email, message, phone, company });

    // Risposta di successo
    return res.status(200).json({
      success: true,
      message: 'Messaggio ricevuto con successo',
      data: { name, email }
    });

  } catch (error) {
    console.error('Errore API contact:', error);
    
    return res.status(500).json({
      error: 'Errore interno del server',
      message: 'Si è verificato un errore durante l\'elaborazione della richiesta',
      details: error instanceof Error ? error.message : 'Errore sconosciuto'
    });
  }
}