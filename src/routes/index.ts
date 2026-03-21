import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import preferencesRoutes from "../modules/preferences/preferences.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/preferences", preferencesRoutes);

export default router;