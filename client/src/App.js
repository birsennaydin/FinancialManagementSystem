import React, { useState } from 'react';
import ExpenseChart from './components/ExpenseChart';
import Login from './components/Login';
import ExpenseForm from './components/ExpenseForm';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import LogoutButton from './components/LogoutButton';
import MonthlyBarChart from './components/MonthlyBarChart';
import BudgetAlert from './components/BudgetAlert';
import SavingsAdvice from './components/SavingsAdvice';

function App() {
  const [token, setToken] = useState('');

  if (!token) return <Login setToken={setToken} />;

  return (
    <div>
      <h1>SmartSpend</h1>
      <LogoutButton setToken={setToken} />
      <ExpenseForm token={token} />
      <ExpenseList token={token} />
      <ExpenseChart token={token} />
      <MonthlyBarChart token={token} />
      <BudgetAlert token={token} />
      <SavingsAdvice token={token} />
      <Dashboard token={token} />
    </div>
  );
}

export default App;
