import Job from "./jobs.model.js";
import { JobType } from "./jobs.validation.js";
import { normalizeSkills } from "../../shared/utills/normalizeSkills.js";

export const createJob = async(data: JobType) => {
    try {

        const normalizedSkills = normalizeSkills(data.skills);

        const job = await Job.create({
            ...data,
            skills: normalizedSkills
        });

        return job;
    } catch(error: any) {
        if(error.code === 11000) {
            return null;
        }
        throw error;
    }
};