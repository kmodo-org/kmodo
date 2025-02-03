import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  date,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `kmodo_${name}`);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("created_by", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date()
    ),
  },
  (example) => ({
    createdByIdIdx: index("created_by_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  })
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  // Changed email to be nullable
  email: varchar("email", { length: 255 }).unique(), // Removed .notNull()
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Added cascade delete
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }), // Added cascade delete
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const hackers = createTable(
  "hacker",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(), 
    user_Id: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    firstname: varchar("firstname", { length: 255 })
      .notNull(), 
    middlename: varchar("middlename", { length: 255 }),
    lastname: varchar("lastname", { length: 255 })
      .notNull(),
    birthdate: date("birthdate")
      .notNull(),
    eduemail: varchar("eduemail", { length: 255 })
      .notNull()
      .unique(),
    graduation: date("graddate")
      .notNull(), 
    university: varchar("university", { length: 255 })
      .notNull(),
    phone: varchar("phone", { length: 15 })
      .notNull()
      .unique(), 
    address: varchar("address", { length: 255 }), 
    gender: varchar("gender", { length: 255 }), 
    race: varchar("race", { length: 255 }), 
    github: varchar("github", { length: 255 }), 
    linkedin: varchar("linkedin", { length: 255 }), 
    personalwebsite: varchar("personalwebsite", { length: 255 }), 
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (hacker) => ({
    user_IdIdx: index("hacker_user_id_idx").on(hacker.user_Id),
    eduemailIdx: index("hacker_eduemail_idx").on(hacker.eduemail), 
  })
);

export const hackersRelations = relations(hackers, ({ one }) => ({
  user: one(users, { fields: [hackers.user_Id], references: [users.id] }),
}));

export const organizers = createTable(
  "organizer",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(), 
    hacker_id: varchar("hacker_id", { length: 255 })
      .notNull()
      .references(() => hackers.user_Id), 
    event: varchar("event", { length: 255 }), 
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(), 
  },
  (organizer) => ({
    hackerIdIdx: index("organizer_hacker_id_idx").on(organizer.hacker_id),
  })
);

export const organizersRelations = relations(organizers, ({ one }) => ({
  hacker: one(hackers, { fields: [organizers.hacker_id], references: [hackers.user_Id] }),
}));

export const sponsors = createTable(
  "sponsor",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    user_Id: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id), 
    company: varchar("company", { length: 255 })
      .notNull(), 
    companyemail: varchar("companyemail", { length: 255 })
      .notNull()
      .unique(), 
    phone: varchar("phone", { length: 15 }), 
    // side note im gonna make a separate table for the company and have a foreign key here but not rn prob later
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (sponsor) => ({
    user_IdIdx: index("sponsor_user_id_idx").on(sponsor.user_Id), 
    companyemailIdx: index("sponsor_companyemail_idx").on(sponsor.companyemail), 
  })
);


export const sponsorsRelations = relations(sponsors, ({ one }) => ({
  user: one(users, { fields: [sponsors.user_Id], references: [users.id] }),
}));


