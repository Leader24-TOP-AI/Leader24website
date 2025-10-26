import express, { Router, type Express } from "express";
import { createServer, type Server } from "http";
import path from "path";

import { storage } from "./storage";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // 1. file statici
  app.use("/locales", express.static(path.join(process.cwd(), "public", "locales")));

  // 2. router /api
  const api = Router();

  api.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // Contact form submission
  api.post("/contact", async (req, res) => {
    try {
      const { name, email, phone, company, sector, message } = req.body;

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({
          error: "Missing required fields: name, email, message"
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Invalid email format"
        });
      }

      // Save to database
      const contact = await storage.createContactSubmission({
        name,
        email,
        phone: phone || null,
        company: company || null,
        sector: sector || null,
        message
      });

      log(`New contact submission from ${email}`);

      res.json({
        success: true,
        message: "Contact form submitted successfully",
        id: contact.id
      });
    } catch (error) {
      log(`Error saving contact: ${error}`);
      res.status(500).json({
        error: "Failed to submit contact form"
      });
    }
  });

  // qui altre rotte future…
  app.use("/api", api);

  // 3. http server
  const httpServer = createServer(app);
  return httpServer;
}
