import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      isActive ? 'bg-blue-200 font-semibold' : ''
    }`;

  return (
    <div className="w-64 h-screen bg-white border-r p-4 shadow">
      <h2 className="text-2xl font-bold mb-6">SmartSpend</h2>
      <nav className="flex flex-col space-y-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/expenses" className={navLinkClass}>
          Expenses
        </NavLink>
        <NavLink to="/budgets" className={navLinkClass}>
          Budgets
        </NavLink>
      </nav>
    </div>
  );
}
