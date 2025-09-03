export async function getInsult() {
  try {
    const response = await fetch("/api/insult");
    if (!response.ok) {
      throw new Error("Ошибка ответа сервера");
    }
    const data = await response.json();
    return data.insult;
  } catch (error) {
    console.error(error);
    return "Ошибка генерации, но куришь ты всё равно…";
  }
}



