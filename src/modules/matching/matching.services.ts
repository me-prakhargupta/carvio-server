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

// 🔧 utility (temporary safeguard — remove after DB cleanup)
const ensureString = (value: string | string[]): string => {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
};

export const matchJobsForUser = async(userId: Types.ObjectId): Promise<TMatch[]> => {
    try {
      // ✅ 1. Get user preferences
      const prefs = await Preference.findOne({ userId });
      if (!prefs) return [];

      // console.log("Prefs:", prefs);
      // ✅ 2. Pre-filter jobs (skills only)
      const jobs = await Job.find({
        skills: { $in: prefs.skills },
      }).limit(50);

      // console.log(jobs);
    const prefSkillsSet = new Set(prefs.skills);

    // ✅ 3. Matching + scoring
    const scoredJobs = jobs.map((job) => {
      // handle safety for skills
      const jobSkills = Array.isArray(job.skills)
        ? job.skills
        : [job.skills];

      const matchedSkills = jobSkills.filter((skill: string) =>
        prefSkillsSet.has(skill)
      );

      // role match (string vs array logic)
      const title = ensureString(job.title).toLowerCase();

const roleMatch = prefs.roles.some((role: string) =>
  title.includes(role.toLowerCase())
);

      let score = 0;

      score += matchedSkills.length * 2; // skills weight
      if (roleMatch) score += 3; // role weight

      return {
        job,
        score,
      };
    });

    // ✅ 4. Filter + sort + map to TMatch
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