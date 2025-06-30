import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

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

    // Inizializza Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Invia email di notifica agli amministratori
    await resend.emails.send({
      from: 'Leader24 <noreply@leader24.ai>',
      to: ['info@leader24.ai'],
      subject: `Nuovo messaggio di contatto da ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3662e3;">Nuovo Messaggio di Contatto</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Azienda:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #3662e3; margin: 20px 0;">
            <h3>Messaggio:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666; font-size: 12px;">
            Ricevuto il ${new Date().toLocaleString('it-IT')}
          </p>
        </div>
      `,
    });

    // Invia email di conferma all'utente
    await resend.emails.send({
      from: 'Leader24 <noreply@leader24.ai>',
      to: [email],
      subject: 'Grazie per averci contattato - Leader24',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3662e3;">Grazie per averci contattato!</h2>
          
          <p>Ciao ${name},</p>
          
          <p>Abbiamo ricevuto il tuo messaggio e ti risponderemo entro 24 ore.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Riepilogo del tuo messaggio:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>Nel frattempo, puoi esplorare le nostre soluzioni sul nostro sito web.</p>
          
          <p>Cordiali saluti,<br>
          Il team di Leader24</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Questo è un messaggio automatico, non rispondere a questa email.
          </p>
        </div>
      `,
    });

    console.log('Email inviate con successo per:', { name, email });

    // Risposta di successo
    return res.status(200).json({
      success: true,
      message: 'Messaggio inviato con successo! Controlla la tua email per la conferma.',
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