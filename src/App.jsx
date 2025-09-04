import { useState, useEffect } from "react";
import { getInsult } from "./api";


function App() {
  const [cigarettes, setCigarettes] = useState(() => {
    return Number(localStorage.getItem("cigarettes")) || 0;
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("cigarettes", cigarettes);
  }, [cigarettes]);

  const handleAddCigarette = async () => {
    const newCount = cigarettes + 1;
    setCigarettes(newCount);
    setLoading(true);

    const insult = await getInsult(newCount);
    setMessage(insult);
    setLoading(false);
  };

  const level = Math.floor(cigarettes / 10) + 1;
  const progress = (cigarettes % 10) * 10; 

  return (
  <div className="min-h-screen flex justify-center items-center bg-gray-100">
    <div className="w-5/6 md:w-4/6 lg:w-2/3 xl:w-1/2 text-center">
      <h1 className="text-3xl font-bold mb-4">Счётчик сигарет</h1>
      <p className="mb-2">Сигарет всего: {cigarettes}</p>
      <p className="mb-2">Текущий уровень: {level}</p>

      <div className="w-full h-4 bg-gray-300 rounded mb-4">
        <div
          className="h-4 bg-red-600 rounded transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <button
        onClick={handleAddCigarette}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 mb-4 animate-pulse"
        disabled={loading}
      >
        {loading ? "Генерируем…" : "+"}
      </button>

      {message && <p className="text-xl text-gray-800">{message}</p>}
    </div>
  </div>
);

}
export default App;

