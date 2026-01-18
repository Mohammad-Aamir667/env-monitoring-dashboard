import mongoose from "mongoose";

const thresholdSchema = new mongoose.Schema({
    sensorType: String,
    min: Number,
    max: Number
});

export default mongoose.model("Threshold", thresholdSchema);
