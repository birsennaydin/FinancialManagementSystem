import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5050/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setData(res.data))
    .catch(err => console.error('Failed to fetch dashboard', err));
  }, [token]);

  if (!data) return <p className="text-center text-gray-500">Loading dashboard...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <p className="text-lg mb-6">Total Spent: <span className="font-bold text-blue-600">${data.totalSpent}</span></p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
        <ul className="list-disc list-inside text-gray-700">
          {Object.entries(data.categoryBreakdown).map(([category, amount]) => (
            <li key={category} className="mb-1">
              {category}: <span className="font-medium text-green-600">${amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Monthly Summary</h3>
        <ul className="list-disc list-inside text-gray-700">
          {data.monthlySummary.map((item, idx) => (
            <li key={idx} className="mb-1">
              {item.month}: <span className="font-medium text-purple-600">${item.total}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
