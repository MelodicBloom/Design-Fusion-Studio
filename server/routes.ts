import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPurchaseSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/purchases", async (req, res) => {
    try {
      const sessionId = req.body.sessionId;
      const layoutId = req.body.layoutId;

      if (!sessionId || !layoutId) {
        return res.status(400).json({ message: "sessionId and layoutId are required" });
      }

      const already = await storage.hasPurchase(sessionId, layoutId);
      if (already) {
        return res.status(200).json({ message: "Already purchased", unlocked: true });
      }

      const purchase = await storage.createPurchase({ sessionId, layoutId });
      return res.status(201).json({ purchase, unlocked: true });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/purchases/:sessionId", async (req, res) => {
    try {
      const purchases = await storage.getPurchasesBySession(req.params.sessionId);
      const unlockedIds = purchases.map(p => p.layoutId);
      return res.json({ unlockedIds });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/purchases/:sessionId/:layoutId", async (req, res) => {
    try {
      const unlocked = await storage.hasPurchase(req.params.sessionId, req.params.layoutId);
      return res.json({ unlocked });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}
