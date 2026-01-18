import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import SensorChart from "./SensorChart";
import ThresholdForm from "./ThresholdForm";

export default function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on("sensor:update", d =>
            setData(prev => [...prev.slice(-20), d])
        );
    }, []);

    return (
        <>
            <ThresholdForm />
            <SensorChart data={data} />
        </>
    );
}
