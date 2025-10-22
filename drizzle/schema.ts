import {
  pgTable,
  foreignKey,
  unique,
  uuid,
  timestamp,
  text,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const rsvpNameFormatEnum = pgEnum("rsvp_name_format", [
  "FIRST_NAME_ONLY",
  "FULL_NAME",
]);

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
    email: text("email"),
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
    clerkUserId: text("clerk_user_id"),
    subdomain: text(),
    customDomain: text("custom_domain"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),

    fieldDisplayName: text("field_display_name"),
    fieldLocationName: text("field_location_name"),
    fieldLocationAddress: text("field_location_address"),
    fieldEventDate: timestamp("field_event_date", { mode: "string" }),
    fieldEventTime: text("field_event_time"),
    fieldMapsEmbedUrl: text("field_maps_embed_url"),
    fieldMapsShareUrl: text("field_maps_share_url"),
    fieldQuestionsAndAnswers: jsonb("field_questions_and_answers"),
    fieldOurStory: jsonb("field_our_story"),
    fieldNameA: text("field_name_a"),
    fieldNameB: text("field_name_b"),
    controlRsvpNameFormat: rsvpNameFormatEnum("control_rsvp_name_format")
      .default("FULL_NAME")
      .notNull(),
  },
  (table) => [
    unique("weddings_subdomain_unique").on(table.subdomain),
    unique("weddings_custom_domain_unique").on(table.customDomain),
    unique("weddings_clerk_user_id_unique").on(table.clerkUserId),
  ]
);
