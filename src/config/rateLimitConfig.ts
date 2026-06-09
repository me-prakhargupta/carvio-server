export const rateLimitConfig = {
    signup: {
        windowMs: 5 * 60 * 1000,
        max: 5,
        message: "To many attempts, try again later"
    },
    signin: {
        windowMs: 5 * 60 * 1000,
        max: 5,
        message: "To many attempts, try again later"
    },
    emailVerification: {
        windowMs: 5 * 60 * 1000,
        max: 5,
        message: "To many attempts, try again later"
    },
};