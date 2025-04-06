import { useEffect, useState } from "react";
import axios from "axios";

export default function Suggestions() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/suggestions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data.suggestions || []);
      } catch (err) {
        console.error("Failed to load suggestions", err);
      }
    };

    fetchSuggestion();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold text-center mb-4">Smart Spend Suggestions</h2>
      {data.length > 0 ? (
        <ul className="space-y-2 list-disc list-inside text-gray-700">
          {data.map((sugg, idx) => (
            <li key={idx}>{sugg}</li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No suggestions available yet.</p>
      )}
    </div>
  );
}
