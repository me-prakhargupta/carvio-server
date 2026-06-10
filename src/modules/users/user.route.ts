import { Router } from "express";
import { verifyJwt } from "../../middlewares/jwt.middlware.js";
import { 
    getMatchedJobs, getJobs, 
    getSaved, saveJob, revertSaveJob,
    getApplications, markApplication, revertMarkApplication
} from "./users.controller.js";

const router = Router();

router.get("/jobs/matched", verifyJwt, getMatchedJobs);
router.get("/jobs/explore", verifyJwt, getJobs);

router.get("/jobs/saved", verifyJwt, getSaved);
router.post("/jobs/saved/:jobId", verifyJwt, saveJob);
router.delete("/jobs/saved/:jobId", verifyJwt, revertSaveJob);

router.get("/jobs/applications", verifyJwt, getApplications);
router.post("/jobs/application/:jobId", verifyJwt, markApplication);
router.delete("/jobs/application/:jobId", verifyJwt, revertMarkApplication);

export default router;