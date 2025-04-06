import { useEffect, useState } from "react";
import axios from "axios";

export default function Expenses() {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5050/api/expenses",
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

      setMessage("Expense saved successfully ✅");
      setFormData({ category: "", amount: "", date: "" });
      fetchExpenses();
    } catch (err) {
      console.error(err);
      setMessage("Failed to save expense ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Expense</h2>

      {message && (
        <div className="mb-4 text-center text-sm text-blue-600">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Groceries"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g. 50"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Save Expense
        </button>
      </form>

      <h3 className="text-xl font-bold mb-2">My Expenses</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border">Category</th>
              <th className="text-left p-2 border">Amount</th>
              <th className="text-left p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr key={exp._id} className="border-t">
                  <td className="p-2 border">{exp.category}</td>
                  <td className="p-2 border">${exp.amount.toFixed(2)}</td>
                  <td className="p-2 border">{new Date(exp.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
