import { useEffect, useState } from "react";
import axios from "axios";

export default function Budgets() {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    month: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
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

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/budgets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBudgets();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (budget) => {
    setIsEditing(true);
    setEditingId(budget._id);
    setFormData({
      category: budget.category._id,
      amount: budget.amount,
      month: budget.month,
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing && editingId) {
        await axios.put(
          `http://localhost:5050/api/budgets/${editingId}`,
          {
            ...formData,
            amount: Number(formData.amount),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Budget updated ✅");
      } else {
        await axios.post(
          "http://localhost:5050/api/budgets",
          {
            ...formData,
            amount: Number(formData.amount),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("Budget saved ✅");
      }

      setFormData({ category: "", amount: "", month: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchBudgets();
    } catch (err) {
      console.error(err);
      if (err.response?.status === 400) {
        setMessage(err.response.data.error);
      } else {
        setMessage("Failed to save/update budget ❌");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Set Budget</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-blue-600">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="e.g. 200"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Month</label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {isEditing ? "Update Budget" : "Save Budget"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditingId(null);
              setFormData({ category: "", amount: "", month: "" });
              setMessage("");
            }}
            className="w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition mt-2"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h3 className="text-xl font-bold mb-2">My Budgets</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border">Category</th>
              <th className="text-left p-2 border">Amount</th>
              <th className="text-left p-2 border">Month</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No budgets found.
                </td>
              </tr>
            ) : (
              budgets.map((b) => (
                <tr key={b._id} className="border-t">
                  <td className="p-2 border">{b.category?.name || "N/A"}</td>
                  <td className="p-2 border">${b.amount.toFixed(2)}</td>
                  <td className="p-2 border">{b.month}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(b)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
