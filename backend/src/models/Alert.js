import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
    sensorType: String,
    value: Number,
    reason: String,
    explanation: String,
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", alertSchema);
