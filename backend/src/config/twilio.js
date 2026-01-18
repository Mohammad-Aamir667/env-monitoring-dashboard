import twilio from "twilio";

export const twilioClient = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_TOKEN
);
