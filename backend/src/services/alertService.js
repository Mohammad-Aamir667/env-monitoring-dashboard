import { sendMail } from "./mailService.js";

export const sendAlert = async ({ sensorType, value, explanation }) => {
    const subject = `🚨 Alert: ${sensorType} anomaly detected`;

    const html = `
    <h3>Environmental Alert</h3>
    <p><b>Sensor:</b> ${sensorType}</p>
    <p><b>Value:</b> ${value}</p>
    <p><b>Reason:</b> ${explanation}</p>
    <p><b>Time:</b> ${new Date().toLocaleString()}</p>
  `;

    await sendMail(
        process.env.ALERT_EMAIL,
        subject,
        html
    );
};
