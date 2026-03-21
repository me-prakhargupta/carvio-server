import { z } from "zod";

export const jobSchema = z.object({
  title: z
    .string()
    .trim(),

  company: z
    .string()
    .trim(),

  location: z
    .string()
    .trim()
    .optional(),

  skills: z
    .array(z
        .string()
        .trim()
    )
    .optional(),

  source: z
    .string()
    .trim(),

  externalId: z
    .string()
    .trim(),

  absoluteUrl: z
    .url()
    .trim(),

  stipend: z
    .string()
    .trim()
    .optional(),

  postedAt: z
    .string()
    .optional(),
}).transform((data) => {
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
  );
});

export type JobType = z.infer<typeof jobSchema>;