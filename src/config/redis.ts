import { Redis } from "ioredis";
import { REDIS_URI } from "./env.js";
import logger from "./logger.js";

export const redisConfig = new Redis(
    REDIS_URI, 
    { 
        maxRetriesPerRequest: null,
        connectTimeout: 60000,
        lazyConnect: false,
    }
);

redisConfig.on("connect", () => {
    logger.info("[REDIS] Connect");
});

redisConfig.on("ready", () => {
    logger.info("[REDIS] Ready");
});

redisConfig.on("reconnecting", () => {
    logger.info("[REDIS] Reconnecting");
});

redisConfig.on("error", (error) => {
    logger.error(`[REDIS] Error ${error}`);
});