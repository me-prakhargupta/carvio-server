import { Router } from "express";
import { setPreferences } from "./preferences.controller.js";
import { verifyJwt } from "../../middlewares/jwt.middlware.js";

const router = Router();

router.post("/", verifyJwt, setPreferences);

export default router;