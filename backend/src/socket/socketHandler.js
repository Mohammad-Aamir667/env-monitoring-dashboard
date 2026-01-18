import SensorData from "../models/SensorData.js";
import { processReading } from "../services/anomalyService.js";

export const socketHandler = (io) => {
    io.on("connection", (socket) => {
        socket.on("sensor:data", async (data) => {
            const saved = await SensorData.create(data);
            io.emit("sensor:update", saved);
            processReading(saved);
        });
    });
};
