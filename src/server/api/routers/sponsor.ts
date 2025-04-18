// src/server/api/routers/sponsor.ts
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { sponsors } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const sponsorRouter = createTRPCRouter({
  isSponsor: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    const sponsor = await ctx.db
      .select()
      .from(sponsors)
      .where(eq(sponsors.user_Id, userId))
      .then((rows) => rows[0]);

    return !!sponsor;
  }),
});
