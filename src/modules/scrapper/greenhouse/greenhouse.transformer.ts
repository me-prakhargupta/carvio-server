export const transformGreenhouseJobs = (job: any, company: string) => ({
    title: job.title,
    company,
    location: job.location?.name || "Unknown",
    skillsRequired: [],
    source: "Greenhouse",
    externalId: job.id,
    absoluteUrl: job.absolute_url,
    postedAt: new Date(job.updated_at)
});