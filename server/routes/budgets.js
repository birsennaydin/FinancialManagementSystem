const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

// GET all budgets for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  const budgets = await Budget.find({ userId: req.user.id });
  res.json(budgets);
});

// POST: add or update budget
router.post('/', authMiddleware, async (req, res) => {
  const { category, limit } = req.body;

  let budget = await Budget.findOne({ userId: req.user.id, category });

  if (budget) {
    budget.limit = limit;
  } else {
    budget = new Budget({ userId: req.user.id, category, limit });
  }

  await budget.save();
  res.json({ message: 'Budget saved', budget });
});

module.exports = router;
