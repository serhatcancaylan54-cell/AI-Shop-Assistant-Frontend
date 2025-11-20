import axios from "axios";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const OLLAMA_API = "https://ollama-api.openai-samples.com/generate";

    const response = await axios.post(OLLAMA_API, {
      model: "qwen2.5",
      prompt,
      stream: false
    });

    return new Response(
      JSON.stringify({ reply: response.data.response }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "AI error", details: err.message }),
      { status: 500 }
    );
  }
}
