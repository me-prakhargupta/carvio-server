import { startCronJobs } from "./jobMatcher.js";

export const initScheduler = () => {
    startCronJobs();
};

initScheduler();