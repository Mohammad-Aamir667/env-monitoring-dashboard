import { GoogleGenerativeAI } from "@google/generative-ai";

export const explainAnomaly = async (values) => {
    if (!process.env.GEMINI_API_KEY) {
        return "Anomaly detected based on threshold breach compared to recent sensor readings.";
    }

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash" // ✅ FIXED MODEL
        });

        const prompt = `
Recent sensor readings: ${values.join(", ")}
Explain briefly why the latest reading is anomalous.
`;

        const result = await model.generateContent(prompt);
        return result.response.text();

    } catch (err) {
        console.error("Gemini error, using fallback:", err.message);
        return "Anomalous behavior detected due to sudden deviation from recent sensor data.";
    }
};
