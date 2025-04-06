// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const userManagementController = require('../controllers/userManagementController');
const auth = require('../middleware/auth');

router.get('/', auth, userManagementController.getProfile);
router.put('/:id', auth, userManagementController.updateProfile);
router.delete('/:id', auth, userManagementController.deleteAccount);

module.exports = router;
