import { twilioClient } from "../config/twilio.js";

export const sendSMS = async (msg) => {
    await twilioClient.messages.create({
        body: msg,
        from: process.env.TWILIO_PHONE,
        to: process.env.ALERT_PHONE
    });
};
