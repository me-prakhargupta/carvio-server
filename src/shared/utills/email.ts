// import { Resend } from "resend";
// import { RESEND_API_KEY } from "../../config/env.js";

// import nodemailer from "nodemailer";
// import { 
//     SYSTEM_USER_EMAIL, 
//     SYSTEM_USER_PASS 
// } from "../../config/env.js";

import axios from "axios";
import { BREVO_API_KEY } from "../../config/env.js";

export const sendEmail = async(
    email: string,
    subject: string,
    html: string
) => {
    try {
        return await axios.post(
            "https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "Carvio",
                    email: "trycarvio@gmail.com"
                },
                to: [{ email }],
                subject,
                htmlContent: html
            }, {
                headers: {
                    "api-key": BREVO_API_KEY,
                    "Content-Type": "application/json",
                }
            }
        );
    } catch(error) {
        console.log(
            "Brevo error:", error);
    }
};

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     family: 4,
//     auth: {
//         user: SYSTEM_USER_EMAIL,
//         pass: SYSTEM_USER_PASS
//     }
// } as nodemailer.TransportOptions);


// export const sendEmail = async(
//     email: string,
//     subject: string,
//     html: string
// ) => {
//     try {
//         await transporter.sendMail({
//             from: `Carvio <${SYSTEM_USER_EMAIL}>`,
//             to: email,
//             subject,
//             html
//         });

//         return { success: true };
//     } catch(error) {
//         throw error;
//     }
// };

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