import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Set in Vercel → Your Project → Settings → Environment Variables
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // GPT-4 chat completions
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 50,
    });

    const suggestion = response.choices[0]?.message?.content?.trim() || "No suggestion found.";
    return Response.json({ suggestion });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return Response.json({ error: "Failed to fetch AI suggestion" }, { status: 500 });
  }
}
