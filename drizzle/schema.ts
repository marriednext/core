import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
  foreignKey,
  boolean,
  text,
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const invitations = pgTable("invitations", {
  id: serial().primaryKey().notNull(),
  weddingId: integer("wedding_id"),
  invitationName: varchar("invitation_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const guests = pgTable(
  "guests",
  {
    id: serial().primaryKey().notNull(),
    invitationId: integer("invitation_id"),
    name: varchar({ length: 255 }).notNull(),
    isPlusOne: boolean("is_plus_one").default(false),
    alternativeNames: text("alternative_names").array(),
    rsvpStatus: varchar("rsvp_status", { length: 20 }).default("pending"),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
  },
  (table) => [
    foreignKey({
      columns: [table.invitationId],
      foreignColumns: [invitations.id],
      name: "guests_invitation_id_fkey",
    }),
  ]
);

export const weddingOwners = pgTable(
  "wedding_owners",
  {
    id: serial().primaryKey().notNull(),
    weddingId: integer("wedding_id").notNull(),
    clerkUserId: text("clerk_user_id").notNull(),
    role: varchar({ length: 50 }).default("owner"),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
  },
  (table) => [
    foreignKey({
      columns: [table.weddingId],
      foreignColumns: [weddings.id],
      name: "wedding_owners_wedding_id_fkey",
    }).onDelete("cascade"),
    unique("wedding_owners_wedding_id_clerk_user_id_key").on(
      table.weddingId,
      table.clerkUserId
    ),
  ]
);

export const weddings = pgTable(
  "weddings",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({
      name: "weddings_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
    name: text().notNull(),
    weddingDate: text("wedding_date"),
    partnerAName: text("partner_a_name"),
    partnerBName: text("partner_b_name"),
    weddingTime: text("wedding_time"),
    customDomain: text("custom_domain"),
    createdAt: timestamp("created_at", { mode: "string" }).default(
      sql`CURRENT_TIMESTAMP`
    ),
    venueName: text("venue_name"),
    venueAddress: text("venue_address"),
    subdomain: text(),
  },
  (table) => [
    unique("weddings_custom_domain_key").on(table.customDomain),
    unique("weddings_base_domain_key").on(table.subdomain),
    unique("weddings_subdomain_key").on(table.subdomain),
  ]
);
