import { db } from "~/server/db";
import { hackers } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";


const createHackerInput = z.object({
  firstname: z.string(),
  middlename: z.string().optional(),
  lastname: z.string(),
  birthdate: z.date(), 
  eduemail: z.string().email(),
  graduation: z.date(), 
  university: z.string(),
  phone: z.string(),
  address: z.string().optional(),
  gender: z.string().optional(),
  race: z.string().optional(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  personalwebsite: z.string().url().optional(),
});

export const hackerRouter = createTRPCRouter({
  getHacker: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const hackerProfile = await db
        .select()
        .from(hackers)
        .where(eq(hackers.user_Id, userId))
        .then((res) => res[0]);

      if (!hackerProfile) {
        return { success: false, message: "Hacker profile not found" };
      }

      return { success: true, hackerProfile }; 
    } catch (error) {
      return { success: false, message: "Error fetching hacker profile" };
    }
  }),

  createHacker: protectedProcedure
  .input(createHackerInput)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;

    try {
      await db.insert(hackers).values({
        user_id: userId,  
        firstname: input.firstname,
        middlename: input.middlename,
        lastname: input.lastname,
        birthdate: input.birthdate, 
        eduemail: input.eduemail,
        graduation: input.graduation, 
        university: input.university,
        phone: input.phone,
        address: input.address,
        gender: input.gender,
        race: input.race,
        github: input.github,
        linkedin: input.linkedin,
        personalwebsite: input.personalwebsite,
      });

      return { success: true };
    } catch (error) {
      return { success: false, message: "Error creating hacker profile" };
    }
  }),


});
