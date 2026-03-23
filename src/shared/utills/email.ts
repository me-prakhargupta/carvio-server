// import { Resend } from "resend";
// import { RESEND_API_KEY } from "../../config/env.js";

import nodeMailer from "nodemailer";
import { 
    SYSTEM_USER_EMAIL, 
    SYSTEM_USER_PASS 
} from "../../config/env.js";

const transpoter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: SYSTEM_USER_EMAIL,
        pass: SYSTEM_USER_PASS
    }
});


export const sendEmail = async(
    email: string,
    subject: string,
    html: string
) => {
    try {
        await transpoter.sendMail({
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
