import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE'];

const ExpenseChart = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      // Group expenses by category and sum amounts
      const grouped = res.data.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
      }, {});

      // Convert to Recharts format
      const formatted = Object.entries(grouped).map(([key, value]) => ({
        name: key,
        value
      }));

      setData(formatted);
    })
    .catch((err) => console.error('Chart data fetch failed', err));
  }, [token]);

  return (
    <div>
      <h2>Expenses by Category</h2>
      {data.length === 0 ? (
        <p>No data available</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
  );
};

export default ExpenseChart;
