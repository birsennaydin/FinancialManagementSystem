import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [startMonth, setStartMonth] = useState("2025-02");
  const [endMonth, setEndMonth] = useState("2025-04");

  const token = localStorage.getItem("token");

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

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const getCategoryName = (id) =>
    categories.find((c) => c._id === id)?.name || id;

  // Filter expenses by selected date range
  const filteredExpenses = expenses.filter((e) => {
    const month = e.date.slice(0, 7);
    return month >= startMonth && month <= endMonth;
  });

  // Group by month
  const monthlyTotals = {};
  filteredExpenses.forEach((e) => {
    const month = e.date.slice(0, 7);
    monthlyTotals[month] = (monthlyTotals[month] || 0) + e.amount;
  });

  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyTotals),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  // Group by category
  const categoryTotals = {};
  filteredExpenses.forEach((e) => {
    const cat = e.category;
    categoryTotals[cat] = (categoryTotals[cat] || 0) + e.amount;
  });

  const pieData = {
    labels: Object.keys(categoryTotals).map(getCategoryName),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#36A2EB",
          "#4BC0C0",
          "#FF6384",
          "#FFCE56",
          "#8E44AD",
        ],
      },
    ],
  };

  const csvData = filteredExpenses.map((exp) => ({
    Category: getCategoryName(exp.category),
    Amount: `$${exp.amount.toFixed(2)}`,
    Date: new Date(exp.date).toLocaleDateString(),
  }));

  // Generate PDF from expenses data
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Expense Report", 14, 22);

    const tableColumn = ["Category", "Amount", "Date"];
    const tableRows = filteredExpenses.map((exp) => [
      getCategoryName(exp.category),
      `$${exp.amount.toFixed(2)}`,
      new Date(exp.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
      });

    doc.save(`expenses_${startMonth}_to_${endMonth}.pdf`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Dashboard Overview</h2>

      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6">
        <input
          type="month"
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="month"
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button>
        <CSVLink
          data={csvData}
          filename={`expenses_${startMonth}_to_${endMonth}.csv`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download CSV
        </CSVLink>
        <button
          onClick={generatePDF}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Download PDF
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Monthly Expenses
          </h3>
          <Bar data={barData} />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Category Distribution
          </h3>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}
