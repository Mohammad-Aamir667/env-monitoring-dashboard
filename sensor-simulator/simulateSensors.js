import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

setInterval(() => {
    const sensors = [
        { sensorType: "temperature", value: 20 + Math.random() * 25 },
        { sensorType: "humidity", value: 40 + Math.random() * 40 },
        { sensorType: "airQuality", value: 80 + Math.random() * 200 }
    ];
    console.log("it is reading")
    sensors.forEach(s =>
        socket.emit("sensor:data", s)
    );
}, 4000);
