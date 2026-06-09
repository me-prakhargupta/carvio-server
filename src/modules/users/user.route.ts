import { Router } from "express";
import { verifyJwt } from "../../middlewares/jwt.middlware.js";
import { getMatchedJobs, getJobs } from "./users.controller.js";

const router = Router();

router.get("/jobs/matched", verifyJwt, getMatchedJobs);
router.get("/jobs/explore", verifyJwt, getJobs)

export default router;