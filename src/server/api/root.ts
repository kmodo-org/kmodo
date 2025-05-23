import { postRouter } from "~/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { hackerRouter } from "./routers/hacker";
import { assetRouter } from "./routers/assets";
import { adminRouter } from "./routers/admin";
import { organizerRouter } from "./routers/organizer";
import { supportRouter } from "./routers/support";
import { sponsorRouter } from "./routers/sponsor";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  hacker: hackerRouter,
  organizer: organizerRouter,
  asset: assetRouter,
  admin: adminRouter,
  support: supportRouter,
  sponsor:   sponsorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
