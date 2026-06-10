import { Document, Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../../config/env.js";
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
    password: string;
    saved: Types.ObjectId[];
    applications: Types.ObjectId[];
    verificationCode?: string;
    verificationCodeExpiry?: Date;
    isVerified: boolean;
    refreshToken: string;

    comparePassword(password: string): Promise<boolean>;
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
    password: {
        type: String,
        required: true,
        minlength: [7, "Password must be at least 7 characters long"],
        maxlength: [21, "Password must be at most 21 characters long"],
    },
    saved: {
        type: [Schema.Types.ObjectId],
        ref: "Job"
    },
    applications: {
        type: [Schema.Types.ObjectId],
        ref: "Job"
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

userSchema.pre("save", async function() {
    try {
        if(!this.isModified("password")) return;

        this.password = await bcrypt.hash(this.password, SALT_ROUND);
    } catch(error) {
        console.log("Error while saving password: ", error);
    }
});

userSchema.methods.comparePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};

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