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

  // qui altre rotte future…
  app.use("/api", api);

  // 3. http server
  const httpServer = createServer(app);
  return httpServer;
}
