import { Router } from "express";
import { signup, verifyEmail, signout } from "./auth.controller.js";
import { verifyJwt } from "../../middlewares/jwt.middlware.js";

const router = Router();

router.post("/signup", signup);
router.post("/verify-email", verifyJwt, verifyEmail);
router.post("/signout", verifyJwt, signout);

export default router;