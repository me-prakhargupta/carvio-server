export const isRecentJob = (job: any): boolean => {
    if(!job.updated_at) {
        return false;
    }

    const postedDate = new Date(job.updated_at);
    const now = new Date();

    const diffInDays = (
        (now.getTime() - postedDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return diffInDays <= 14;
};