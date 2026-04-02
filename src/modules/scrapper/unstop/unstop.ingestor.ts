import { roles } from "../../sources/unstop/unstop.sources.js";
import { fetchUnstopJobs } from "./unstop.fetcher.js";
import { 
    isRecentJob,
    timeAgo
} from "../../jobs/jobs.filters.js";
import { transformUnstopJobs } from "./unstop.transformer.js";
import { createJob } from "../../jobs/jobs.repository.js";

export const ingestUnstopJobs = async() => {
    let rolesCount = 0;

    for(const role of roles) {
        try {
            const jobs = await fetchUnstopJobs(role);
        
            for(const job of jobs) {
                try {
                    const transformed = transformUnstopJobs(job);

                    if(!isRecentJob(transformed.postedAt as string)) continue;

                    const daysAgo = timeAgo(transformed.postedAt as string);
                    await createJob({
                        ...transformed,
                        postedAt: daysAgo
                    });

                } catch(error) {
                    console.error(
                        `[SCRAPER: UNSTOP] Job failed for ${role}`
                    );
                }
            }
            rolesCount++;
        } catch(error) {
            console.log(`[SCRAPER: UNSTOP] Fetch failed for ${role}`);
        }
    }

    console.log(`[SCRAPER: UNSTOP] Runned for ${rolesCount} roles`);
};