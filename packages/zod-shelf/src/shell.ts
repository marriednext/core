import { z } from "zod";
import type { ShellResponse } from "types-shelf/shell";

export const shellResponseSchema = z.object({
  user: z.object({
    fullName: z.string(),
    email: z.string(),
    imageUrl: z.string().nullable(),
    initials: z.string(),
  }),
  wedding: z.object({
    id: z.string(),
    displayName: z.string(),
    nameA: z.string(),
    nameB: z.string(),
    eventDate: z.string().nullable(),
  }),
  subscriptionPlan: z.string(),
}) satisfies z.ZodType<ShellResponse>;
