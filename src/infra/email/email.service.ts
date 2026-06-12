import { 
    generateWelcomeHtml,
    generateVerificationCodeHtml,  
    generateJobsEmailHtml,
    generatePasswordResetHtml
} from "./email.template.js";
import { sendEmail } from "../../shared/utills/email.js";
import { TJobs } from "./email.template.js";

const sendWelcomeEmail = async(
    fullname: string,
    email: string,
) => {
    const html = generateWelcomeHtml(fullname);
    return await sendEmail(
        email, 
        "Welcome to Carvio", 
        html
    );
}

const sendVerificationEmail = async(
    name: string, 
    code: string, 
    email: string
) => {
    const html = generateVerificationCodeHtml(name, code);
    return await sendEmail(
        email, 
        "Verify your email for Carvio", 
        html
    );
};

const sendPreferenceEmail = async(
    email: string, 
    matches: TJobs[]
) => {    
    const html = generateJobsEmailHtml(matches);
    return await sendEmail(
        email, 
        "Friendly Reminder, Carvio", 
        html
    );
};

const sendPasswordResetEmail = async (
    fullname: string, 
    email: string, 
    resetUrl: string
) => {
    const html = generatePasswordResetHtml(fullname, resetUrl);
    return await sendEmail(
        email, 
        "Get back into your Carvio account",
        html,
    );
};


export {
    sendWelcomeEmail, sendVerificationEmail, sendPreferenceEmail, 
    sendPasswordResetEmail
};