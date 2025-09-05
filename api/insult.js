import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Скажи что-то обидное курильщику. Ограничься 30-40 словами." }],
      max_tokens: 50,
    });

    res.status(200).json({ insult: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ insult: "Ошибка генерации" });
  }
}

