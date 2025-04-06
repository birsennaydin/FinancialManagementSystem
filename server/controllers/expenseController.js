const Expense = require('../models/Expense');

// Create a new expense
exports.addExpense = async (req, res) => {
  try {
    const { category, amount, date } = req.body;

    const expense = new Expense({
      user: req.user.id,
      category,
      amount,
      date
    });

    await expense.save();
    res.status(201).json({ message: 'Expense saved successfully', expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all expenses for the logged-in user
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Kayıt sadece o kullanıcıya aitse silinsin
    const deleted = await Expense.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Expense not found or unauthorized" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};