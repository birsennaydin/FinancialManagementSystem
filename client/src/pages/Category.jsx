import { useEffect, useState } from "react";
import axios from "axios";

export default function Category() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.trim()) return;

    try {
      await axios.post(
        "http://localhost:5050/api/categories",
        { name: category },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Category added ✅");
      setCategory("");
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add category ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Categories</h2>

      {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

      <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 px-3 py-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="list-disc pl-6">
        {categories.length === 0 ? (
          <p>No categories yet.</p>
        ) : (
          categories.map((cat) => <li key={cat._id}>{cat.name}</li>)
        )}
      </ul>
    </div>
  );
}
