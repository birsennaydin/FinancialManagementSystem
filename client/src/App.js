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
import FinanceResources from './components/FinanceResources';
import BudgetForm from './components/BudgetForm';

function App() {
  const [token, setToken] = useState('');

  if (!token) return <Login setToken={setToken} />;

  return (
    <div>
      <div className="bg-red-500 text-white text-2xl p-6 rounded-lg shadow-lg">
  This should be big, red and beautiful!
</div>
      <div className="bg-blue-500 text-white p-4 rounded-lg">
        Tailwind is working! 🎉
      </div>

      <LogoutButton setToken={setToken} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <BudgetForm token={token} />
          <ExpenseForm token={token} />
          <ExpenseList token={token} />
        </div>
        <div>
          <ExpenseChart token={token} />
          <MonthlyBarChart token={token} />
        </div>
      </div>

      <div className="mt-8">
        <BudgetAlert token={token} />
        <SavingsAdvice token={token} />
        <FinanceResources />
        <Dashboard token={token} />
      </div>
    </div>
  );
}

export default App;