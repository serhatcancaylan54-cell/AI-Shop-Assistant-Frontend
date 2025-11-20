export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://ollama-api.openai-samples.com/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "qwen2.5",
        prompt,
        stream: false
      })
    });

    const data = await response.json();

    return new Response(JSON.stringify({ reply: data.response }), {
      status: 200
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500
    });
  }
}
