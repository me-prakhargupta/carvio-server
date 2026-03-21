import { Types, Schema, model } from "mongoose";

export interface IPreference {  
    userId: Types.ObjectId;
    skills: string[];
    roles: string[];
    minStipend?: string;
    location?: string;
};

const preferencesSchema = new Schema<IPreference>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    roles: {
        type: [String],
        required: true,
    },
    minStipend: {
        type: String,
        default: "0",
        trim: true,
    },
    location: {
        type: String,
        deafult: "",
        trim: true,
    },
}, {
    timestamps: true
});

preferencesSchema.index({ userId: 1 });

const Preference = model<IPreference>("Preference", preferencesSchema);
export default Preference;