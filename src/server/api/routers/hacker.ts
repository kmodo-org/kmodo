import { db } from "~/server/db";
import { hackers, events, InsertHackerSchema, InsertEventSchema} from "~/server/db/schema";
import { asc, eq, and } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { organizerApplications } from "~/server/db/schema";
import { InsertOrganizerApplicationSchema } from "~/server/db/schema";
import { organizers } from "~/server/db/schema";
import { hackathonApplications } from "~/server/db/schema";
import { z } from "zod";


export const hackerRouter = createTRPCRouter({
    
  getHacker: publicProcedure.query(async ({ ctx }) => {  // Changed to public procedure
    const userId = ctx.session?.user?.id; 

    if (!userId) {
      throw new Error("User ID not found"); 
    }

    const hackerProfile = await db
      .select()
      .from(hackers)
      .where(eq(hackers.user_Id, userId))
      .then((res) => res[0]);

    return !!hackerProfile; 
  }),

  getHackerProfile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const hackerProfile = await db
      .select()
      .from(hackers)
      .where(eq(hackers.user_Id, userId))
      .then((res) => res[0]);

    if (!hackerProfile) {
      throw new Error("Hacker profile not found");
    }

    return hackerProfile;
  }),

  createHacker: protectedProcedure
  .input(InsertHackerSchema.omit({ id: true }))
  .mutation(async ({ ctx, input }) => {

    const userId = ctx.session.user.id;

    await db.insert(hackers).values({
      user_Id: userId,
      firstname: input.firstname,
      middlename: input.middlename,
      lastname: input.lastname,
      birthdate: input.birthdate, 
      graduation: input.graduation,
      eduemail: input.eduemail,
      university: input.university,
      phone: input.phone,
      address: input.address,
      gender: input.gender,
      race: input.race,
      github: input.github,
      linkedin: input.linkedin,
      personalwebsite: input.personalwebsite,
      tosAccepted: input.tosAccepted
    });

    return { success: true };
  }),

  createEvent: protectedProcedure
  .input(InsertEventSchema.omit({ id: true }))
  .mutation(async ({ input }) => { 

    await db.insert(events).values({
      name: input.name,
      date: input.date,
      location: input.location, 
      starttime: input.starttime,
      endtime: input.endtime,
      school: input.school,
      description: input.description,
    });

    return { success: true };
  }),
  getEvents: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(events)
      .orderBy(asc(events.date));
    return result;
  }),
  hasSubmittedForm: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = ctx.session.user.id;
      
      // Check if the user exists in the hackers table
      const submission = await db
        .select({ user_Id: hackers.user_Id })
        .from(hackers)
        .where(eq(hackers.user_Id, userId))
        .limit(1) // Ensure we only check for the first result
        .then(res => res[0]);
  
      return !!submission; // If a record exists, return true, otherwise false
    } catch (error) {
      console.error("Error checking form submission:", error);
      return false;
    }
  }),
  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.db
      .select()
      .from(events)
      .orderBy(asc(events.date));
    return result;
  }),

  applyToOrganize: protectedProcedure
  .input(InsertOrganizerApplicationSchema)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    const hacker = await db
      .select()
      .from(hackers)
      .where(eq(hackers.user_Id, userId))
      .then(res => res[0]);

    if (!hacker) throw new Error("Hacker profile not found.");

    await db.insert(organizerApplications).values({
      hacker_id: hacker.id,
      organization: input.organization,
      target_days: input.target_days,
      additional_info: input.additional_info,
      status: "pending",
    });

    return { success: true };
  }),
  isOrganizer: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
  
    const hacker = await db
      .select()
      .from(hackers)
      .where(eq(hackers.user_Id, userId))
      .then(res => res[0]);
  
    if (!hacker) return false;

    const organizer = await db
      .select()
      .from(organizers)
      .where(eq(organizers.hacker_id, hacker.id))
      .then(res => res[0]);
  
    return !!organizer;
  }),
  
  // Check if user has already applied to be an organizer
  hasAppliedToOrganize: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    
    const hacker = await db
      .select()
      .from(hackers)
      .where(eq(hackers.user_Id, userId))
      .then(res => res[0]);
      
    if (!hacker) return false;
    
    const application = await db
      .select()
      .from(organizerApplications)
      .where(eq(organizerApplications.hacker_id, hacker.id))
      .then(res => res[0]);
      
    return !!application;
  }),

  applyToHackathon: protectedProcedure
    .input(z.object({
      eventId: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Get the hacker profile
      const hacker = await db
        .select()
        .from(hackers)
        .where(eq(hackers.user_Id, userId))
        .then((res) => res[0]);

      if (!hacker) throw new Error("Hacker profile not found");

      // Check if already applied
      const existingApplications = await db
        .select()
        .from(hackathonApplications)
        .where(
          and(
            eq(hackathonApplications.hacker_id, hacker.id),
            eq(hackathonApplications.event_id, input.eventId)
          )
        );
      
      if (existingApplications.length > 0) throw new Error("Already applied to this hackathon");

      // Create the application
      await db.insert(hackathonApplications).values({
        hacker_id: hacker.id,
        event_id: input.eventId,
        status: "pending",
      });

      return { success: true };
    }),

  hasAppliedToHackathon: protectedProcedure
    .input(z.object({
      eventId: z.number().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      const hacker = await db
        .select()
        .from(hackers)
        .where(eq(hackers.user_Id, userId))
        .then((res) => res[0]);
        
      if (!hacker) return false;
      
      let query = db
        .select()
        .from(hackathonApplications)
        .where(eq(hackathonApplications.hacker_id, hacker.id));

      if (input.eventId) {
        query = db
          .select()
          .from(hackathonApplications)
          .where(
            and(
              eq(hackathonApplications.hacker_id, hacker.id),
              eq(hackathonApplications.event_id, input.eventId)
            )
          );
      }
      
      const applications = await query;
      return applications.length > 0;
    }),

  getHackathonApplications: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      
      const hacker = await db
        .select()
        .from(hackers)
        .where(eq(hackers.user_Id, userId))
        .then((res) => res[0]);
        
      if (!hacker) return [];
      
      const applications = await db
        .select()
        .from(hackathonApplications)
        .where(eq(hackathonApplications.hacker_id, hacker.id));
      
      return applications;
    }),

  // Add a new procedure to get all hackathon applications (for organizers)
  getAllHackathonApplications: protectedProcedure
    .query(async ({ ctx }) => {
      // Check if the user is an organizer
      const userId = ctx.session.user.id;
      
      const hacker = await db
        .select()
        .from(hackers)
        .where(eq(hackers.user_Id, userId))
        .then((res) => res[0]);
        
      if (!hacker) return [];
      
      const organizer = await db
        .select()
        .from(organizers)
        .where(eq(organizers.hacker_id, hacker.id))
        .then((res) => res[0]);
        
      if (!organizer) throw new Error("You must be an organizer to view all applications");
      
      // Get all applications with hacker and event details
      const applications = await db
        .select({
          id: hackathonApplications.id,
          status: hackathonApplications.status,
          createdAt: hackathonApplications.createdAt,
          hacker: {
            id: hackers.id,
            firstname: hackers.firstname,
            lastname: hackers.lastname,
            eduemail: hackers.eduemail,
            university: hackers.university,
          },
          event: {
            id: events.id,
            name: events.name,
            date: events.date,
            school: events.school,
          }
        })
        .from(hackathonApplications)
        .leftJoin(hackers, eq(hackathonApplications.hacker_id, hackers.id))
        .leftJoin(events, eq(hackathonApplications.event_id, events.id))
        .orderBy(asc(hackathonApplications.createdAt));
      
      return applications;
    }),

  // Add a mutation to update application status
  updateHackathonApplicationStatus: protectedProcedure
    .input(z.object({
      applicationId: z.number(),
      status: z.enum(["pending", "accepted", "rejected"]),
    }))
    .mutation(async ({ ctx, input }) => {
      // Check if the user is an organizer
      const userId = ctx.session.user.id;
      
      const hacker = await db
        .select()
        .from(hackers)
        .where(eq(hackers.user_Id, userId))
        .then((res) => res[0]);
        
      if (!hacker) throw new Error("Hacker profile not found");
      
      const organizer = await db
        .select()
        .from(organizers)
        .where(eq(organizers.hacker_id, hacker.id))
        .then((res) => res[0]);
        
      if (!organizer) throw new Error("You must be an organizer to update application status");
      
      // Update the application status
      await db
        .update(hackathonApplications)
        .set({ 
          status: input.status,
          updatedAt: new Date(),
        })
        .where(eq(hackathonApplications.id, input.applicationId));
      
      return { success: true };
    }),
});
