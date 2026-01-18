import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { socketHandler } from "./socket/socketHandler.js";
import thresholdRoutes from "./routes/thresholds.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/thresholds", thresholdRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

socketHandler(io);

server.listen(5000, () => console.log("Backend running"));
