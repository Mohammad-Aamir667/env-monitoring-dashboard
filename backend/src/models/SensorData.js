import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema({
    sensorType: String,
    value: Number,

    timestamp: { type: Date, default: Date.now },

}, { collection: "sensor_data" });

export default mongoose.model("SensorData", sensorSchema);
