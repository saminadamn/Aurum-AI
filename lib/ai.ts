import OpenAI from "openai";

export const AI_MODEL = "llama-3.3-70b-versatile";

export function getAIClient(): OpenAI {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY is not configured. Add it to your .env.local file to run live audits. Get a free key at https://console.groq.com/keys"
    );
  }
  return new OpenAI({ apiKey, baseURL: "https://api.groq.com/openai/v1" });
}
