import nodeMailer from "nodemailer";
import { SYSTEM_EMAIL, SYSTEM_EMAIL_PASS} from "../../config/env.js";

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: SYSTEM_EMAIL,
        pass: SYSTEM_EMAIL_PASS,
  },
});

export const sendEmail = async(
    email: string, subject: string, html: string
) => {
    try {
        await transporter.sendMail({
            from: `"Carvio" <${SYSTEM_EMAIL}>`,
            to: email,
            subject,
            html,
        });
    } catch (error) {
        console.error("Email send failed:", error);
        throw new Error("Email service failed");
    }
};