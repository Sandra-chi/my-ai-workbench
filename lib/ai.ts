import OpenAI from "openai";

type GenerateTextInput = {
  system?: string;
  prompt: string;
};

async function generateWithOpenAI(input: GenerateTextInput) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  if (!apiKey) {
    throw new Error("缺少 OPENAI_API_KEY。");
  }

  const client = new OpenAI({ apiKey });

  const completion = await client.chat.completions.create({
    model,
    temperature: 0.3,
    messages: [
      ...(input.system ? [{ role: "system" as const, content: input.system }] : []),
      { role: "user" as const, content: input.prompt }
    ]
  });

  return completion.choices[0]?.message?.content || "";
}

async function generateWithOllama(input: GenerateTextInput) {
  const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL || "qwen2.5:7b";

  const response = await fetch(`${baseUrl}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        ...(input.system ? [{ role: "system", content: input.system }] : []),
        { role: "user", content: input.prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama 请求失败：${response.status}`);
  }

  const data = await response.json();
  return data?.message?.content || "";
}

export async function generateText(input: GenerateTextInput) {
  const provider = process.env.AI_PROVIDER || "openai";

  if (provider === "ollama") {
    return generateWithOllama(input);
  }

  return generateWithOpenAI(input);
}
