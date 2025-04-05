const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Static dashboard data
const mockTrends = {
  totalSpent: 450,
  categoryBreakdown: {
    Groceries: 180,
    Transport: 90,
    Utilities: 60,
    Entertainment: 120
  },
  monthlySummary: [
    { month: 'January', total: 300 },
    { month: 'February', total: 400 },
    { month: 'March', total: 450 }
  ]
};

// GET /api/dashboard - Protected mock dashboard
router.get('/', auth, (req, res) => {
  res.json(mockTrends);
});

module.exports = router;
