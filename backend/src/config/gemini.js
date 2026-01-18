import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

export const explainAnomaly = async (data) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Recent sensor values: ${data.join(", ")}
Explain briefly why the latest value is anomalous.
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
};
