export type TJobs =  {
    title: string;
    company: string;
    location: string;
    stipend: string;
    postedAt: string;
    absoluteUrl: string;
}

const generateWelcomeHtml = (fullname: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to Carvio</title>
  </head>
  <body style="margin:0;padding:0;background:#000000;font-family:Arial,Helvetica,sans-serif;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#000000;">
          <tr>
              <td align="center" style="padding:48px 20px;">

                  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

                      <!-- Logo -->
                      <tr>
                          <td style="padding-bottom:30px;">
                              <h2 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
                                  Carvio
                              </h2>
                          </td>
                      </tr>

                      <!-- Welcome Message -->
                      <tr>
                          <td style="padding-top:15px;">
                              <p style="
                                  margin:0;
                                  color:#ffffff;
                                  font-size:16px;
                                  line-height:1.8;
                              ">
                                  Hi ${fullname}, welcome to Carvio.
                                  <br />
                              </p>
                              <p style="
                                  margin:0;
                                  color:#a8a29e;
                                  font-size:16px;
                                  line-height:1.8;
                              ">
                                Your next opportunity might already be live.
                              </p> 
                          </td>
                      </tr>

                      <!-- Subheading -->
                      <tr>
                          <td style="padding-top:30px;">
                              <p style="
                                  margin:0;
                                  color:rgba(255,255,255,0.9);
                                  font-size:24px;
                                  font-weight:500;
                              ">
                                  Stay ahead of the hiring
                                  <span style="
                                      color:#fed7aa;
                                      font-style:italic;
                                      font-family:Georgia,serif;
                                  ">
                                      curve.
                                  </span>
                              </p>
                          </td>
                      </tr>

                      <!-- Divider -->
                      <tr>
                          <td style="padding-top:40px;">
                              <hr style="
                                  border:none;
                                  border-top:1px solid #292524;
                              " />
                          </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                          <td style="padding-top:24px;">
                              <p style="
                                  color:#ffffff;
                                  font-size:14px;
                              ">
                                  — Team Carvio
                              </p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
};

const generateVerificationCodeHtml = (
    name: string,
    code: string
) => {
    return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background:#ffffff; color:#0B0F14; padding: 32px 20px;">
    
    <div style="max-width:600px; margin:0 auto; background:#ffffff;">
        <!-- Greeting -->
        <p style="color:#0B0F14; font-size:14px;">
            Hi <strong>${name}</strong>,
        </p>

        <!-- Message -->
        <p style="color:#444; font-size:14px; line-height:1.6;">
            Thanks for signing up! Use the verification code below to complete your registration.
        </p>


        <!-- OTP Box -->
        <div style="
            text-align:center;
            margin:24px 0;
        ">
            <div style="
                display:inline-block;
                padding:14px 24px;
                background:#f1f5f9;
                border-radius:10px;
                font-size:22px;
                font-weight:600;
                letter-spacing:4px;
                color:#0B0F14;
            ">
                ${code}
            </div>
        </div>

        <!-- Expiry -->
        <p style="text-align:center; color:#555; font-size:13px;">
            This code will expire in <strong>5 minutes</strong>.
        </p>

        <!-- Warning -->
        <p style="margin-top:20px; color:#555; font-size:13px; line-height:1.6;">
            If you did not request this verification, you can safely ignore this email.
        </p>

        <!-- Divider -->
        <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

        <!-- Footer -->
        <div>
            <p style="margin:0; font-size:13px; color:#0B0F14;">
                Your Carvio
            </p>
            <p style="margin:6px 0 0; font-size:12px; color:#666;">
                Helping you never miss the right opportunity..
            </p>
        </div>

    </div>

</div>

<!-- Dark mode support -->
<style>
@media (prefers-color-scheme: dark) {
    div {
        background: #0B0F14 !important;
        color: #ffffff !important;
    }
    h2 {
        color: #ffffff !important;
    }
    p {
        color: #cbd5e1 !important;
    }
    strong {
        color: #ffffff !important;
    }
    hr {
        border-top: 1px solid #1f2937 !important;
    }
}
</style>`
};

const generateJobsEmailHtml = (matches: TJobs[]) => {
    return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background:#ffffff; padding:24px;">
    
    <!-- Container -->
    <div style="max-width:620px; margin:0 auto;">

        <!-- Header -->
        <div style="text-align:center; margin-bottom:24px;">
            <h2 style="margin:0; color:#1a1a1a; font-weight:600;">
                New opportunites for You
            </h2>
            <p style="margin:6px 0 0; color:#666; font-size:14px;">
                Curated based on your interests
            </p>
        </div>

        ${matches.map(match => `
            <!-- Card -->
            <div style="
                background:#ffffff;
                border-radius:12px;
                padding:18px;
                margin-bottom:16px;
                border:1px solid #e6ecf2;
            ">

                <!-- Title -->
                <h3 style="margin:0 0 6px; color:#111; font-size:18px;">
                    ${match.title}
                </h3>

                <!-- Company -->
                <p style="margin:0 0 10px; color:#555; font-size:14px;">
                    <strong>${match.company}</strong>
                </p>

                <!-- Meta Info -->
                <div style="font-size:13px; color:#666; line-height:1.6;">
                    🕊️ Location: ${match.location} <br/>
                    🫰 Stipend: ${match.stipend || "Not disclosed"} <br/>
                    🌿 Posted: ${match.postedAt || "Recently"}
                </div>

                <!-- CTA -->
                <a href="${match.absoluteUrl}" 
                   style="
                       display:inline-block;
                       margin-top:14px;
                       padding:8px 14px;
                       background:#14B8A6;
                       background: linear-gradient(135deg, #14B8A6, #0EA5A4);
                       color:#ffffff;
                       text-decoration:none;
                       border-radius:8px;
                       font-size:10px;
                       font-weight:400;
                   ">
                    View Details
                </a>

            </div>
        `).join("")}

        <!-- Footer -->
        <div style="text-align:center; margin-top:24px;">
            <p style="font-size:12px; color:#888; margin-top:6px;">
                Made with 🧡 to help you land your next opportunity
            </p>
        </div>

    </div>
</div>
    `;
};

export {
    generateWelcomeHtml,
    generateVerificationCodeHtml,
    generateJobsEmailHtml
}