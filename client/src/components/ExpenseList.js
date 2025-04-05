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
    return (
      <div className="text-center text-gray-600 mt-6">
        <p>No expenses found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">My Expenses</h2>
      <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-700 shadow rounded-md overflow-x-auto">
        <thead className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Amount</th>
            <th className="py-3 px-4 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{exp.category}</td>
              <td className="py-2 px-4">${exp.amount}</td>
              <td className="py-2 px-4">{new Date(exp.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
