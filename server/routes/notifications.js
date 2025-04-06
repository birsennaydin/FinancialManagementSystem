const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { sendReminder } = require('../controllers/notificationController');

router.post('/', authMiddleware, sendReminder);

module.exports = router;
