import { ingestInternshalaJobs } from "./internshala/internshala.ingestor.js";

export const runScrapper = async() => {
    try {
        await ingestInternshalaJobs();
    } catch(error) {
        console.log(`[SCRAPPER] Service Failed ${error}`);
    }
};