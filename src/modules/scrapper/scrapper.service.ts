import { 
    ingestInternshalaJobs 
} from "./internshala/internshala.ingestor.js";
import { 
    ingestGreenhouseJobs 
} from "./greenhouse/greenhouse.ingestor.js";
import { 
    ingestUnstopJobs 
} from "./unstop/unstop.ingestor.js";

export const runScrapper = async() => {
    try {
        await ingestGreenhouseJobs();
        await ingestInternshalaJobs();
        await ingestUnstopJobs();
    } catch(error) {
        console.log(
            `[SCRAPPER SERVICE] Service Failed ${error}`
        );
    }
};