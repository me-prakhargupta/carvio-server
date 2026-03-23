import { JobType } from "../../jobs/jobs.validation.js";

export const transformGreenhouseJobs = (
    job: JobType, 
    company: string
) => ({
    title: job.title,
    company,
    location: typeof job.location === "object" && 
        job.location !== null ? (job.location as any).name : 
        job.location,
    skillsRequired: [],
    source: "Greenhouse",
    externalId: job.id,
    absoluteUrl: job.absolute_url,
    postedAt: job.updated_at,
});