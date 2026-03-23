export const rateLimitConfig = {
    emailVerification: {
        windowMs: 5 * 60 * 1000,
        max: 5,
        message: "To many attempts, try again later"
    },
};