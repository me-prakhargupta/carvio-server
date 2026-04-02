import { Types } from "mongoose";
import Preference from "../preferences/preferences.model.js";
import Job from "../jobs/jobs.model.js";

export type TMatch = {
  jobId: Types.ObjectId;
  title: string;
  company: string;
  location: string;
  stipend: string;
  postedAt: string;
  absoluteUrl: string;
};

const ensureString = (value: string | string[]): string => {
    if (Array.isArray(value)) return value[0] || "";

    return value || "";
};

export const matchJobsForUser = async(
    userId: Types.ObjectId
): Promise<TMatch[]> => {
    try {
        const prefs = await Preference.findOne({ userId });
        if (!prefs) return [];

        const jobs = await Job.find({}).limit(200);

        const prefSkillsSet = new Set(prefs.skills);

        const scoredJobs = jobs.map((job) => {  
            const jobSkills = Array.isArray(job.skills)
            ? job.skills : [job.skills];

            const matchedSkills = jobSkills.filter((
              skill: string
            ) => prefSkillsSet.has(skill));

            const title = ensureString(job.title).toLowerCase();

            const roleMatch = prefs.roles.some((
                role: string
            ) => title.includes(role.toLowerCase()));

            let score = 0;
            score += matchedSkills.length * 2;
            if (roleMatch) score += 3;

            return {
                job,
                score,
            };
        });

        return scoredJobs
            .filter((r) => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .map((r): TMatch => ({
                jobId: r.job._id as Types.ObjectId,
                title: ensureString(r.job.title),
                company: ensureString(r.job.company),
                location: ensureString(r.job.location),
                stipend: ensureString(r.job.stipend),
                postedAt: ensureString(r.job.postedAt),
                absoluteUrl: ensureString(r.job.absoluteUrl),
        }));

    } catch (error) {
        console.error("Matching error:", error);
        throw error;
    }
};