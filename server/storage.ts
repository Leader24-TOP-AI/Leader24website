import { 
  users, type User, type InsertUser,
  contactSubmissions, type Contact, type InsertContact,
  subscribers, type Subscriber, type InsertSubscriber,
  testimonials, type Testimonial, type InsertTestimonial
} from "@shared/schema";
import { eq } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form operations
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmissions(): Promise<Contact[]>;
  markContactProcessed(id: number): Promise<boolean>;
  
  // Newsletter subscriber operations
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscribers(activeOnly?: boolean): Promise<Subscriber[]>;
  unsubscribe(email: string): Promise<boolean>;
  
  // Testimonial operations
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  getTestimonials(publishedOnly?: boolean): Promise<Testimonial[]>;
  updateTestimonial(id: number, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Contact form operations
  async createContactSubmission(contact: InsertContact): Promise<Contact> {
    const [result] = await db
      .insert(contactSubmissions)
      .values(contact)
      .returning();
    return result;
  }
  
  async getContactSubmissions(): Promise<Contact[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(contactSubmissions.createdAt);
  }
  
  async markContactProcessed(id: number): Promise<boolean> {
    const result = await db
      .update(contactSubmissions)
      .set({ isProcessed: true })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Newsletter subscriber operations
  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const [result] = await db
      .insert(subscribers)
      .values(subscriber)
      .returning();
    return result;
  }
  
  async getSubscribers(activeOnly: boolean = true): Promise<Subscriber[]> {
    if (activeOnly) {
      return await db
        .select()
        .from(subscribers)
        .where(eq(subscribers.isActive, true))
        .orderBy(subscribers.subscriptionDate);
    } else {
      return await db
        .select()
        .from(subscribers)
        .orderBy(subscribers.subscriptionDate);
    }
  }
  
  async unsubscribe(email: string): Promise<boolean> {
    const result = await db
      .update(subscribers)
      .set({ isActive: false })
      .where(eq(subscribers.email, email))
      .returning();
    return result.length > 0;
  }
  
  // Testimonial operations
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [result] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return result;
  }
  
  async getTestimonials(publishedOnly: boolean = true): Promise<Testimonial[]> {
    if (publishedOnly) {
      return await db
        .select()
        .from(testimonials)
        .where(eq(testimonials.isPublished, true))
        .orderBy(testimonials.orderIndex);
    } else {
      return await db
        .select()
        .from(testimonials)
        .orderBy(testimonials.orderIndex);
    }
  }
  
  async updateTestimonial(id: number, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [result] = await db
      .update(testimonials)
      .set(data)
      .where(eq(testimonials.id, id))
      .returning();
    return result;
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    const result = await db
      .delete(testimonials)
      .where(eq(testimonials.id, id))
      .returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
