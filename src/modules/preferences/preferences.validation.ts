import { z } from "zod";

const preferencesDataSchema = z.object({
    skills: z
        .array(
            z
            .string()
            .trim()
            .min(1, "Skill cannot be empty")
            .max(30, "Skill too long")
            .toLowerCase()
        )
        .min(1, "At least one skill is required")
        .max(20, "Too many skills"),

    preferences: z
        .array(
            z
            .string()
            .trim()
            .min(1, "Preference cannot be empty")
            .max(50, "Preference too long")
            .toLowerCase()
        )
        .max(10, "Too many preferences")
        .optional(),
});

export type PreferencesData = z.infer<typeof preferencesDataSchema>;