import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import preferencesRoutes from "../modules/preferences/preferences.routes.js";
import userRoutes from "../modules/users/user.route.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/preferences", preferencesRoutes);
router.use("/user", userRoutes);

export default router;