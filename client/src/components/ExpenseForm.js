import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ token }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
