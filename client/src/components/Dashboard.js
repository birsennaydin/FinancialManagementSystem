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

  if (!data) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Spent: ${data.totalSpent}</p>
      <h3>Category Breakdown</h3>
      <ul>
        {Object.entries(data.categoryBreakdown).map(([category, amount]) => (
          <li key={category}>{category}: ${amount}</li>
        ))}
      </ul>
      <h3>Monthly Summary</h3>
      <ul>
        {data.monthlySummary.map((item, idx) => (
          <li key={idx}>{item.month}: ${item.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
