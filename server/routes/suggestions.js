const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    // Get user's expenses from the last 3 months
    const expenses = await Expense.find({
      user: userId,
      date: { $gte: threeMonthsAgo },
    });

    // Group by category ID
    const totals = {};
    expenses.forEach((e) => {
      const cat = e.category.toString();
      totals[cat] = (totals[cat] || 0) + e.amount;
    });

    const topCategoryEntry = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

    if (!topCategoryEntry) {
      return res.json({ suggestion: "Add more expenses to get personalised suggestions." });
    }

    const [topCategoryId, topAmount] = topCategoryEntry;

    // Fetch the category name
    const categoryDoc = await Category.findById(topCategoryId);
    const categoryName = categoryDoc ? categoryDoc.name : "Unknown Category";

    res.json({
      category: categoryName,
      total: topAmount,
      suggestion: `You spent a lot on ${categoryName}. Consider reviewing your spending or setting a tighter budget for this category.`,
    });
  } catch (err) {
    console.error("Suggestion error:", err);
    res.status(500).json({ error: "Failed to generate suggestion." });
  }
});

module.exports = router;
