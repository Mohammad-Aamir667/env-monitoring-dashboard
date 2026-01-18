import express from "express";
import Threshold from "../models/Threshold.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { sensorType, min, max } = req.body;
    await Threshold.findOneAndUpdate(
        { sensorType },
        { min, max },
        { upsert: true }
    );
    res.json({ message: "Threshold saved" });
});

export default router;
