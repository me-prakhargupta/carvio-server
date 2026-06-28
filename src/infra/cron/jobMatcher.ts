import cron from "node-cron";
import logger from "../../config/logger.js";
import { runScrapper } from "../../modules/scrapper/scrapper.service.js";
import { runMatchingPipeline } from "../../modules/alerts/alert.service.js";

let isRunning = false;

export const startCronJobs = async () => {
    logger.info("[SCHEDULER] Initialized.");

    cron.schedule("0 0 9,14,21 * * *", async() => {
        if(isRunning) {
            logger.warn("[SCHEDULER] Skipping overlapping run.");
            return;
        }

        const start = Date.now()
        try {
            isRunning = true;
            logger.info("[SCHEDULER] Job started");

            await runScrapper();
            await runMatchingPipeline();

            logger.info(`[SCHEDULER] Completed in ${Date.now() - start}ms`);
        } catch(error) {
            logger.error(`[SCHEDULER] Failed: ${error}`);
        } finally {
            isRunning = false;
        }
    }, {
        timezone: "Asia/Kolkata"
    });
};
