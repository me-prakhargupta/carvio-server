import { Router } from "express";
import { verifyJwt } from "../../middlewares/jwt.middlware.js";
import { getMatchedJobs, getJobs } from "./jobs.controller.js";

const router = Router();

router.get("/matched", verifyJwt, getMatchedJobs);
router.get("/explore", verifyJwt, getJobs)

export default router;