import { ingestInternshalaJobs } from "./internshala/internshala.ingestor.js";
import { ingestGreenhouseJobs } from "./greenhouse/greenhouse.ingestor.js";
import { ingestUnstopJobs } from "./unstop/unstop.ingestor.js";
import { ingestLeverJobs } from "./lever/lever.ingestor.js";
import { ingestAshbyJobs } from "./ashby/ashby.ingestor.js";
import logger from "../../config/logger.js";

export const runScraper = async() => {
    try {
        await ingestGreenhouseJobs();
        await ingestInternshalaJobs();
        await ingestUnstopJobs();
        // await ingestLeverJobs();
        // await ingestAshbyJobs();
    } catch(error) {
        logger.error(
            `[SCRAPER SERVICE] Service Failed ${error}`
        );
    }
};