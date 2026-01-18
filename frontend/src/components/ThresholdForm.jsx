import { useState } from "react";
import axios from "axios";

export default function ThresholdForm() {
    const [sensorType, setType] = useState("temperature");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    const save = async () => {
        await axios.post("http://localhost:5000/api/thresholds", {
            sensorType, min, max
        });
        alert("Saved");
    };

    return (
        <div>
            <select onChange={e => setType(e.target.value)}>
                <option>temperature</option>
                <option>humidity</option>
                <option>airQuality</option>
            </select>
            <input placeholder="Min" onChange={e => setMin(e.target.value)} />
            <input placeholder="Max" onChange={e => setMax(e.target.value)} />
            <button onClick={save}>Save Threshold</button>
        </div>
    );
}
