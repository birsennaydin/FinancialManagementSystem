import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavingsAdvice = ({ token }) => {
  const [advice, setAdvice] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const data = res.data;

      const totals = {};
      const suggestions = [];

      data.forEach(exp => {
        totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
      });

      // Örnek senaryolar (kendi kurallarını genişletebilirsin)
      Object.entries(totals).forEach(([cat, total]) => {
        if (total > 500) {
          suggestions.push(`You are spending a lot on ${cat}. Consider setting a tighter budget.`);
        }
        if (cat.toLowerCase().includes('entertainment') && total > 300) {
          suggestions.push(`Try reducing Entertainment expenses. Look for free or low-cost options.`);
        }
        if (cat.toLowerCase().includes('groceries') && total > 400) {
          suggestions.push(`Grocery spending is high. Planning weekly meals might help reduce costs.`);
        }
      });

      if (data.length > 10) {
        suggestions.push('You have many small expenses. Consider reviewing if all are necessary.');
      }

      if (suggestions.length === 0) {
        suggestions.push('Great job! Your spending is under control.');
      }

      setAdvice(suggestions);
    })
    .catch(err => console.error('Advice error:', err));
  }, [token]);

  return (
    <div>
      <h2>Savings Suggestions</h2>
      <ul>
        {advice.map((text, idx) => (
          <li key={idx}>💡 {text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SavingsAdvice;
