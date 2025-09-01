// api/insult.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешён" });
  }

  const { count } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Ты грубый, саркастичный ассистент. Отвечай максимально колко и агрессивно.",
          },
          {
            role: "user",
            content: `Пользователь выкурил ${count} сигарет. Напиши оскорбительный комментарий.Уложись в 70 слов.`,
          },
        ],
        max_tokens: 80,
        temperature: 0.9,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const insult = response.data.choices[0].message.content.trim();
    res.status(200).json({ insult });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ insult: "Ошибка генерации, но куришь ты всё равно…" });
  }
}
