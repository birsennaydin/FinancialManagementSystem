import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm = ({ token }) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgets = {
      Groceries: 500,
      Transport: 300,
      Entertainment: 400,
    };

    try {
      const res = await axios.get('http://localhost:5050/api/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const totalForCategory = res.data.reduce((sum, exp) => {
        return exp.category === category ? sum + exp.amount : sum;
      }, 0);

      const newTotal = totalForCategory + Number(amount);
      const budgetLimit = budgets[category];

      if (budgetLimit && newTotal > budgetLimit) {
        const proceed = window.confirm(
          `${category} total (${newTotal}) exceeds your budget (${budgetLimit}). Do you still want to save this expense?`
        );
        if (!proceed) return;
      }

      await axios.post(
        'http://localhost:5050/api/expenses',
        {
          category,
          amount,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Expense added!');
      setCategory('');
      setAmount('');
      setDate('');
    } catch (err) {
      alert('Error adding expense');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Expense</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
