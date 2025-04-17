import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { users, hackers, events, organizers, eventOrganizers, organizerApplications } from "~/server/db/schema";
import { eq, and, type SQL, desc } from "drizzle-orm";
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

          // Find organizers for this event in the event_organizers junction table
          const eventOrganizerEntries = await tx
            .select()
            .from(eventOrganizers)
            .where(eq(eventOrganizers.event_id, id));

          // Delete entries from event_organizers junction table
          if (eventOrganizerEntries.length > 0) {
            await tx
              .delete(eventOrganizers)
              .where(eq(eventOrganizers.event_id, id));
            
            console.log(`Removed ${eventOrganizerEntries.length} entries from event_organizers table`);
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
      const existingOrganizer = await db
        .select()
        .from(organizers)
        .where(eq(organizers.hacker_id, hackerId))
        .then(res => res[0]);
        
      // Create new organizer if doesn't exist
      let organizerId: number;
        
      if (!existingOrganizer) {
        // Create new organizer
        const newOrganizerResult = await db
          .insert(organizers)
          .values({
            hacker_id: hackerId,
          })
          .returning();
        
        if (!newOrganizerResult || newOrganizerResult.length === 0 || !newOrganizerResult[0]?.id) {
          throw new Error("Failed to create organizer");
        }
        
        // Safely access the first item
        organizerId = newOrganizerResult[0].id;
      } else {
        organizerId = existingOrganizer.id;
      }
        
      // Add to event organizers regardless
      await db
        .insert(eventOrganizers)
        .values({
          event_id: eventId,
          organizer_id: organizerId,
        })
        .onConflictDoNothing(); // In case this relationship already exists
        
      return { success: true };
    }),
    
  // Remove an organizer from an event
  removeOrganizer: protectedProcedure
    .input(z.object({ 
      organizerId: z.number(),
      eventId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { organizerId, eventId } = input;
      
      // Remove from event organizers
      await db
        .delete(eventOrganizers)
        .where(
          and(
            eq(eventOrganizers.event_id, eventId),
            eq(eventOrganizers.organizer_id, organizerId)
          )
        );
        
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

  // Get all organizer applications
  getAllOrganizerApplications: protectedProcedure
    .input(z.object({ 
      status: z.enum(["pending", "approved", "rejected"]).optional(),
      eventId: z.number().optional(),
      search: z.string().optional()
    }))
    .query(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      // Build conditions array first
      const conditions: SQL[] = [];
      
      if (input.status) {
        conditions.push(eq(organizerApplications.status, input.status));
      }
      
      if (input.eventId) {
        conditions.push(eq(organizerApplications.event_id, input.eventId));
      }
      
      // Build the query with all conditions at once
      const query = db.select({
        application: organizerApplications,
        hacker: hackers,
        event: events,
      })
      .from(organizerApplications)
      .leftJoin(hackers, eq(organizerApplications.hacker_id, hackers.id))
      .leftJoin(events, eq(organizerApplications.event_id, events.id));
      
      // Apply conditions if there are any
      const results = conditions.length > 0
        ? await query.where(and(...conditions))
        : await query;
      
      return results;
    }),

  // Update an organizer application (approve/reject)
  updateOrganizerApplication: protectedProcedure
    .input(z.object({ 
      applicationId: z.number(),
      status: z.enum(["approved", "rejected"]),
      adminNotes: z.string().optional()
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { applicationId, status, adminNotes } = input;
      
      // Get the application
      const application = await db
        .select()
        .from(organizerApplications)
        .where(eq(organizerApplications.id, applicationId))
        .then(res => res[0]);
        
      if (!application) {
        throw new Error("Application not found");
      }
      
      console.log("Processing application:", JSON.stringify(application));
      
      try {
        // First, update the application status
        await db
          .update(organizerApplications)
          .set({ 
            status, 
            admin_notes: adminNotes,
            updatedAt: new Date()
          })
          .where(eq(organizerApplications.id, applicationId));
        
        console.log("Updated application status to:", status);
        
        // If approved, create organizer record
        if (status === "approved") {
          // Check if organizer already exists
          const existingOrganizer = await db
            .select()
            .from(organizers)
            .where(eq(organizers.hacker_id, application.hacker_id))
            .then(res => res[0]);
          
          if (!existingOrganizer) {
            console.log("Creating organizer for hacker_id:", application.hacker_id);
            
            // Create new organizer without event_id
            const result = await db
              .insert(organizers)
              .values({
                hacker_id: application.hacker_id
              })
              .returning();
            
            console.log("Organizer creation result:", JSON.stringify(result));
            
            // No longer need to handle event_organizer relationship here
          } else {
            console.log("Organizer already exists with id:", existingOrganizer.id);
          }
        }
        
        return { success: true };
      } catch (error) {
        console.error("Error in updateOrganizerApplication:", error);
        throw error;
      }
    }),

  // Delete an organizer application
  deleteOrganizerApplication: protectedProcedure
    .input(z.object({ 
      applicationId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if user is admin
      if (!isAdmin(ctx.session.user.id)) {
        throw new Error("Unauthorized: Only admins can access this resource");
      }

      const { applicationId } = input;
      
      try {
        // Check if application exists
        const application = await db
          .select()
          .from(organizerApplications)
          .where(eq(organizerApplications.id, applicationId))
          .then(res => res[0]);
          
        if (!application) {
          throw new Error("Application not found");
        }
        
        // Delete the application
        await db
          .delete(organizerApplications)
          .where(eq(organizerApplications.id, applicationId));
        
        return { success: true };
      } catch (error) {
        console.error("Error deleting organizer application:", error);
        throw error;
      }
    }),
}); 