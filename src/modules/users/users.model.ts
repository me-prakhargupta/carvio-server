import { Document, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { 
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY
} from "../../config/env.js";

interface IUser extends Document {
    fullname: string;
    email: string;
    verificationCode?: string;
    verificationCodeExpiry?: Date;
    isVerified: boolean;
    refreshToken: string;

    generateAccessToken(): string;
    generateRefreshToken(): string;
};

const userSchema = new Schema<IUser>({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    verificationCode: {
        type: String,
    },
    verificationCodeExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
});

userSchema.methods.generateAccessToken = function(this: IUser) {
    return jwt.sign({
        _id: this._id.toString(),
        email: this.email,
    }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY
    });
};

userSchema.methods.generateRefreshToken = function(this: IUser) {
    return jwt.sign({
        _id: this._id
    }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY
    });
};

const User = model<IUser>("User", userSchema);
export default User;