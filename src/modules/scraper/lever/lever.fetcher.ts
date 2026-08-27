import axios from "axios";
import logger from "../../../config/logger.js";

export const fetchLeverJobs = async(company: string) => {
    try {
        const res = await axios.get(
            `https://api.lever.co/v0/postings/${company}?mode=json`
        );

        return res.data;
    } catch(error) {
        logger.error(
            `[SCRAPER: FETCH LEVER] Failed to fetch jobs for ${company}`
        );

        return [];
    }
};