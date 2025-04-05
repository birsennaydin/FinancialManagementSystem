import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BudgetForm = ({ token }) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    const res = await axios.get('http://localhost:5050/api/budgets', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setBudgets(res.data);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:5050/api/budgets', {
      category,
      limit
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setCategory('');
    setLimit('');
    fetchBudgets();
  };

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold">Set Budget</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center flex-wrap">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <input
          type="number"
          placeholder="Limit"
          value={limit}
          onChange={e => setLimit(e.target.value)}
          className="border px-2 py-1 rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">Save</button>
      </form>

      <div className="mt-4">
        <h3 className="font-medium">Current Budgets</h3>
        <ul>
          {budgets.map(b => (
            <li key={b._id}>{b.category}: ${b.limit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetForm;
