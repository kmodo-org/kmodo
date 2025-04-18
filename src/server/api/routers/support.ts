import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { supportTickets } from "~/server/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { allowedUserIds } from "~/consts/goat";

// Helper function to check if user is an admin
const isAdmin = (userId: string) => {
  return allowedUserIds.has(userId);
};

export const supportRouter = createTRPCRouter({
  // Create a new support ticket
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      type: z.enum(["organizer", "hacker"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const { title, description, type } = input;
      
      const ticket = await db.insert(supportTickets)
        .values({
          title,
          description,
          type,
          status: "open",
          userId: ctx.session.user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
        
      return ticket[0];
    }),

  // Get all tickets (admin only)
  getAll: protectedProcedure
    .input(z.object({
      status: z.enum(["open", "in_progress", "closed"]).optional(),
      type: z.enum(["organizer", "hacker"]).optional(),
      search: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const conditions = [];
      
      if (input.status) {
        conditions.push(eq(supportTickets.status, input.status));
      }
      
      if (input.type) {
        conditions.push(eq(supportTickets.type, input.type));
      }
      
      const query = db.select()
        .from(supportTickets)
        .orderBy(desc(supportTickets.createdAt));
      
      return conditions.length > 0
        ? await query.where(and(...conditions))
        : await query;
    }),

  // Get user's tickets
  getUserTickets: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.select()
        .from(supportTickets)
        .where(eq(supportTickets.userId, ctx.session.user.id))
        .orderBy(desc(supportTickets.createdAt));
    }),

  // Update ticket status (admin only)
  updateStatus: protectedProcedure
    .input(z.object({
      ticketId: z.number(),
      status: z.enum(["open", "in_progress", "closed"]),
      adminResponse: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { ticketId, status, adminResponse } = input;
      
      const ticket = await db.update(supportTickets)
        .set({
          status,
          adminResponse,
          updatedAt: new Date(),
        })
        .where(eq(supportTickets.id, ticketId))
        .returning();
        
      return ticket[0];
    }),

  // Delete ticket (admin only)
  delete: protectedProcedure
    .input(z.object({
      ticketId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      await db.delete(supportTickets)
        .where(eq(supportTickets.id, input.ticketId));
        
      return { success: true };
    }),
});
