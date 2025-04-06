import { useEffect, useState } from "react";
import axios from "axios";

export default function Expenses() {
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/budgets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudgets(res.data);
    } catch (err) {
      console.error("Failed to fetch budgets", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBudgets();
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Expense deleted ✅");
      fetchExpenses();
    } catch (err) {
      console.error("Delete failed", err);
      setMessage("Failed to delete expense ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentMonth = formData.date.slice(0, 7); // yyyy-mm
    const matchingBudget = budgets.find(
      (b) =>
        b.category?._id === formData.category && b.month === currentMonth
    );

    const totalSpent = expenses
      .filter(
        (exp) =>
          exp.category === formData.category &&
          exp.date.slice(0, 7) === currentMonth &&
          exp._id !== editingId
      )
      .reduce((sum, exp) => sum + exp.amount, 0);

    const newAmount = Number(formData.amount);

    if (matchingBudget && totalSpent + newAmount > matchingBudget.amount) {
      setMessage("⚠️ You exceeded your budget for this category.");
      return;
    }

    try {
      if (isEditing && editingId) {
        await axios.put(
          `http://localhost:5050/api/expenses/${editingId}`,
          { ...formData, amount: newAmount },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Expense updated ✅");
      } else {
        await axios.post(
          "http://localhost:5050/api/expenses",
          { ...formData, amount: newAmount },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessage("Expense saved successfully ✅");
      }

      setFormData({ category: "", amount: "", date: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.error(err);
      setMessage("Failed to save/update expense ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditing ? "Edit Expense" : "Add New Expense"}
      </h2>

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
              <option value="">Select Category</option>
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
          {isEditing ? "Update Expense" : "Save Expense"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setEditingId(null);
              setFormData({ category: "", amount: "", date: "" });
            }}
            className="w-full mt-2 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
          >
            Cancel Editing
          </button>
        )}
      </form>

      <h3 className="text-xl font-bold mb-2">My Expenses</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border">Category</th>
              <th className="text-left p-2 border">Amount</th>
              <th className="text-left p-2 border">Date</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((exp) => (
                <tr key={exp._id} className="border-t">
                  <td className="p-2 border">
                    {
                        categories.find((cat) => cat._id === exp.category)?.name || "Unknown"
                    }
                </td>
                  <td className="p-2 border">${exp.amount.toFixed(2)}</td>
                  <td className="p-2 border">
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setEditingId(exp._id);
                          setFormData({
                            category: exp.category,
                            amount: exp.amount,
                            date: exp.date.split("T")[0],
                          });
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
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
