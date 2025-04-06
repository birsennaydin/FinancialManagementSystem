import { useEffect, useState } from "react";
import axios from "axios";

export default function FinancialTips() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/news");
        setNews(res.data);
      } catch (err) {
        setError("Failed to load financial news.");
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Latest Financial News</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {new Date(article.published_at).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-3 line-clamp-4">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
