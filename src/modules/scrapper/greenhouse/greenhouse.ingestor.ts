import { greenhouseSources } from "../../sources/greenhouse/sources.config.js";
import { fetchGreenhouseJobs } from "./greenhouse.fetcher.js";
import { isRecentJob } from "../../jobs/jobs.filters.js";
import { transformGreenhouseJobs } from "./greenhouse.transformer.js";
import { createJob } from "../../jobs/jobs.repository.js";

export const ingestGreenhouseJobs = async() => {
    let companyCount = 0;
    for(const company of greenhouseSources) {
        const jobs = await fetchGreenhouseJobs(company);

        let created = 0;
        let skipped = 0;
        let failed = 0;

        // for(const job of jobs) {
        //     try {
        //         if(!isRecentJob(job)) {
        //             continue;
        //         }

        //         const transformed = 
        //             await transformGreenhouseJobs(job, company);

        //         const result = await createJob(transformed);
        //         if(result) {
        //             created++;
        //         } else {
        //             skipped++;
        //         }
        //     } catch(error) {
        //         failed++;
        //         console.error(`[SCRAPER] Job failed for ${company}`);
        //     }        
        // }
        console.log(
            `[SCRAPER] ${company} created: ${created}, skipped: ${skipped}, failed: ${failed}`
        );

        companyCount++;
    }

    console.log(`[SCRAPER] Runned for ${companyCount} companies`);
};