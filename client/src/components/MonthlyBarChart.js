import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer
} from 'recharts';

const MonthlyBarChart = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5050/api/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const monthlyTotals = {};

      res.data.forEach(exp => {
        const date = new Date(exp.date);
        const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Apr"
        monthlyTotals[month] = (monthlyTotals[month] || 0) + exp.amount;
      });

      const chartData = Object.entries(monthlyTotals).map(([month, total]) => ({
        month,
        total
      }));

      setData(chartData);
    })
    .catch(err => console.error('Bar chart error:', err));
  }, [token]);

  return (
    <div>
      <h2>Monthly Spending</h2>
      {data.length === 0 ? (
        <p>No data to show</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyBarChart;
