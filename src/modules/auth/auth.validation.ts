import { z } from "zod";

export const signupSchema = z.object({
    fullname: z   
        .string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .max(50, "Full name too long"),

    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100),
});

export const signinSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase()
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100),
});