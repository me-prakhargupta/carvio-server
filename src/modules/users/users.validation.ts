import { z } from "zod";

const userProfileSchema = z.object({
    fullname: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name too long")
        .regex(/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/, "Invalid name format"),

    email: z
        .email(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;