import axios from "axios";
import * as cheerio from "cheerio";
import { JobType } from "../../jobs/jobs.validation.js";

export const fetchInternshalaJobs = async(domain: string) => {
    try {
        const res = await axios.get(
            `https://internshala.com/internships/${domain}/`,
            {
                headers: {
                    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36',
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'accept-language': 'en-US,en;q=0.5',
                    'referer': 'https://internshala.com/',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'same-origin',
                    'upgrade-insecure-requests': '1',
                }
            }
        );

        const $ = cheerio.load(res.data);
        const jobs: JobType[]  = [];
        $(".individual_internship").each((i, el) => {
            const title = $(el).find(".job-internship-name a").text().trim();
            const company = $(el).find(".company-name").text().trim();
            const location = $(el).find(".locations a").text().trim();
            const skills = $(el)
                .find(".job_skill")
                .map((_, el) => $(el).text().trim())
                .get();
            const externalId = $(el).attr("internshipid") || `https://internshala.com${$(el).attr("data-href")}`;
            const absoluteUrl = `https://internshala.com${$(el).attr("data-href")}`;
            const stipend = $(el).find(".stipend").text().trim();
            const postedAt = $(el).find(".color-labels .status-success span").text().trim();

            const job = {
                title,
                company,
                location,
                skills,
                source: "Internshala",
                externalId,
                absoluteUrl,
                stipend,
                postedAt
            };
            jobs.push(job);
        });

        return jobs;
    } catch(error) {
        console.log("[SCRAPER] Failed to fetch jobs");
        return [];
    }
};