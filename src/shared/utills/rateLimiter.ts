import rateLimit from "express-rate-limit";

type RateLimitOptions = {
    windowMs: number;
    max: number;
    message: string;
};

export const generateRateLimiter = ({
    windowMs,
    max,
    message
}: RateLimitOptions) => {
    return rateLimit({
        windowMs,
        max,
        message,
        legacyHeaders: false,
        standardHeaders: true
    });
};