import { 
    generateVerificationCodeHtml,  
    generateJobsEmailHtml
} from "./email.template.js";
import { sendEmail } from "../../shared/utills/email.js";
import { TJobs } from "./email.template.js";

export const sendVerificationEmail = (
    name: string, 
    code: string, 
    email: string
) => {
    const html = generateVerificationCodeHtml(name, code);
    sendEmail(email, "Verify your email for Carvio", html);
};

export const sendPreferenceEmail = (
    email: string, 
    matches: TJobs[]
) => {    
    const html = generateJobsEmailHtml(matches);
    sendEmail(email, "Friendly Reminder, Carvio", html);
};