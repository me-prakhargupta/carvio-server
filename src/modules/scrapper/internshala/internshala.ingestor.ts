import { domains } from "../../sources/internshala/sources.config.js";
import { fetchInternshalaJobs } from "./internshala.fetcher.js";
import { createJob } from "../../jobs/jobs.repository.js";
import { jobSchema } from "../../jobs/jobs.validation.js";

const parseDays = (value: string): boolean => {
    if(!value) return false;

    const lower = value.toLowerCase();
    if(
        lower.includes("today") || 
        lower.includes("hour") || 
        lower.includes("just now")
    ) {
        return true;
    }

    if(lower.includes("day")) {
        const match = lower.match(/\d+/);
        const days = match ? Number(match[0]) : 0;

        return days < 3;
    }

    return false;
};

export const ingestInternshalaJobs = async() => {
    let count = 0;
    for(const domain of domains) {
        const jobs = await fetchInternshalaJobs(domain);

        let created = 0;
        let skipped = 0;
        let failed = 0;

        for(const job of jobs) {
            try {
                const result = jobSchema.safeParse(job);
                if(result.success) {
                    if(!parseDays(result.data.postedAt as string)) {
                        skipped++;
                        continue;
                    }

                    await createJob(result.data);
                    created++;
                } else {
                    skipped++;
                }
            } catch(error) {
                failed++;
            }
        }
        count++;
    }
    console.log(`[SCRAPER: INTERNSHALA] Runned for ${count} domains`);
};