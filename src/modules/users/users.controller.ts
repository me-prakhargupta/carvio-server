import { asyncHandler } from "../../shared/utills/asyncHandler.js";
import { ApiError } from "../../shared/utills/ApiError.js";
import { ApiResponse } from "../../shared/utills/ApiResponse.js";
import { matchJobsForUser } from "../matching/matching.services.js";
import User from "../users/users.model.js";
import Job from "../jobs/jobs.model.js";

const getMatchedJobs = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "Please Sign in to continue");
    }

    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const matches = await matchJobsForUser(user._id);
    if(!matches.length) {
        return res.status(200).json(
            new ApiResponse(
                200, 
                "There are currently no new openings that match your preferences."
            )
        );
    }

    const payload = matches.map(match => ({
        _id: match.jobId,
        title: match.title,
        logo: match.logo,
        company: match.company,
        location: match.location,
        stipend: match.stipend,
        postedAt: match.postedAt,
        absoluteUrl: match.absoluteUrl
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            "Matching opportunities retrieved successfully.",
            payload
        )
    );
});

const getJobs = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "Please Sign in to continue");
    }

    const jobs = await Job.find().lean();
    const opportunities = jobs.map(match => ({
        _id: match._id,
        title: match.title,
        logo: match.logo,
        company: match.company,
        location: match.location,
        stipend: match.stipend,
        postedAt: match.postedAt,
        absoluteUrl: match.absoluteUrl
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            "Opportunities retrieved successfully.",
            opportunities
        )
    );
});

const getSaved = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "Please sign in to continue");
    }

    const user = await User.findById(userId).populate("saved");
    if(!user) {
        throw new ApiError(404, "User not found");
    }
    
    return res.status(200).json(
        new ApiResponse(
            200, 
            "Saved opportunities fetched successfully",
            user.saved
        )
    );
});

const saveJob = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const { jobId } = req.params;

    if(!userId) {
        throw new ApiError(401, "Please sign in to continue");
    }

    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(404, "User not found");
    }
    
    const job = await Job.findById(jobId);
    if(!job) {
        throw new ApiError(404, "Job not found");
    }
    await User.findByIdAndUpdate(
        userId, {
            $addToSet: {
                saved: job._id,
            },
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200, 
            "Added to your Saved"
        )
    );
});

const revertSaveJob = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "Please sign in to continue");
    }

    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const job = await Job.findById(jobId);
    if(!job) {
        throw new ApiError(404, "Job not found");
    }
    
    await User.findByIdAndUpdate(
        userId, {
            $pull: { saved: jobId },
        },
    );

    return res.status(200).json(
        new ApiResponse(
            200, 
            "Removed from your Saved"
        )
    );
});

const getApplications = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "Please sign in to continue");
    }

    const user = await User.findById(userId).populate("applications");
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200, 
            "Applications fetched successfully",
            user.applications
        )
    );
});

const markApplication = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "Please sign in to continue");
    }

    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const job = await Job.findById(jobId);
    if(!job) {
        throw new ApiError(404, "Job not found");
    }

    await User.findByIdAndUpdate(
        userId, {
            $addToSet: {
                applications: job._id
            },
        },
    );

    return res.status(200).json(
        new ApiResponse(
            200, 
            "Added to your Applications"
        )
    );
});

const revertMarkApplication = asyncHandler(async (req, res) => {
    const { jobId } = req.params;

    const userId = req.user?._id;
    if(!userId) {
        throw new ApiError(401, "PLease sign in to continue");
    }

    const user = await User.findById(userId);
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const job = await Job.findById(jobId);
    if(!job) {
        throw new ApiError(404, "Job not found");
    }

    await User.findByIdAndUpdate(
        userId, {
            $pull: { applications: jobId },
        },
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            "This opportunity removed from applications"
        )
    )
});

export {
    getMatchedJobs,
    getJobs,
    getSaved,
    saveJob,
    revertSaveJob,
    getApplications,
    markApplication,
    revertMarkApplication
};