import cron from "node-cron";
import { runScrapper } from "../../modules/scrapper/scrapper.service.js";
import { runMatchingPipeline } from "../../modules/alerts/alert.service.js";

let isRunning = false;

export const startCronJobs = async () => {
    console.log("[SCHEDULER] Initialized.");

    cron.schedule("0 0 9,14,21 * * *", async() => {
        if(isRunning) {
            console.log("[SCHEDULER] Skipping overlapping run.");
            return;
        }

        const start = Date.now()
        try {
            isRunning = true;
            console.log("[SCHEDULER] Job started");

            await runScrapper();
            await runMatchingPipeline();

            console.log(`[SCHEDULER] Completed in ${Date.now() - start}ms`);
        } catch(error) {
            console.error("[SCHEDULER] Failed:", error);
        } finally {
            isRunning = false;
        }
    }, {
        timezone: "Asia/Kolkata"
    });
};
