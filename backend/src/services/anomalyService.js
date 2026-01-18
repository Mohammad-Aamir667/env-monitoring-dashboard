import SensorData from "../models/SensorData.js";
import Threshold from "../models/Threshold.js";
import Alert from "../models/Alert.js";
import { explainAnomaly } from "../config/gemini.js";
import { sendSMS } from "./alertService.js";

export const processReading = async (reading) => {
    const rule = await Threshold.findOne({ sensorType: reading.sensorType });
    if (!rule) return;

    let isAnomaly = false;

    if (reading.value < rule.min || reading.value > rule.max) {
        isAnomaly = true;
    }

    if (!isAnomaly) return;

    const history = await SensorData.find({ sensorType: reading.sensorType })
        .sort({ timestamp: -1 })
        .limit(10);

    const values = history.map(d => d.value);
    const explanation = await explainAnomaly(values);

    await Alert.create({
        sensorType: reading.sensorType,
        value: reading.value,
        reason: "threshold breach",
        explanation
    });

    await sendSMS(
        `ALERT: ${reading.sensorType} value ${reading.value} is abnormal`
    );
};
