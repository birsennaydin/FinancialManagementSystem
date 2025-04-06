const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.post('/', auth, categoryController.addCategory);
router.get('/', auth, categoryController.getCategories);

module.exports = router;
