const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const Budget = require("../models/Budget");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: threeMonthsAgo },
    });

    if (expenses.length === 0) {
      return res.json({
        suggestions: ["Add some expenses to receive personalized suggestions."],
      });
    }

    const categories = await Category.find({ user: userId });
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id.toString()] = cat.name;
    });

    const categoryTotals = {};
    expenses.forEach((exp) => {
      const catId = exp.category.toString();
      categoryTotals[catId] = (categoryTotals[catId] || 0) + exp.amount;
    });

    const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

    const suggestions = [];

    // 1️⃣ En çok harcanan 3 kategori
    sorted.slice(0, 3).forEach(([catId, total]) => {
      const catName = categoryMap[catId] || "Unknown";
      suggestions.push(`You spent a lot on ${catName}. Consider reducing your expenses there.`);
    });

    // 2️⃣ Harcama artışı kontrolü
    const currentMonth = new Date().getMonth();
    const monthlySpend = Array(3).fill(0);
    expenses.forEach((exp) => {
      const monthDiff = currentMonth - new Date(exp.date).getMonth();
      if (monthDiff >= 0 && monthDiff < 3) {
        monthlySpend[2 - monthDiff] += exp.amount;
      }
    });

    if (monthlySpend[1] < monthlySpend[2]) {
      suggestions.push("⚠️ Spending increased this month. Review your habits.");
    }

    // 3️⃣ Bütçe aşımı
    const currentMonthStr = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
    const budgets = await Budget.find({ user: userId });

    budgets.forEach((budget) => {
      const total = expenses
        .filter(
          (exp) =>
            exp.category.toString() === budget.category.toString() &&
            exp.date.getMonth() + 1 === parseInt(budget.month.split("-")[1]) &&
            exp.date.getFullYear() === parseInt(budget.month.split("-")[0])
        )
        .reduce((sum, exp) => sum + exp.amount, 0);

      if (total > budget.amount) {
        const catName = categoryMap[budget.category.toString()] || "Unknown";
        suggestions.push(`⚠️ You exceeded your budget in ${catName}. Consider revising it.`);
      }
    });

    res.json({ suggestions });
  } catch (err) {
    console.error("❌ Suggestion error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
