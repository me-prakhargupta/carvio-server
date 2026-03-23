// import { Resend } from "resend";
// import { RESEND_API_KEY } from "../../config/env.js";

import nodemailer from "nodemailer";
import { 
    SYSTEM_USER_EMAIL, 
    SYSTEM_USER_PASS 
} from "../../config/env.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    family: 4,
    auth: {
        user: SYSTEM_USER_EMAIL,
        pass: SYSTEM_USER_PASS
    }
} as nodemailer.TransportOptions);


export const sendEmail = async(
    email: string,
    subject: string,
    html: string
) => {
    try {
        await transporter.sendMail({
            from: `Carvio <${SYSTEM_USER_EMAIL}>`,
            to: email,
            subject,
            html
        });
    } catch(error) {
        throw error;
    }
};

// const resend = new Resend(RESEND_API_KEY);

// export const sendEmail = async(
//     email: string, subject: string, html: string
// ) => {
//     try {
//         const response = await resend.emails.send({
//             from: "onboarding@resend.dev",
//             to: email,
//             subject,
//             html
//         });

//         console.log("Resend Response", response);
//     } catch (error) {
//         console.error("Email send failed:", error);
//     }
// };
