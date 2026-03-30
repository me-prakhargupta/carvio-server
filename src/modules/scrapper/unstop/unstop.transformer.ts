import { JobType } from "../../jobs/jobs.validation.js";

export const transformUnstopJobs = (
    job: JobType
) => ({
    title: job.title,
    company: (job.organisation as any).name,
    // location: (job.locations[0] as any).city,
    skills: [],
    source: "Unstop",
    stipend: (job.jobDetail as any).min_salary,
    externalId: job.id,
    absoluteUrl: `https://unstop.com/${job.public_url}`,
    postedAt: job.updated_at,
});