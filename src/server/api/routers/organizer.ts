// src/server/api/routers/organizer.ts
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { hackers, organizers } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const organizerRouter = createTRPCRouter({
  isOrganizer: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const hacker = await ctx.db
      .select()
      .from(hackers)
      .where(eq(hackers.user_Id, userId))
      .then(r => r[0]);

    if (!hacker) return false;

    const organizer = await ctx.db
      .select()
      .from(organizers)
      .where(eq(organizers.hacker_id, hacker.id))
      .then(r => r[0]);

    return !!organizer;
  }),
});
