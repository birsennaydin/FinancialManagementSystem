const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

// POST /api/expenses - Add a new expense
router.post('/', auth, expenseController.addExpense);

// GET /api/expenses - Get all expenses for the logged-in user
router.get('/', auth, expenseController.getExpenses);

module.exports = router;
