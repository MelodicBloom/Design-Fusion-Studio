import { type User, type InsertUser, type Purchase, type InsertPurchase, users, purchases } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createPurchase(purchase: InsertPurchase): Promise<Purchase>;
  getPurchasesBySession(sessionId: string): Promise<Purchase[]>;
  hasPurchase(sessionId: string, layoutId: string): Promise<boolean>;
}

const db = drizzle(process.env.DATABASE_URL!, { schema });

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createPurchase(insertPurchase: InsertPurchase): Promise<Purchase> {
    const [purchase] = await db.insert(purchases).values(insertPurchase).returning();
    return purchase;
  }

  async getPurchasesBySession(sessionId: string): Promise<Purchase[]> {
    return db.select().from(purchases).where(eq(purchases.sessionId, sessionId));
  }

  async hasPurchase(sessionId: string, layoutId: string): Promise<boolean> {
    const [result] = await db
      .select()
      .from(purchases)
      .where(and(eq(purchases.sessionId, sessionId), eq(purchases.layoutId, layoutId)));
    return !!result;
  }
}

export const storage = new DatabaseStorage();
