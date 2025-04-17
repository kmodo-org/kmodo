import { db } from "~/server/db";
import { sponsors, events, InsertHackerSchema, InsertEventSchema} from "~/server/db/schema";
import { asc, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";


export const sponsorRouter = createTRPCRouter({
    getCompanyDescription:
    getCompanyBased:
    getCompanyEmployees:

    getCompanyFocuses:

    getCompanyContactInformation:

    getCompanySiteInformation:

});