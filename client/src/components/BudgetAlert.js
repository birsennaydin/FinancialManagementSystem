import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetAlert = ({ token }) => {
  const [budgets, setBudgets] = useState({
    Groceries: 500,
    Transport: 300,
    Entertainment: 400
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const totals = {};

      res.data.forEach(exp => {
        totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
      });

      const overBudget = Object.entries(budgets).reduce((arr, [category, limit]) => {
        if (totals[category] && totals[category] > limit) {
          arr.push(`${category} spending (${totals[category]}) exceeded your budget (${limit})`);
        }
        return arr;
      }, []);

      setAlerts(overBudget);
    })
    .catch(err => console.error('Budget check failed', err));
  }, [token, budgets]);

  return (
    <div>
      <h2>Budget Alerts</h2>
      {alerts.length === 0 ? (
        <p>All spending is within budget ✅</p>
      ) : (
        <ul style={{ color: 'red' }}>
          {alerts.map((msg, idx) => <li key={idx}>{msg}</li>)}
        </ul>
      )}
    </div>
  );
};

export default BudgetAlert;
