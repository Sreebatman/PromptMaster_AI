import { GoogleGenAI } from "@google/genai";
import { AssistantMode, PromptStyle } from "../types";
import { PROMPT_CONFIGS } from "../constants";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates content based on the selected mode and style (Prompt Engineering in action).
 */
export const generateResponse = async (
  input: string,
  mode: AssistantMode,
  style: PromptStyle
): Promise<string> => {
  try {
    // 1. Retrieve the engineered prompt configuration
    const config = PROMPT_CONFIGS[mode][style];

    if (!config) {
      throw new Error(`Invalid configuration for mode: ${mode} and style: ${style}`);
    }

    // 2. Select the appropriate model
    // Using gemini-2.5-flash for speed on Q&A/Summary, gemini-3-pro for Creative
    const modelName = mode === AssistantMode.CREATIVE ? 'gemini-3-pro-preview' : 'gemini-2.5-flash';

    // 3. Call the API
    const response = await ai.models.generateContent({
      model: modelName,
      contents: input,
      config: {
        systemInstruction: config.systemInstruction,
        temperature: mode === AssistantMode.CREATIVE ? 0.9 : 0.4, // Higher temp for creativity
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error communicating with the AI. Please check your connection or API key.";
  }
};