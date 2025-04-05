import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ token }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Define local budgets (same as BudgetAlert.js)
    const budgets = {
      Groceries: 500,
      Transport: 300,
      Entertainment: 400
    };
  
    try {
      // Fetch current expenses
      const res = await axios.get('http://localhost:5050/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Total of current category
      const totalForCategory = res.data.reduce((sum, exp) => {
        return exp.category === category ? sum + exp.amount : sum;
      }, 0);
  
      const newTotal = totalForCategory + Number(amount);
      const budgetLimit = budgets[category];
  
      // If there is a limit and new total exceeds it
      if (budgetLimit && newTotal > budgetLimit) {
        const proceed = window.confirm(
          `${category} total (${newTotal}) exceeds your budget (${budgetLimit}). Do you still want to save this expense?`
        );
        if (!proceed) return;
      }
  
      // Proceed with saving
      await axios.post('http://localhost:5050/api/expenses', {
        category,
        amount,
        date
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      alert('Expense added!');
      setCategory('');
      setAmount('');
      setDate('');
    } catch (err) {
      alert('Error adding expense');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ExpenseForm;
