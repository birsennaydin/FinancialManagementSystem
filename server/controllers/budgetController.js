// controllers/budgetController.js
const Budget = require('../models/Budget');

exports.addBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;

    const exists = await Budget.findOne({
        user: req.user.id,
        category,
        month,
      });
  
      if (exists) {
        return res
          .status(400)
          .json({ error: 'A budget already exists for this category and month.' });
      }

    const budget = new Budget({
      user: req.user.id,
      category,
      amount,
      month
    });

    await budget.save();
    res.status(201).json({ message: 'Budget saved successfully ✅', budget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).populate('category');
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a budget
exports.updateBudget = async (req, res) => {
    try {
      const { category, amount, month } = req.body;
      const budgetId = req.params.id;
      const userId = req.user.id;
  
      // Aynı kullanıcı, aynı ay ve kategori için başka bir kayıt var mı?
      const existing = await Budget.findOne({
        _id: { $ne: budgetId }, // bu kayıt haricindeki kayıtlar
        user: userId,
        category,
        month,
      });
  
      if (existing) {
        return res.status(409).json({ error: "This category already has a budget for the selected month." });
      }
  
      const updated = await Budget.findOneAndUpdate(
        { _id: budgetId, user: userId },
        { category, amount, month },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ error: "Budget not found" });
      }
  
      res.json({ message: "Budget updated successfully", budget: updated });
    } catch (err) {
      console.error("Update failed", err);
      res.status(500).json({ error: err.message });
    }
  };