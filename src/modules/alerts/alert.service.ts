import User from "../users/users.model.js";
import Notification from "../notifications/notification.model.js";
import { matchJobsForUser } from "../matching/matching.services.js";
import { sendPreferenceEmail } from "../../infra/email/email.service.js";
import { TJobs } from "../../infra/email/email.template.js";

export const runMatchingPipeline = async() => {
    try {
        const users = await User.find({
            isVerified: true
        });
        let emailSentCount = 0;
        for(const user of users) {
            const matches = await matchJobsForUser(user._id);
            let emailPayload: TJobs[] = [];

            for(const match of matches) {
                try {
                    await Notification.create({
                        userId: user._id,
                        jobId: match.jobId
                    });

                    emailPayload.push({
                        title: match.title,
                        company: match.company,
                        location: match.location,
                        stipend: match.stipend,
                        postedAt: match.postedAt,
                        absoluteUrl: match.absoluteUrl
                    });

                } catch(error: any) {
                    if (error.code === 11000) {
                        continue;   
                    }
                    throw error;
                }
            }

            if(emailPayload.length > 0) {
                sendPreferenceEmail(user.email, emailPayload);
                emailSentCount++;
                return;
            }
        }

        console.log(`[EMAIL] Sent ${emailSentCount} emails`)
    } catch(error) {
        console.log("[PIPELINE] Matching Failed")
    }
};