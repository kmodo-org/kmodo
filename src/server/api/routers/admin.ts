import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { users, hackers, events, organizers, eventOrganizers } from "~/server/db/schema";
import { eq, and, type SQL } from "drizzle-orm";
import { allowedUserIds } from "~/consts/goat";
import { sql } from "drizzle-orm";

// Helper function to check if user is an admin
const isAdmin = (userId: string) => {
  return allowedUserIds.has(userId);
};

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

      try {
        // Begin transaction
        await db.transaction(async (tx) => {
          // First delete organizer applications for this event 
          // This table isn't defined in our schema but exists in the database
          await tx.execute(
            sql`DELETE FROM "kmodo_organizer_application" WHERE "event_id" = ${id}`
          );

          // Find organizers for this event first to handle the relationship
          const eventOrgs = await tx
            .select()
            .from(organizers)
            .where(eq(organizers.event_id, id));

          // Delete organizer records for this event
          if (eventOrgs.length > 0) {
            for (const org of eventOrgs) {
              // Delete from eventOrganizers junction table
              await tx
                .delete(eventOrganizers)
                .where(
                  and(
                    eq(eventOrganizers.event_id, id),
                    eq(eventOrganizers.organizer_id, org.id)
                  )
                );

              // Then delete the organizer record
              await tx
                .delete(organizers)
                .where(eq(organizers.id, org.id));
            }
          }

          // Finally delete the event itself
          await tx.delete(events).where(eq(events.id, id));
        });

        return { success: true };
      } catch (error) {
        console.error("Error deleting event:", error);
        throw new Error(`Failed to delete event: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
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
      
      if (!newOrganizer?.id) {
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
      
      if (!organizer?.id) {
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