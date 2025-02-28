import { db } from "~/server/db";
import { hackers, InsertHackerSchema} from "~/server/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";


export const hackerRouter = createTRPCRouter({
    
    getHacker: protectedProcedure.query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
  
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
      });

      return { success: true };
    }),
  });