import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in Vercel
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await openai.completions.create({
      model: "gpt-4",
      prompt: `Suggest a UI component for: ${prompt}`,
      max_tokens: 50,
    });

    return Response.json({ suggestion: response.choices[0].text.trim() });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return Response.json({ error: "Failed to fetch AI suggestion" }, { status: 500 });
  }
}

