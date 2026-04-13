import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(request: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "Gemini API strictly requires a valid key." }, { status: 500 });
  }

  try {
    const { prompt } = await request.json();
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // We utilize the latest gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    // System instruction to maintain the Sarkari Campus persona
    const systemPrompt = `You are the elite AI mentor for Sarkari Campus, a pristine platform helping candidates land non-teaching staff jobs at Institutes of National Importance (IITs, NITs, Central Universities, etc.). 
    Provide highly encouraging, strictly accurate, and concisely bulleted advice for the following user query. Keep your response under 150 words to maintain the clean UI aesthetic.
    
    User Query: ${prompt}`;

    const result = await model.generateContent(systemPrompt);
    const text = result.response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("AI Gen Error:", error);
    return NextResponse.json({ error: "Failed to generate AI capability" }, { status: 500 });
  }
}
