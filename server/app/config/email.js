const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});


let sendEmail = async (userEmail, token) => {
    const verifyLink = `http://localhost:3000/verify-email/${token}`;
    const info = await transporter.sendMail({
        from: '"Your App Team" <no-reply@yourapp.com>',
        to: userEmail,
        subject: "Verify Your Email - Action Required",

        text: `Verify your email here: ${verifyLink}`,

        html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f6f8;">

      <table width="100%" cellpadding="0" cellspacing="0" 
        style="background-color:#f4f6f8; padding:40px 0;">

        <tr>
          <td align="center">

            <!-- Card -->
            <table width="600" cellpadding="0" cellspacing="0"
              style="
                background:#ffffff;
                border-radius:12px;
                box-shadow:0 4px 12px rgba(0,0,0,0.1);
                overflow:hidden;
                font-family:Arial, sans-serif;
              ">

              <!-- Header -->
              <tr>
                <td style="
                  background:linear-gradient(135deg,#667eea,#764ba2);
                  padding:25px;
                  text-align:center;
                  color:#ffffff;
                  font-size:24px;
                  font-weight:bold;
                ">
                  🚀 Your App Name
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:40px 35px; color:#333333;">

                  <h2 style="margin-top:0;">Verify Your Email</h2>

                  <p style="font-size:16px; line-height:1.6;">
                    Hi there 👋,
                  </p>

                  <p style="font-size:16px; line-height:1.6;">
                    Thanks for joining <b>Your App Name</b>!  
                    Please confirm your email address to activate your account.
                  </p>

                  <!-- Button -->
                  <div style="text-align:center; margin:35px 0;">

                    <a href="${verifyLink}"
                      style="
                        background:#667eea;
                        color:#ffffff;
                        padding:14px 32px;
                        text-decoration:none;
                        border-radius:6px;
                        font-size:16px;
                        font-weight:bold;
                        display:inline-block;
                      ">
                      Verify Email
                    </a>

                  </div>

                  <p style="font-size:14px; color:#666;">
                    If the button doesn’t work, copy and paste this link:
                  </p>

                  <p style="
                    word-break:break-all;
                    font-size:14px;
                    color:#667eea;
                  ">
                    ${verifyLink}
                  </p>

                  <hr style="border:none; border-top:1px solid #eee; margin:30px 0;">

                  <p style="font-size:13px; color:#999;">
                    If you didn’t create an account, you can safely ignore this email.
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="
                  background:#f9fafb;
                  padding:20px;
                  text-align:center;
                  font-size:12px;
                  color:#777;
                ">
                  © ${new Date().getFullYear()} Your App Name. All rights reserved.
                </td>
              </tr>

            </table>

          </td>
        </tr>

      </table>

    </body>
    </html>
    `,
    });

    console.log("Verification email sent:", info.messageId);
};

module.exports = sendEmail; 