import jwt from "jsonwebtoken";
import { asyncHandler } from "../shared/utills/asyncHandler.js";
import { ApiError } from "../shared/utills/ApiError.js";
import { ACCESS_TOKEN_SECRET } from "../config/env.js";

declare global {
    namespace Express {
        interface Request {
            user?: { _id: string };
        }
    }
}

export const verifyJwt = asyncHandler(async(req, res, next) => {
    const token = req.cookies?.accessToken;

    if(!token) {
        throw new ApiError(401, "Token not found.")
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    if(!decoded || typeof decoded !== "object" || !("_id" in decoded)) {
        throw new ApiError(401, "Unauthorized.");
    }

    req.user = { _id: decoded._id };
    next();
});