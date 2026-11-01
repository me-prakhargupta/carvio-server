import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import preferencesRoutes from "../modules/preferences/preferences.routes.js";
import userRoutes from "../modules/users/user.route.js";
import { triggerScraper } from "../modules/scraper/scraper.service.js";

const router = Router();

router.get("/schedule/:cronSecret", triggerScraper);
router.use("/auth", authRoutes);
router.use("/preferences", preferencesRoutes);
router.use("/user", userRoutes);

export default router;