import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 50,
    });

    const suggestion = response.choices[0].message.content.trim();
    return Response.json({ suggestion });
  } catch {
    return Response.json(
      { error: "Failed to fetch AI suggestion" },
      { status: 500 }
    );
  }
}
