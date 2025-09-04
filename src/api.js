export async function getInsult() {
  const response = await fetch("/api/insult");
  const data = await response.json();
  return data.insult;
}




