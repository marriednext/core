import { relations } from "drizzle-orm/relations";
import { wedding, guest, invitation } from "./schema";

export const guestRelations = relations(guest, ({one, many}) => ({
	wedding: one(wedding, {
		fields: [guest.weddingId],
		references: [wedding.id]
	}),
	invitations_guestA: many(invitation, {
		relationName: "invitation_guestA_guest_nameOnInvitation"
	}),
	invitations_guestB: many(invitation, {
		relationName: "invitation_guestB_guest_nameOnInvitation"
	}),
	invitations_guestC: many(invitation, {
		relationName: "invitation_guestC_guest_nameOnInvitation"
	}),
	invitations_guestD: many(invitation, {
		relationName: "invitation_guestD_guest_nameOnInvitation"
	}),
	invitations_guestE: many(invitation, {
		relationName: "invitation_guestE_guest_nameOnInvitation"
	}),
	invitations_guestF: many(invitation, {
		relationName: "invitation_guestF_guest_nameOnInvitation"
	}),
	invitations_guestG: many(invitation, {
		relationName: "invitation_guestG_guest_nameOnInvitation"
	}),
	invitations_guestH: many(invitation, {
		relationName: "invitation_guestH_guest_nameOnInvitation"
	}),
}));

export const weddingRelations = relations(wedding, ({many}) => ({
	guests: many(guest),
	invitations: many(invitation),
}));

export const invitationRelations = relations(invitation, ({one}) => ({
	wedding: one(wedding, {
		fields: [invitation.weddingId],
		references: [wedding.id]
	}),
	guest_guestA: one(guest, {
		fields: [invitation.guestA],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestA_guest_nameOnInvitation"
	}),
	guest_guestB: one(guest, {
		fields: [invitation.guestB],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestB_guest_nameOnInvitation"
	}),
	guest_guestC: one(guest, {
		fields: [invitation.guestC],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestC_guest_nameOnInvitation"
	}),
	guest_guestD: one(guest, {
		fields: [invitation.guestD],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestD_guest_nameOnInvitation"
	}),
	guest_guestE: one(guest, {
		fields: [invitation.guestE],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestE_guest_nameOnInvitation"
	}),
	guest_guestF: one(guest, {
		fields: [invitation.guestF],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestF_guest_nameOnInvitation"
	}),
	guest_guestG: one(guest, {
		fields: [invitation.guestG],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestG_guest_nameOnInvitation"
	}),
	guest_guestH: one(guest, {
		fields: [invitation.guestH],
		references: [guest.nameOnInvitation],
		relationName: "invitation_guestH_guest_nameOnInvitation"
	}),
}));