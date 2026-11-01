import { ingestInternshalaJobs } from "./internshala/internshala.ingestor.js";
import { ingestGreenhouseJobs } from "./greenhouse/greenhouse.ingestor.js";
import { ingestUnstopJobs } from "./unstop/unstop.ingestor.js";
import { ingestLeverJobs } from "./lever/lever.ingestor.js";
import { ingestAshbyJobs } from "./ashby/ashby.ingestor.js";
import logger from "../../config/logger.js";
import { asyncHandler } from "../../shared/utills/asyncHandler.js";
import { TRIGGER_SCRAPER_KEY } from "../../config/env.js";
import { ApiError } from "../../shared/utills/ApiError.js";
import { ApiResponse } from "../../shared/utills/ApiResponse.js";

const runScraper = async() => {
    try {
        await ingestGreenhouseJobs();
        await ingestInternshalaJobs();
        await ingestUnstopJobs();
        // await ingestLeverJobs();
        // await ingestAshbyJobs();

        return "Scraping Completed";
    } catch(error) {
        logger.error(
            `[SCRAPER SERVICE] Service Failed ${error}`
        );

        return "Failed to Scrape data";
    }
};

const triggerScraper = asyncHandler(async(req, res) => {
    const recieved = req.params.cronSecret;
    const expected = TRIGGER_SCRAPER_KEY;

    if(recieved !== expected) {
        throw new ApiError(401, "Unauthorized");
    }

    runScraper();
    res.status(202).json(
        new ApiResponse(202, "Scraper triggered and started in background")
    );
});

export { runScraper, triggerScraper };