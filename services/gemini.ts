
import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_PROMPT } from "../constants";

export const getAIResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    // Initialize GoogleGenAI with named parameter apiKey from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Construct the contents including history for context
    const chatHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }]
    }));

    // Use ai.models.generateContent directly with model name and contents
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: AI_SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    // Extract text output using the .text property of the response
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "I'm having trouble connecting to the medical hub right now. Please try again or call the clinic directly.";
  }
};