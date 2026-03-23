import axios from "axios";

export const fetchGreenhouseJobs = async(company: string) => {
    try {
        const res = await axios.get(
            `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`
        );
        
        return res.data.jobs;
    } catch(error) {
        console.log(
            `[SCRAPER: FETCH GREENHOUSE] Failed to fetch jobs for ${company}`
        );
        return [];
    }
};