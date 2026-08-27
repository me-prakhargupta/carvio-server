import logger from "../../../config/logger.js";
import { ashbySources } from "../../sources/ashby/ashby.sources.js"
import { fetchAshbyJobs } from "./ashby.fetcher.js";
import { transformAshbyJobs } from "./ashby.transformer.js";

export const ingestAshbyJobs = async() => {
    let companyCount = 0;
    for(const company of ashbySources) {
        const jobs = await fetchAshbyJobs(company);

        for(const job of jobs) {
            try {
                const transformed = await transformAshbyJobs(jobs, company);

            } catch(error) {
                logger.error(
                    `[SCRAPER: ASHBY] Job Failed for ${company}`
                );
            }
        }
        companyCount++;
    }
    logger.info(`[SCRAPER: ASHBY] Runned for ${companyCount} companies.`);
};