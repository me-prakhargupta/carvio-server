import { 
    ingestInternshalaJobs 
} from "./internshala/internshala.ingestor.js";
import { 
    ingestGreenhouseJobs 
} from "./greenhouse/greenhouse.ingestor.js";
import { 
    ingestUnstopJobs 
} from "./unstop/unstop.ingestor.js";
import logger from "../../config/logger.js";

export const runScrapper = async() => {
    try {
        await ingestGreenhouseJobs();
        await ingestInternshalaJobs();
        await ingestUnstopJobs();
    } catch(error) {
        logger.error(
            `[SCRAPPER SERVICE] Service Failed ${error}`
        );
    }
};