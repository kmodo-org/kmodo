import { db } from "~/server/db";
import { hackers, events, InsertHackerSchema, InsertEventSchema} from "~/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { organizerApplications } from "~/server/db/schema";
import { InsertOrganizerApplicationSchema } from "~/server/db/schema";
import { organizers } from "~/server/db/schema";


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
      event_id: input.event_id,
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
});
