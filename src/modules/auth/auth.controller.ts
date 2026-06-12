import User from "../users/users.model.js";
import { asyncHandler } from "../../shared/utills/asyncHandler.js";
import { ApiError } from "../../shared/utills/ApiError.js";
import { ApiResponse } from "../../shared/utills/ApiResponse.js";
import { Types } from "mongoose";
import { CookieOptions } from "express";
import { NODE_ENV } from "../../config/env.js";
import { generateCode, hashCode } from "../../shared/utills/code.js";
import { 
    sendWelcomeEmail,
    sendVerificationEmail,
    sendPasswordResetEmail
} from "../../infra/email/email.service.js";
import crypto from "node:crypto";
import { CLIENT_URI } from "../../config/env.js";

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

// const generateVerificationCode = async(userId: Types.ObjectId) => {
//     try {
//         const user = await User.findById(userId);
//         if(!user) {
//             throw new ApiError(401, "User does not exist.");
//         }

//         const genCode = generateCode();
//         const hashedCode = hashCode(genCode);

//         user.verificationCode = hashedCode;
//         user.verificationCodeExpiry = 
//             new Date(Date.now() + 5 * 60 * 1000);

//         await user.save({ validateBeforeSave: false });
//         sendVerificationEmail(user.fullname, genCode, user.email);
//     } catch(error) {
//         throw error;
//     }
// };

const signup = asyncHandler(async(req, res) => {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        throw new ApiError(409, 
            "An account with this email already exists."
        );
    }
    
    const user = await User.create({ fullname, email, password });

    const { accessToken, refreshToken } = 
        await generateAccessAndRefreshToken(user._id);

    // generateVerificationCode(user._id);
    sendWelcomeEmail(fullname, email);

    res.status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse( 201, "Account created successfully")
        );
});

const signin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        throw new ApiError(401, "Invalid email or password.");
    }

    const isMatched = await user.comparePassword(password);
    if(!isMatched) {
        throw new ApiError(401, "Invalid email or password.");
    }

    const { accessToken, refreshToken } = 
        await generateAccessAndRefreshToken(user._id);

    res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse( 200, "Signed in successfully")
        );
});

// export const signout = asyncHandler(async(req, res) => {
//     const userId = req.user?._id;

//     if(!userId) {
//         throw new ApiError(401, "User not found");
//     }

//     await User.findByIdAndUpdate(userId, {
//         $unset: { refreshToken: "" }
//     }, {
//         returnDocument: "after"
//     });

//     res.status(200)
//         .clearCookie("accessToken", cookieOptions)
//         .clearCookie("refreshToken", cookieOptions)
//         .json(new ApiResponse(200, "User logout successfully"));
// });

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.passwordResetToken = hashToken;
    user.passwordResetExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 Mins
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${CLIENT_URI}/accounts/password/confirm/${resetToken}`;

    await sendPasswordResetEmail(user.fullname, user.email, resetUrl);

    return res.status(200).json(
        new ApiResponse(
            200,
            "We sent an email with a link to get back into your account."
        )
    );
});

const confirmPassword = asyncHandler(async (req, res) => {
    const { resetToken } = req.params;

    if (Array.isArray(resetToken)) {
        throw new ApiError(401, "Invalid reset link");
    }

    const { password } = req.body;
    if(!password || password.lenght < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }

    const hashToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashToken,
        passwordResetExpiry: { $gt: Date.now() },
    });

    if(!user) {
        throw new ApiError(404, "Invalid reset link or expired");
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpiry = undefined;
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200, 
            "Password reset successful;"
        )
    );
});

// const verifyEmail = asyncHandler(async(req, res) => {
//     const { code } = req.body;

//     const userId = req.user?._id;

//     const user = await User.findById(userId);

//     if(!user) {
//         throw new ApiError(401, "User not found");
//     }

    
//     if(!user.verificationCode || !user.verificationCodeExpiry) {
//         throw new ApiError(400, "No verification request found");
//     }
    
//     if(user.verificationCodeExpiry < new Date()) {
//         throw new ApiError(401, "Code expired");
//     }

//     const hashedInput = hashCode(code);

//     if(hashedInput !== user.verificationCode) {
//         throw new ApiError(401, "Invalid code, try again.");
//     }

//     user.isVerified = true;
//     user.verificationCode = undefined;
//     user.verificationCodeExpiry = undefined;

//     await user.save();

//     res.status(200)
//         .json(new ApiResponse(200, "Email verified successfully"));
// });

export {
    signup, signin, forgotPassword, confirmPassword
}