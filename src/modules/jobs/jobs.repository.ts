import Job from "./jobs.model.js";
import { JobType } from "./jobs.validation.js";

export const createJob = async(data: JobType) => {
    try {
        const job = await Job.create(data);
        return job;
    } catch(error: any) {
        if(error.code === 11000) {
            return null;
        }
        throw error;
    }
};