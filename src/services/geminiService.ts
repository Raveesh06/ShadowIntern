import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function evaluateCode(code: string, taskDescription: string) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Evaluate the following code for a task described as: "${taskDescription}".
    
    Code:
    ${code}
    
    Provide a JSON response with the following fields:
    - quality: (0-100)
    - architecture: (0-100)
    - communication: (0-100)
    - feedback: A short professional feedback string.`,
    config: {
      responseMimeType: "application/json"
    }
  });

  const response = await model;
  return JSON.parse(response.text || "{}");
}
