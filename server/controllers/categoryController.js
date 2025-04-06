const Category = require('../models/Category');

// Add new category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Aynı isimde kategori tekrar eklenmesin
    const exists = await Category.findOne({ user: req.user.id, name });
    if (exists) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const category = new Category({
      user: req.user.id,
      name
    });

    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get categories for user
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id }).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
