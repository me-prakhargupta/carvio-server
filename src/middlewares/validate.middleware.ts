import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../shared/utills/ApiError.js";

export const validate = (schema: ZodType) => 
    (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if(!result.success) {
        const zodIssue = result.error.issues[0]?.message || 
        "Something went wrong";

        return next(
            new ApiError(400, `[ZOD] Validation Failed ${zodIssue}`)
        )
    }

    req.body = result.data;
    next();
};