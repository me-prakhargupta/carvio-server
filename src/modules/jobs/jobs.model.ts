import { Schema, model } from "mongoose";
import { JobType } from "./jobs.validation.js";

const jobSchema = new Schema<JobType>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
        index: true,
    },
    skills: {
        type: [String],
    },
    source: {
        type: String,
        required: true,
        trim: true,
    },
    externalId: {
        type: String,
        unique: true,
    },
    absoluteUrl: {
        type: String,
        required: true,
    },
    stipend: {
        type: String,
        default: "",
    },
    postedAt: {
        type: String,
        default: "",
    }
}, {
    timestamps: true,
});

jobSchema.index(
    { externalId: 1, source: 1 }, 
    { unique: true }
);

jobSchema.index(
    { createdAt: 1}, 
    { expireAfterSeconds: 60 * 60 * 24 * 3 }
);

const Job = model<JobType>("Job", jobSchema);
export default Job;