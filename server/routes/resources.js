const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const resources = [
    {
      title: "How to Budget Your Monthly Expenses",
      url: "https://www.investopedia.com/articles/pf/07/budgeting.asp",
      summary: "Learn how to create a monthly budget that works for your lifestyle and goals."
    },
    {
      title: "50 Easy Ways to Save Money",
      url: "https://www.ramseysolutions.com/saving/ways-to-save-money",
      summary: "Practical saving strategies that can be implemented by anyone, no matter your income."
    },
    {
      title: "Understanding Credit Scores",
      url: "https://www.experian.com/blogs/news/2021/05/what-is-a-good-credit-score/",
      summary: "Explore what makes up your credit score and how to improve it."
    }
  ];

  res.json(resources);
});

module.exports = router;
