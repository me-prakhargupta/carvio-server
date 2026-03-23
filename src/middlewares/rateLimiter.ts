import { generateRateLimiter } from "../shared/utills/rateLimiter.js";
import { rateLimitConfig } from "../config/rateLimitConfig.js";

export const emailVerificationLimiter = generateRateLimiter(
    rateLimitConfig.emailVerification
);