export async function POST(req) {
  const { prompt } = await req.json();
  return Response.json({ suggestion: `Suggested UI component for: ${prompt}` });
}

