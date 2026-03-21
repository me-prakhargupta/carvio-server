// import { JobType } from "../jobs.validation.js";
// import { matchJob } from "./matching.services.js";
// import { 
//     IPreference 
// } from "../../preferences/preferences.model.js";

// export const rankJobs = (jobs: JobType[], userPrefs: IPreference) => {
//     return jobs
//         .map((job) => {
//             const match = matchJob(job, userPrefs);
//             return { ...job, ...match };
//         });
// };