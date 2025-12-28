import { relations } from "drizzle-orm/relations";
import {
  wedding,
  guest,
  invitation,
  weddingUsers,
  collaboratorInvitations,
  seatingTable,
  seatAssignment,
  weddingPhotos,
} from "./schema";

export const guestRelations = relations(guest, ({ one, many }) => ({
  wedding: one(wedding, {
    fields: [guest.weddingId],
    references: [wedding.id],
  }),
  invitation: one(invitation, {
    fields: [guest.invitationId],
    references: [invitation.id],
  }),
  seatAssignments: many(seatAssignment),
}));

export const weddingRelations = relations(wedding, ({ many }) => ({
  guests: many(guest),
  invitations: many(invitation),
  weddingUsers: many(weddingUsers),
  collaboratorInvitations: many(collaboratorInvitations),
  seatingTables: many(seatingTable),
  photos: many(weddingPhotos),
}));

export const invitationRelations = relations(invitation, ({ one, many }) => ({
  guests: many(guest),
  wedding: one(wedding, {
    fields: [invitation.weddingId],
    references: [wedding.id],
  }),
}));

export const weddingUsersRelations = relations(weddingUsers, ({ one }) => ({
  wedding: one(wedding, {
    fields: [weddingUsers.weddingId],
    references: [wedding.id],
  }),
}));

export const collaboratorInvitationsRelations = relations(
  collaboratorInvitations,
  ({ one }) => ({
    wedding: one(wedding, {
      fields: [collaboratorInvitations.weddingId],
      references: [wedding.id],
    }),
  })
);

export const seatingTableRelations = relations(
  seatingTable,
  ({ one, many }) => ({
    wedding: one(wedding, {
      fields: [seatingTable.weddingId],
      references: [wedding.id],
    }),
    seatAssignments: many(seatAssignment),
  })
);

export const seatAssignmentRelations = relations(seatAssignment, ({ one }) => ({
  seatingTable: one(seatingTable, {
    fields: [seatAssignment.tableId],
    references: [seatingTable.id],
  }),
  guest: one(guest, {
    fields: [seatAssignment.guestId],
    references: [guest.id],
  }),
}));

export const weddingPhotosRelations = relations(weddingPhotos, ({ one }) => ({
  wedding: one(wedding, {
    fields: [weddingPhotos.weddingId],
    references: [wedding.id],
  }),
}));
