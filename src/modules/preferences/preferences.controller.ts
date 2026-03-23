import User from "../users/users.model.js";
import Preference from "./preferences.model.js";
import { asyncHandler } from "../../shared/utills/asyncHandler.js";
import { ApiError } from "../../shared/utills/ApiError.js";
import { ApiResponse } from "../../shared/utills/ApiResponse.js";
import { normalizeSkills } from "../../shared/utills/normalizeSkills.js";

export const setPreferences = asyncHandler(async(req, res) => {
    const { skills, roles, minStipend, location } = req.body;
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if(!user) {
        throw new ApiError(
            404, "User does not exist."
        );
    }

    const normalizedkills = normalizeSkills(skills);
    await Preference.create({ 
        userId, 
        skills: normalizedkills, 
        roles, 
        minStipend, 
        location 
    });

    res.status(201)
        .json(
            new ApiResponse(
                201, 
                "Your preference have been saved"
            )
        );
});