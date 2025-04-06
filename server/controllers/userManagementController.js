const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const Category = require('../models/Category');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('name email');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.user.id;

    // Check if email is taken by another user
    const emailTaken = await User.findOne({ email, _id: { $ne: userId } });
    if (emailTaken) {
      return res.status(400).json({ error: 'Email is already in use by another account.' });
    }

    const updates = { name, email };

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updates.password = hashed;
    }

    const updated = await User.findByIdAndUpdate(userId, updates, { new: true }).select('name email');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await Expense.deleteMany({ user: userId });
    await Budget.deleteMany({ user: userId });
    await Category.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    res.json({ message: 'Account and all related data deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
