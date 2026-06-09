import { Router } from "express";
import { signup, signin } from "./auth.controller.js";
import { verifyJwt } from "../../middlewares/jwt.middlware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { signupSchema, signinSchema } from "./auth.validation.js";
import { signupLimiter, signinLimter } from "../../middlewares/rateLimiter.js";

const router = Router();

router.post("/signup", signupLimiter, validate(signupSchema) , signup);
router.post("/signin", signinLimter, validate(signinSchema), signin);

export default router;