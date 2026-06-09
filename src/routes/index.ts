import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import preferencesRoutes from "../modules/preferences/preferences.routes.js";
import jobRoutes from "../modules/jobs/jobs.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/preferences", preferencesRoutes);
router.use("/jobs", jobRoutes);

export default router;