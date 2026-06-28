import pino from "pino";
import { LOG_LEVEL, NODE_ENV } from "./env.js";

const logger = pino({
    level: LOG_LEVEL,
    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "password",
            "token",
            "accessToken",
            "refreshToken",
        ],
        censor: "[REDACTED]"
    },
    transport: NODE_ENV !== "production"
        ? {
            target: "pino-pretty",
            options: {
                colorize: true,
                translateTime: "SYS:standard"
            },
        }
        : undefined
});

export default logger;