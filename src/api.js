
export async function getInsult(count) {
  try {
    const response = await fetch("/api/insult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    });

    const data = await response.json();
    return data.insult;
  } catch (err) {
    console.error(err);
    return "Ошибка генерации, но куришь ты всё равно…";
  }
}


