import {
  pgTable,
  foreignKey,
  unique,
  uuid,
  timestamp,
  text,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const guest = pgTable(
  "guest",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    weddingId: uuid("wedding_id"),
    dateEntrySubmitted: timestamp("date_entry_submitted", {
      mode: "string",
    }).defaultNow(),
    nameOnInvitation: text("name_on_invitation").notNull(),
    isAttending: boolean("is_attending"),
    hasPlusOne: boolean("has_plus_one"),
  },
  (table) => [
    foreignKey({
      columns: [table.weddingId],
      foreignColumns: [wedding.id],
      name: "fk_guest_wedding",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    unique("uq_guest_name").on(table.nameOnInvitation),
  ]
);

export const invitation = pgTable(
  "invitation",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    weddingId: uuid("wedding_id"),
    guestA: text("guest_a").notNull(),
    guestB: text("guest_b"),
    guestC: text("guest_c"),
    guestD: text("guest_d"),
    guestE: text("guest_e"),
    guestF: text("guest_f"),
    guestG: text("guest_g"),
    guestH: text("guest_h"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    lastUpdatedAt: timestamp("last_updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    inviteGroupName: text("invite_group_name"),
  },
  (table) => [
    foreignKey({
      columns: [table.weddingId],
      foreignColumns: [wedding.id],
      name: "fk_invitation_wedding",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestA],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_a",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestB],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_b",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestC],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_c",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestD],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_d",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestE],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_e",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestF],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_f",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestG],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_g",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
    foreignKey({
      columns: [table.guestH],
      foreignColumns: [guest.nameOnInvitation],
      name: "fk_guest_h",
    })
      .onUpdate("cascade")
      .onDelete("cascade"),
  ]
);

export const wedding = pgTable(
  "wedding",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    subdomain: text(),
    customDomain: text("custom_domain"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    labelsEn: jsonb("labels_en"),
    labelsEs: jsonb("labels_es"),
  },
  (table) => [
    unique("weddings_subdomain_unique").on(table.subdomain),
    unique("weddings_custom_domain_unique").on(table.customDomain),
  ]
);
