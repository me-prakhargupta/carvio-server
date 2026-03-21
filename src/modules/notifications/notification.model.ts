import { Types, Schema, model } from "mongoose";

interface INotification {
    userId: Types.ObjectId;
    jobId: Types.ObjectId;
};

const notificationSchema = new Schema<INotification>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
}, {
    timestamps: true,
});

notificationSchema.index({ userId: 1, jobId: 1 }, { unique: true });

const Notification = model<INotification>("Notification", notificationSchema);
export default Notification;