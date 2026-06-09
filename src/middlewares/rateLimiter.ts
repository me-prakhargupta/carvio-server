import { generateRateLimiter } from "../shared/utills/rateLimiter.js";
import { rateLimitConfig } from "../config/rateLimitConfig.js";

const signupLimiter = generateRateLimiter(rateLimitConfig.signup);
const signinLimter = generateRateLimiter(rateLimitConfig.signin);
const emailVerificationLimiter = generateRateLimiter(
    rateLimitConfig.emailVerification
);

export {
    signupLimiter,
    signinLimter,
    emailVerificationLimiter
}