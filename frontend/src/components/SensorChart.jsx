import { LineChart, Line, XAxis, YAxis } from "recharts";

export default function SensorChart({ data }) {
    return (
        <LineChart width={500} height={250} data={data}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Line dataKey="value" />
        </LineChart>
    );
}
