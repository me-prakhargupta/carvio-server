import { 
    greenhouseSources 
} from "../../sources/greenhouse/greenhouse.sources.js";
import { fetchGreenhouseJobs } from "./greenhouse.fetcher.js";
import { 
    isRecentJob, 
    isIndian,
    isRelevantJob,
    timeAgo
} from "../../jobs/jobs.filters.js";
import { transformGreenhouseJobs } from "./greenhouse.transformer.js";
import { createJob } from "../../jobs/jobs.repository.js";
import logger from "../../../config/logger.js";

export const ingestGreenhouseJobs = async() => {
    let companyCount = 0;
    for(const company of greenhouseSources) {
        const jobs = await fetchGreenhouseJobs(company);

        for(const job of jobs) {
            try {
                const transformed = transformGreenhouseJobs(job, company);

                if(!isRecentJob(transformed.postedAt as string)) continue;                
                if(!isIndian(transformed.location)) continue;
                if(!isRelevantJob(transformed.title as string)) continue;

                const daysAgo = timeAgo(transformed.postedAt as string);
                await createJob({
                    ...transformed,
                    postedAt: daysAgo
                });
            } catch(error) {
                logger.error(
                    `[SCRAPER: GREENHOUSE] Job failed for ${company}`
                );
            }        
        }
        companyCount++;
    }
    logger.info(`[SCRAPER: GREENHOUSE] Runned for ${companyCount} companies`);
};