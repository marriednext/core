import { z } from "zod";
import type { HomeStatsResponse } from "types-shelf/home";

export const homeStatsResponseSchema = z.object({
  totalGuests: z.number(),
  totalInvitations: z.number(),
  respondedGuests: z.number(),
  responseRate: z.number(),
  attendingGuests: z.number(),
  declinedGuests: z.number(),
  pendingGuests: z.number(),
  weddingDate: z.string().nullable(),
  weddingLocation: z.string().nullable(),
  coupleNames: z.object({
    nameA: z.string(),
    nameB: z.string(),
    displayName: z.string(),
  }),
  subscriptionPlan: z.string(),
  siteUrl: z.string(),
  user: z.object({
    fullName: z.string(),
    imageUrl: z.string().nullable(),
    initials: z.string(),
    email: z.string(),
  }),
  websiteTemplate: z.string(),
  subdomain: z.string().nullable(),
  customDomain: z.string().nullable(),
}) satisfies z.ZodType<HomeStatsResponse>;

