import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { contactSubmissions, type InsertContact } from '../shared/schema';
import { z } from 'zod';
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const resend = new Resend(process.env.RESEND_API_KEY);

// Configurazione database
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// Schema per validazione del body della richiesta
const contactRequestSchema = z.object({
  name: z.string().min(1, 'Nome è obbligatorio'),
  email: z.string().email('Email non valida'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(1, 'Messaggio è obbligatorio'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Permetti solo richieste POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    // Valida i dati della richiesta
    const validatedData = contactRequestSchema.parse(req.body);
    
    // Prepara i dati per il database
    const contactData: InsertContact = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || null,
      company: validatedData.company || null,
      message: validatedData.message,
    };

    // Salva nel database
    const [savedContact] = await db
      .insert(contactSubmissions)
      .values(contactData)
      .returning();

    // Invia email di notifica agli amministratori
    await resend.emails.send({
      from: 'Leader24 <noreply@leader24.ai>',
      to: ['info@leader24.ai'], // Sostituisci con l'email dell'amministratore
      subject: `Nuovo messaggio di contatto da ${validatedData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3662e3;">Nuovo Messaggio di Contatto</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nome:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            ${validatedData.phone ? `<p><strong>Telefono:</strong> ${validatedData.phone}</p>` : ''}
            ${validatedData.company ? `<p><strong>Azienda:</strong> ${validatedData.company}</p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #3662e3; margin: 20px 0;">
            <h3>Messaggio:</h3>
            <p style="white-space: pre-wrap;">${validatedData.message}</p>
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
      to: [validatedData.email],
      subject: 'Grazie per averci contattato - Leader24',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3662e3;">Grazie per averci contattato!</h2>
          
          <p>Ciao ${validatedData.name},</p>
          
          <p>Abbiamo ricevuto il tuo messaggio e ti risponderemo entro 24 ore.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Riepilogo del tuo messaggio:</h3>
            <p style="white-space: pre-wrap;">${validatedData.message}</p>
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

    // Risposta di successo
    res.status(200).json({
      success: true,
      message: 'Messaggio inviato con successo',
      id: savedContact.id,
    });

  } catch (error) {
    console.error('Errore invio contatto:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dati non validi',
        details: error.errors,
      });
    }

    res.status(500).json({
      error: 'Errore interno del server',
      message: 'Si è verificato un errore durante l\'invio del messaggio',
    });
  }
}