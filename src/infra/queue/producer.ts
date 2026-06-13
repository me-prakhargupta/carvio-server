import { Queue } from "bullmq";
import { redisConfig } from "../../config/redis.js";

const welcomeEmailQueue = new Queue("welcomeEmailQueue", { 
    connection: redisConfig 
});

export {
    welcomeEmailQueue
};