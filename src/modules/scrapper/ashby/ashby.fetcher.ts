import axios from "axios";
import logger from "../../../config/logger.js";

export const fetchAshbyJobs = async(company: string) => {
    try {
        const res = await axios.get(
            `https://api.ashbyhq.com/posting-api/job-board/${company}?includeCompensation=true`
        );

        return res.data;
    } catch(error) {
        logger.error(
            `[SCRAPER: FETCH ASHBY]: Failed to fetch jobs for ${company}`
        );

        return [];
    }
};