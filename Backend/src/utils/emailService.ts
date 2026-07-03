import { Resend } from 'resend'
import { AppError } from './appError';

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (email: string, otp: string) => {
    const from = process.env.EMAIL_FROM || "InterviuPro <onboarding@resend.dev>"

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Verify Your Email - InterviuPro</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #f4f6fa;
                color: #1a202c;
            }
            .container {
                max-width: 580px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                overflow: hidden;
                border: 1px solid #e2e8f0;
            }
            .header {
                background-color: #0B0F19;
                padding: 32px;
                text-align: center;
            }
            .logo {
                font-size: 24px;
                font-weight: 700;
                color: #38BDF8;
                letter-spacing: -0.5px;
                text-decoration: none;
            }
            .content {
                padding: 40px 32px;
                text-align: center;
            }
            h1 {
                font-size: 22px;
                color: #0F172A;
                margin-top: 0;
                margin-bottom: 16px;
                font-weight: 600;
            }
            p {
                font-size: 15px;
                line-height: 24px;
                color: #475569;
                margin: 0 0 24px 0;
            }
            .otp-container {
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 16px 24px;
                margin: 28px auto;
                display: inline-block;
                letter-spacing: 6px;
                font-size: 32px;
                font-weight: 700;
                color: #0284c7;
            }
            .footer {
                background-color: #f8fafc;
                padding: 24px 32px;
                text-align: center;
                border-top: 1px solid #e2e8f0;
                font-size: 12px;
                color: #94a3b8;
                line-height: 18px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <span class="logo">InterviuPro</span>
            </div>
            <div class="content">
                <h1>Verify your email address</h1>
                <p>Welcome to InterviuPro! Use the verification code below to confirm your email and complete your registration. This code will expire in 10 minutes.</p>
                <div class="otp-container">${otp}</div>
                <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">If you didn't request this email, you can safely ignore it.</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} InterviuPro. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `

    const { data, error } = await resend.emails.send({
        from,
        to: [email],
        subject: "Verify your email - InterviuPro",
        html,
    });

    if (error) {
        throw new AppError(400, error.message);
    }
}