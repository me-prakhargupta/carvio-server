import { REDIS_HOST, REDIS_PORT } from "./env.js";

export const redisConfig = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    maxRetriesPerRequest: null
};