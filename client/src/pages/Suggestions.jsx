import { useEffect, useState } from "react";
import axios from "axios";

export default function Suggestions() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/suggestions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Failed to load suggestions", err);
      }
    };

    fetchSuggestion();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Smart Spend Suggestion</h2>
      {data ? (
        <div className="text-center space-y-2">
          <p className="text-lg text-gray-700 font-semibold">
            Category: <span className="text-blue-600">{data.category}</span>
          </p>
          <p className="text-md text-gray-600">
            Total Spent (Last 3 Months): <strong>${data.total.toFixed(2)}</strong>
          </p>
          <p className="text-gray-800 mt-2 italic">{data.suggestion}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No suggestion available yet.</p>
      )}
    </div>
  );
}
