export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content:
              "Скажи максимально грубо, что человек зря курит и пусть продолжает ускорять свою смерть и быть слабаком.",
          },
        ],
        max_tokens: 60,
        temperature: 0.9,
      }),
    });

    const data = await response.json();
    const insult = data.choices?.[0]?.message?.content || "Ошибка генерации";

    res.status(200).json({ insult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ insult: "Ошибка генерации" });
  }
}
