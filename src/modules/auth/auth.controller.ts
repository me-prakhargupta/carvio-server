import User from "../users/users.model.js";
import { asyncHandler } from "../../shared/utills/asyncHandler.js";
import { ApiError } from "../../shared/utills/ApiError.js";
import { ApiResponse } from "../../shared/utills/ApiResponse.js";
import { Types } from "mongoose";
import { CookieOptions } from "express";
import { NODE_ENV } from "../../config/env.js";
import { generateCode, hashCode } from "../../shared/utills/code.js";
import { sendVerificationEmail } from "../../infra/email/email.service.js";

type Tokens = {
    accessToken: string;
    refreshToken: string;
};

const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/"
}

const generateAccessAndRefreshToken = 
    async(userId: Types.ObjectId): Promise<Tokens> => {
    try {
        const user = await User.findById(userId);

        if(!user) {
            throw new ApiError(401, "User does not exist.");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch(error) {
        throw new ApiError(500, "Failed to generate authentication tokens.");
    }
};

const generateVerificationCode = async(userId: Types.ObjectId) => {
    try {
        const user = await User.findById(userId);
        if(!user) {
            throw new ApiError(401, "User does not exist.");
        }

        const genCode = generateCode();
        const hashedCode = hashCode(genCode);

        user.verificationCode = hashedCode;
        user.verificationCodeExpiry = 
            new Date(Date.now() + 5 * 60 * 1000);

        await user.save({ validateBeforeSave: false });
        sendVerificationEmail(user.fullname, genCode, user.email);
    } catch(error) {
        console.log(error);
        throw error;
    }
};

export const signup = asyncHandler(async(req, res) => {
    const { fullname, email } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        throw new ApiError(409, 
            "An account with this email or username already exists."
        );
    }
    
    const user = await User.create({ fullname, email });

    const { accessToken, refreshToken } = 
        await generateAccessAndRefreshToken(user._id);

    generateVerificationCode(user._id);

    res.status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse( 201, "Account created successfully")
        );
});

export const verifyEmail = asyncHandler(async(req, res) => {
    const { code } = req.body;

    const userId = req.user?._id;

    const user = await User.findById(userId);

    if(!user) {
        throw new ApiError(401, "User not found");
    }

    
    if(!user.verificationCode || !user.verificationCodeExpiry) {
        throw new ApiError(400, "No verification request found");
    }
    
    if(user.verificationCodeExpiry < new Date()) {
        throw new ApiError(401, "Code expired");
    }

    const hashedInput = hashCode(code);

    if(hashedInput !== user.verificationCode) {
        throw new ApiError(401, "Invalid code, try again.");
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;

    await user.save();

    res.status(200)
        .json(new ApiResponse(200, "Email verified successfully"));
});

export const signout = asyncHandler(async(req, res) => {
    const userId = req.user?._id;

    if(!userId) {
        throw new ApiError(401, "User not found");
    }

    await User.findByIdAndUpdate(userId, {
        $unset: { refreshToken: "" }
    }, {
        returnDocument: "after"
    });

    res.status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, "User logout successfully"));
});