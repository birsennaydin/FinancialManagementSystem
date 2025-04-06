import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  const token = localStorage.getItem("token");

  // Fetch all expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses", err);
    }
  };

  // Fetch categories to map names in pie chart
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5050/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  // Filter expenses by selected date range
  const filteredExpenses = expenses.filter((exp) => {
    const expMonth = exp.date.slice(0, 7); // format: YYYY-MM
    return (
      (!startMonth || expMonth >= startMonth) &&
      (!endMonth || expMonth <= endMonth)
    );
  });

  // Prepare data for bar chart: total expenses per month
  const monthlyTotals = {};
  filteredExpenses.forEach((exp) => {
    const month = exp.date.slice(0, 7);
    monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
  });

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderRadius: 8,
      },
    ],
  };

  // Prepare data for pie chart: total per category
  const categoryTotals = {};
  filteredExpenses.forEach((exp) => {
    const categoryName =
      categories.find((c) => c._id === exp.category)?.name || "Unknown";
    categoryTotals[categoryName] = (categoryTotals[categoryName] || 0) + exp.amount;
  });

  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#36A2EB",
          "#4BC0C0",
          "#FF6384",
          "#FFCE56",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Dashboard Overview</h2>

      {/* Date range filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">From</label>
          <input
            type="month"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-semibold mb-1">To</label>
          <input
            type="month"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Charts: Responsive layout with grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-center mb-2">Monthly Expenses</h3>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold text-center mb-2">Category Distribution</h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
