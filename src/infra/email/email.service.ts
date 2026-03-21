import { 
    generateVerificationCodeHtml,  
    generateJobsEmailHtml
} from "./email.template.js";
import { sendEmail } from "../../shared/utills/email.js";
import { TJobs } from "./email.template.js";
export const sendVerificationEmail = async(
    name: string, code: string, email: string
) => {
    const html = generateVerificationCodeHtml(name, code);
    await sendEmail(email, "Verify your email for Carvio", html);
};

export const sendPreferenceEmail = async(
    email: string, matches: TJobs[]
) => {    
    const html = generateJobsEmailHtml(matches);
    await sendEmail(email, "Friendly Reminder, Carvio", html);
};