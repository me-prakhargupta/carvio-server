import { leverSources } from "../../sources/lever/lever.sources.js"
import { fetchLeverJobs } from "./lever.fetcher.js";
import { transformLeverJobs } from "./lever.transformer.js";
import logger from "../../../config/logger.js";

export const ingestLeverJobs = async() => {
    let companyCount = 0;
    for(const company of leverSources) {
        const jobs = await fetchLeverJobs(company);

        for(const job of jobs) {
            try {
                const transformed = await transformLeverJobs(job, company);
                
            } catch(error) {
                logger.error(
                    `[INGESTOR: LEVER] Job failed for ${company}`
                );
            }
        }
        companyCount++;
    }

    logger.info(`[INGESTOR: LEVER Runned for ${companyCount} companies.`);
};