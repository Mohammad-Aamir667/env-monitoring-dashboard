import SensorData from "../models/SensorData.js";
import { processReading } from "../services/anomalyService.js";

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("sensor:data", async (data) => {
            const saved = await SensorData.create(data);

            // Real-time chart update
            io.emit("sensor:update", saved);

            // ✅ Pass io here
            await processReading(saved, io);
        });
    });
};
