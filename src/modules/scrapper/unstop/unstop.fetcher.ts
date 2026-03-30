import axios from "axios";

export const fetchUnstopJobs = async(role: string) => {
    try {
        const res = await axios.get(
            `https://unstop.com/api/public/opportunity/search-result?opportunity=internships&quickApply=true&roles=${role}`
        );

        return res.data.data.data;
    } catch(error) {
        console.log(
            `[SCRAPER: FETCH UNSTOP] Failed to fetch jobs for `
        );

        return [];
    }
};