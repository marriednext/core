import { relations } from "drizzle-orm/relations";
import { invitations, guests, weddings, weddingOwners, weddingv2, invitationsv2, guestsv2, weddingOwnersv2 } from "./schema";

export const guestsRelations = relations(guests, ({one}) => ({
	invitation: one(invitations, {
		fields: [guests.invitationId],
		references: [invitations.id]
	}),
}));

export const invitationsRelations = relations(invitations, ({many}) => ({
	guests: many(guests),
}));

export const weddingOwnersRelations = relations(weddingOwners, ({one}) => ({
	wedding: one(weddings, {
		fields: [weddingOwners.weddingId],
		references: [weddings.id]
	}),
}));

export const weddingsRelations = relations(weddings, ({many}) => ({
	weddingOwners: many(weddingOwners),
}));

export const invitationsv2Relations = relations(invitationsv2, ({one, many}) => ({
	weddingv2: one(weddingv2, {
		fields: [invitationsv2.weddingId],
		references: [weddingv2.id]
	}),
	guestsv2s: many(guestsv2),
}));

export const weddingv2Relations = relations(weddingv2, ({many}) => ({
	invitationsv2s: many(invitationsv2),
	weddingOwnersv2s: many(weddingOwnersv2),
}));

export const guestsv2Relations = relations(guestsv2, ({one}) => ({
	invitationsv2: one(invitationsv2, {
		fields: [guestsv2.invitationId],
		references: [invitationsv2.id]
	}),
}));

export const weddingOwnersv2Relations = relations(weddingOwnersv2, ({one}) => ({
	weddingv2: one(weddingv2, {
		fields: [weddingOwnersv2.weddingId],
		references: [weddingv2.id]
	}),
}));