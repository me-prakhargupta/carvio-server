import { Worker } from "bullmq";
import { sendEmail } from "../../shared/utills/email.js";
import { redisConfig } from "../../config/redis.js";

const worker = new Worker("welcomeEmailQueue", async job => {
    await sendEmail(
        job.data.email, 
        job.data.subject, 
        job.data.html
    );
}, { connection: redisConfig });

worker.on("ready", () => {
    console.log("[WORKER] Ready");
});

worker.on("completed", (job) => {
    console.log(`[WORKER] Completed ${job.id}`);
});

worker.on("failed", (job, error) => {
    console.log(`[WORKER] Failed ${job?.id}`, error);
});

worker.on("error", (error) => {
    console.log("[WORKER] Error", error);
});