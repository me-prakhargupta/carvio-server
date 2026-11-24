import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import csv from "csv-parser";
import { SYSTEM_USER_EMAIL, SYSTEM_USER_PASS } from "../../config/env.js";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface User {
    username: string;
    name: string;
    email: string;
};

const getEmailHtml = (name: string) => `
<div style="font-family: Arial, sans-serif; font-size: 15px; color: #222; line-height: 1.6; max-width: 560px;">
  <p>Hi ${name},</p>

  <p>Thank you for participating in <strong>CodeClash 1.0</strong>, organized by Being Zero. We hope you enjoyed the challenge.</p>

  <p>Your participation certificate is attached to this email.</p>

  <p>Keep coding and keep competing.</p>

  <p style="margin-top: 24px;">
    Regards,<br />
    <strong>Team Being Zero</strong>
  </p>
</div>
`;


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    family: 4,
    auth: {
        user: SYSTEM_USER_EMAIL,
        pass: SYSTEM_USER_PASS
    }
} as nodemailer.TransportOptions);

const sendEmail = async(
    email: string,
    subject: string,
    html: string,
    attachment: string
) => {
    try {
        await transporter.sendMail({
            from: `Carvio <${SYSTEM_USER_EMAIL}>`,
            to: email,
            subject,
            html,
            attachments: [{ path: attachment }]
        });
        
        return { success: true };
    } catch(error) {
        throw error;
    }
};

const subject = "BZ's CodeClash 1.0 Participation Certificate";

const main = () => {
    const users: User[] = [];

    fs.createReadStream(path.join("src", "users.csv"))
    .pipe(
        csv({
        mapHeaders: ({ header }: { header: string }) =>
            header.replace(/^\uFEFF/, "").trim().toLowerCase(),
        })
    )
    .on("data", (row: Record<string, string>) => {
        if (row.email && row.username) {
        users.push({
            username: row.username.trim(),
            name: row.name?.trim() || "Customer",
            email: row.email.trim(),
        });
        }
    })
    .on("end", async () => {
        console.log(`Processing ${users.length} users...`);
        // console.log(users);

        for (const user of users) {
          try {
            const attachmentPath = `./src/certificates/${user.username}.pdf`;
            // console.log(user.name, user.username, user.email, attachmentPath);

            const html = getEmailHtml(user.name);
            try {
                await transporter.sendMail({
                from: `Carvio <${SYSTEM_USER_EMAIL}>`,
                to: "tempuseremail@gmail.com",
                subject,
                html,
                attachments: [{ path: attachmentPath }]
            });
                return { success: true };
                console.log(`Sent to ${user.email}`);
                break;
            } catch(error) {
                throw error;
            }
          } catch (err) {
            console.error(`Failed for ${user.email}:`, (err as Error).message);
          }
          await new Promise((r) => setTimeout(r, 500));
        }
        console.log("Done!");
    });
}

main();