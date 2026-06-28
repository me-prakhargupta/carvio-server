import { Worker } from "bullmq";
import { sendEmail } from "../../shared/utills/email.js";
import { redisConfig } from "../../config/redis.js";
import logger from "../../config/logger.js";

const worker = new Worker("welcomeEmailQueue", async job => {
    await sendEmail(
        job.data.email, 
        job.data.subject, 
        job.data.html
    );
}, { connection: redisConfig });

worker.on("ready", () => {
    logger.info("[WORKER] Ready");
});

worker.on("completed", (job) => {
    logger.info(`[WORKER] Completed ${job.id}`);
});

worker.on("failed", (job, error) => {
    logger.error(`[WORKER] Failed ${job?.id} ${error}`);
});

worker.on("error", (error) => {
    logger.error(`[WORKER] Error ${error}`);
});