import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { users, hackers, events, organizers, eventOrganizers } from "~/server/db/schema";
import { eq, and, type SQL } from "drizzle-orm";
import { allowedUserIds } from "~/consts/goat";

// Helper function to check if user is an admin
const isAdmin = (userId: string) => {
  return allowedUserIds.has(userId);
};

// Define some types to help with type safety
type Organizer = typeof organizers.$inferSelect;

export const adminRouter = createTRPCRouter({
  // Get all users
  getAllUsers: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { search } = input;
      
      let whereClause: SQL | undefined;
      if (search) {
        whereClause = eq(users.name, search);
      }
      
      return await db.query.users.findMany({
        where: whereClause,
      });
    }),
    
  // Get all hackers
  getAllHackers: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { search } = input;
      
      let whereClause: SQL | undefined;
      if (search) {
        whereClause = eq(hackers.firstname, search);
      }
      
      return await db.query.hackers.findMany({
        where: whereClause,
      });
    }),
    
  // Get all events
  getAllEvents: protectedProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { search } = input;
      
      let whereClause: SQL | undefined;
      if (search) {
        whereClause = eq(events.name, search);
      }
      
      return await db.query.events.findMany({
        where: whereClause,
      });
    }),
    
  // Delete an event
  deleteEvent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { id } = input;
      
      await db.delete(events).where(eq(events.id, id));
      
      return { success: true };
    }),
    
  // Make a user an organizer for an event
  makeOrganizer: protectedProcedure
    .input(z.object({ 
      hackerId: z.number(),
      eventId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { hackerId, eventId } = input;
      
      // Check if organizer already exists
      const existingOrganizers = await db
        .select()
        .from(organizers)
        .where(
          and(
            eq(organizers.hacker_id, hackerId),
            eq(organizers.event_id, eventId)
          )
        );
        
      if (existingOrganizers.length > 0) {
        throw new Error("Organizer already exists for this event");
      }
      
      // Create new organizer
      const newOrganizerResult = await db
        .insert(organizers)
        .values({
          hacker_id: hackerId,
          event_id: eventId,
        })
        .returning();
      
      if (!newOrganizerResult || newOrganizerResult.length === 0) {
        throw new Error("Failed to create organizer");
      }
      
      // Safely access the first item
      const newOrganizer = newOrganizerResult[0];
      
      if (!newOrganizer || !newOrganizer.id) {
        throw new Error("Failed to get organizer ID");
      }
        
      // Add to event organizers
      await db
        .insert(eventOrganizers)
        .values({
          event_id: eventId,
          organizer_id: newOrganizer.id,
        });
        
      return { success: true, organizer: newOrganizer };
    }),
    
  // Remove an organizer from an event
  removeOrganizer: protectedProcedure
    .input(z.object({ 
      hackerId: z.number(),
      eventId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { hackerId, eventId } = input;
      
      // Find the organizer
      const organizers_found = await db
        .select()
        .from(organizers)
        .where(
          and(
            eq(organizers.hacker_id, hackerId),
            eq(organizers.event_id, eventId)
          )
        );
        
      if (!organizers_found || organizers_found.length === 0) {
        throw new Error("Organizer not found for this event");
      }
      
      const organizer = organizers_found[0];
      
      if (!organizer || !organizer.id) {
        throw new Error("Invalid organizer record");
      }
      
      // Remove from event organizers
      await db
        .delete(eventOrganizers)
        .where(
          and(
            eq(eventOrganizers.event_id, eventId),
            eq(eventOrganizers.organizer_id, organizer.id)
          )
        );
        
      // Delete the organizer
      await db
        .delete(organizers)
        .where(eq(organizers.id, organizer.id));
        
      return { success: true };
    }),
    
  // Delete a user and all associated data
  deleteUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { userId } = input;
      
      // Delete the user (this will cascade delete related records due to the onDelete: "cascade" setting)
      await db.delete(users).where(eq(users.id, userId));
        
      return { success: true };
    }),
}); 