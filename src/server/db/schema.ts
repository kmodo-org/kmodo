import { InferSelectModel, relations, sql } from "drizzle-orm";
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
import { createInsertSchema } from "drizzle-zod";

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
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(), // unique id for the hacker 
    user_Id: varchar("user_id", { length: 255 }) // user id for the hacker, takes the user id from the users table
      .notNull()
      .references(() => users.id),
    firstname: varchar("firstname", { length: 255 }) // first name for the hacker (cant be null)
      .notNull(), 
    middlename: varchar("middlename", { length: 255 }), // middle name for the hacker (optional)
    lastname: varchar("lastname", { length: 255 }) // last name for the hacker (cant be null)
      .notNull(),
    birthdate: date("birthdate") // birthdate for the hacker (cant be null)
      .notNull(),
    eduemail: varchar("eduemail", { length: 255 }) // edu email for the hacker, cant be null and must be unique (who has the same edu email)
      .notNull()
      .unique(),
    graduation: date("graddate") // graduation date for the hacker (cant be null)
      .notNull(), 
    university: varchar("university", { length: 255 }) // university for the hacker (cant be null)
      .notNull(),
    phone: varchar("phone", { length: 15 }) // phone number for the hacker, cant be null and must be unique (who has the same phone number)
      .notNull()
      .unique(), 
    address: varchar("address", { length: 255 }), // address for the hacker (optional)
    gender: varchar("gender", { length: 255 }), // gender for the hacker (optional)
    race: varchar("race", { length: 255 }), // race for the hacker (optional)
    github: varchar("github", { length: 255 }),  //  github for the hacker (optional)
    linkedin: varchar("linkedin", { length: 255 }),  // linkedin for the hacker (optional)
    personalwebsite: varchar("personalwebsite", { length: 255 }),  // personal website for the hacker (optional)
    createdAt: timestamp("created_at", { withTimezone: true }) // when the hacker was created (optional)
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    tosAccepted: integer("tos_accepted").notNull().default(0), // tos accepted 
  },
  (hacker) => ({
    user_IdIdx: index("hacker_user_id_idx").on(hacker.user_Id), // index on the user id
    eduemailIdx: index("hacker_eduemail_idx").on(hacker.eduemail), // index on the edu email
  })
);

export type InsertHacker = InferSelectModel<typeof hackers>;
export const InsertHackerSchema = createInsertSchema(hackers);

export const organizers = createTable(
  "organizer",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(), // unique id for the organizer
    hacker_id: integer("hacker_id") // the hacker's unique id (remember orgs are just hackers) which cant be null and references the hackers table as it gets the hacker for the organizer
      .notNull()
      .references(() => hackers.id), 
    event_id: integer("event_id") // the event's unique id which cant be null and references the events table as it gets the event for the organizer
      .notNull()
      .references(() => events.id), 
    createdAt: timestamp("created_at", { withTimezone: true }) // when the organizer was created
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (organizer) => ({
    hackerIdIdx: index("organizer_hacker_id_idx").on(organizer.hacker_id), // index on the hacker id
    eventIdIdx: index("organizer_event_id_idx").on(organizer.event_id), // index on the event id
  })
);


export const sponsors = createTable(
  "sponsor",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(), // unique id for the sponsor
    user_Id: varchar("user_id", { length: 255 }) // user id for the sponsor, takes the user id from the users table
      .notNull()
      .references(() => users.id), 
    company: varchar("company", { length: 255 }) // company name cant be null
      .notNull(), 
    companyemail: varchar("companyemail", { length: 255 }) // email for company, unique and cant be null 
      .notNull()
      .unique(), 
    phone: varchar("phone", { length: 15 }), 
    // side note im gonna make a separate table for the company and have a foreign key here but not rn prob later
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (sponsor) => ({
    user_IdIdx: index("sponsor_user_id_idx").on(sponsor.user_Id), // index on the user id
    companyemailIdx: index("sponsor_companyemail_idx").on(sponsor.companyemail),  // index on the company email
  })
);


export const sponsorsRelations = relations(sponsors, ({ one }) => ({
  user: one(users, { fields: [sponsors.user_Id], references: [users.id] }), // relations for sponsors and users
}));


export const events = createTable( // table for events
  "event",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),  // unique id for the event
    name: varchar("event", { length: 255 }) // name of the event (cant be null)
      .notNull(), 
    date: date("date") // date of the event (cant be null)
      .notNull(),
    location: varchar("location", { length: 255 }) // location of the event (cant be null)
      .notNull(),
    starttime: timestamp("starttime", { withTimezone: true }) // start time of the event (cant be null)
      .notNull(),
    endtime: timestamp("endtime", { withTimezone: true }) // end time of the event (cant be null)
      .notNull(),
    school: varchar("school", { length: 255 }) // school for the event (cant be null)
      .notNull(),
    description: varchar("description", { length: 255 }), // description for event ( optional ) 
    createdAt: timestamp("created_at", { withTimezone: true }) // when the event was created
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(), 
  },
  (event) => ({
    eventIdx: index("event_idx").on(event.name), // index on the event name
  })
);

export const InsertEventSchema = createInsertSchema(events);

export const eventOrganizers = createTable(
  "event_organizer",
  {
    event_id: integer("event_id") // the event's unique id
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }), // takes the event id from the events table and if deleted it cascades
    organizer_id: integer("organizer_id") // the organizer's unique id
      .notNull()
      .references(() => organizers.id, { onDelete: "cascade" }), // takes the organizer id from the organizers table and if deleted it cascades
  },
  (eventOrganizer) => ({  // compound key for the event organizer table
    compoundKey: primaryKey({
      columns: [eventOrganizer.event_id, eventOrganizer.organizer_id],
    }),
  })
);

export const eventsRelations = relations(events, ({ many }) => ({
  organizers: many(eventOrganizers), // relations for organizers and events
}));

export const eventOrganizersRelations = relations(eventOrganizers, ({ one }) => ({ // relations for event organizers and events so we can have organizer teams on events
  event: one(events, {
    fields: [eventOrganizers.event_id],
    references: [events.id],
  }),
  organizer: one(organizers, {
    fields: [eventOrganizers.organizer_id],
    references: [organizers.id],
  }),
}));