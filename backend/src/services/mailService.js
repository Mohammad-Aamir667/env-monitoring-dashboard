import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.GMAIL_PASS,
    },
});


export const sendMail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
            to,
            subject,
            html,
        });

        console.log(`✅ Email sent successfully to ${to}`);
        return { success: true };
    } catch (error) {
        console.error(`❌ Email send error to ${to}:`, error.message);
        return { success: false, error: error.message };
    }
};
