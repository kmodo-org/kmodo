import { db } from "~/server/db";
import { hackers, events, InsertHackerSchema, InsertEventSchema} from "~/server/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";


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
  .mutation(async ({ ctx, input }) => { 

    const userId = ctx.session.user.id;

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
  })
});
