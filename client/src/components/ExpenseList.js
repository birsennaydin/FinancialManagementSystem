import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseList = ({ token }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setExpenses(res.data))
    .catch(err => console.error('Failed to fetch expenses', err));
  }, [token]);

  if (expenses.length === 0) {
    return <p>No expenses found.</p>;
  }

  return (
    <div>
      <h2>My Expenses</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.category} - ${exp.amount} on {new Date(exp.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
