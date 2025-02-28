import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  hackers,
} from "~/server/db/schema";

/**
 * Module augmentation for next-auth types. Allows us to add custom properties to the session
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: "user:email" } },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login, // <-- Fixed line
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the refresh_token_expires_in field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
  }),
  callbacks: {
    session: ({ session, user }) => ({ // default callback where user id is added to the session
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),

      async signIn({ user }: { user: any }) { // callback whcihchecks if user exists in the database and adds them if they don't
    
        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id))
          .then((res) => res[0]);
    
        if (!existingUser) {
          await db.insert(users).values({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image, // Match the schema field
          });
        }
    
        return true;
      },
    
      async redirect({ url, baseUrl }) { // callback to redirect user to the application form if they haven't filled it out yet
        const hackerProfile = await db
          .select()
          .from(hackers)
          .where(eq(hackers.user_Id, users.id)) 
          .then((res) => res[0]);
  
        if (url === baseUrl && !hackerProfile) { // if profile doesn't exist, redirect to application form
          return `${baseUrl}/hacker/application`; // Redirect to the application form
        }
  
        return `${baseUrl}/dashboard`; // If profile exists, go to dashboard
      },
    },
  } satisfies NextAuthConfig;