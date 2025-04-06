// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const auth = require('../middleware/auth');

router.post('/', auth, budgetController.addBudget);
router.get('/', auth, budgetController.getBudgets);
router.put('/:id', auth, budgetController.updateBudget);

module.exports = router;
