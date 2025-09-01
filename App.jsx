import { useState, useEffect } from "react";

const insults = [
  "Ого, опять куришь? Ты реально думаешь, что это круто?",
  "Серьёзно? Это выглядит жалко и дешево.",
  "Ты только что ускорил свою смерть. Молодец...",
  "Кажется, ты горд собой за этот идиотизм?",
  "Ну да, еще одна сигарета. Поздравляю с уровнем позора.",
  "Если бы ты только знал как кринжово выглядишь со стороны.."

];

function App() {
  const [cigarettes, setCigarettes] = useState(() => {
    return Number(localStorage.getItem("cigarettes")) || 0;
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cigarettes", cigarettes);
  }, [cigarettes]);

  const handleAddCigarette = () => {
    const newCount = cigarettes + 1;
    setCigarettes(newCount);

    const insult = insults[Math.floor(Math.random() * insults.length)];
    setMessage(insult);
  };

  const level = Math.floor(cigarettes / 10) + 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Счётчик сигарет</h1>
      <p className="mb-2">Сигарет всего: {cigarettes}</p>
      <p className="mb-2">Текущий уровень: {level}</p>
      <button
        onClick={handleAddCigarette}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 mb-4"
      >
        +
      </button>
      {message && <p className="text-xl text-gray-800">{message}</p>}
    </div>
  );
}

export default App;
