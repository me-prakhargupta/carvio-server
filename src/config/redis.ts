import { Redis } from "ioredis";
import { REDIS_URI } from "./env.js";

export const redisConfig = new Redis(
    REDIS_URI, 
    { 
        maxRetriesPerRequest: null,
        connectTimeout: 60000,
        lazyConnect: false,
    }
);

redisConfig.on("connect", () => {
    console.log("[REDIS] Connect");
});

redisConfig.on("ready", () => {
    console.log("[REDIS] Ready");
});

redisConfig.on("reconnecting", () => {
    console.log("[REDIS] Reconnecting");
});

redisConfig.on("error", (error) => {
    console.log("[REDIS] Error", error);
});