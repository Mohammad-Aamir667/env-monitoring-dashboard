import SensorData from "../models/SensorData.js";
import Threshold from "../models/Threshold.js";
import Alert from "../models/Alert.js";
import { explainAnomaly } from "../config/gemini.js";
import { sendAlert } from "./alertService.js";

export const processReading = async (reading, io) => {
    const rule = await Threshold.findOne({ sensorType: reading.sensorType });
    if (!rule) return;

    if (reading.value < rule.min || reading.value > rule.max) {
        const history = await SensorData.find({ sensorType: reading.sensorType })
            .sort({ timestamp: -1 })
            .limit(10);

        const values = history.map(d => d.value);
        const explanation = await explainAnomaly(values);

        const alert = await Alert.create({
            sensorType: reading.sensorType,
            value: reading.value,
            reason: "threshold breach",
            explanation,
            timestamp: new Date()
        });

        io.emit("alert:new", alert);

        // ✅ EMAIL ALERT
        await sendAlert({
            sensorType: reading.sensorType,
            value: reading.value,
            explanation
        });
    }
};
