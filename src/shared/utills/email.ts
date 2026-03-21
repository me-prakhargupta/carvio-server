import { Resend } from "resend";
import { RESEND_API_KEY } from "../../config/env.js";

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async(
    email: string, subject: string, html: string
) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject,
            html
        });
    } catch (error) {
        console.error("Email send failed:", error);
    }
};