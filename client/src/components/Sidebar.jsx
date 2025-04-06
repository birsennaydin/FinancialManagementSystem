import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/dashboard/expenses", label: "Expenses" },
    { path: "/dashboard/budgets", label: "Budgets" },
    { path: "/dashboard/categories", label: "Categories" },
  ];

  return (
    <aside className="w-64 bg-white p-4 border-r">
      <h2 className="text-2xl font-bold mb-8">SmartSpend</h2>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "font-semibold bg-blue-200 p-2 rounded"
                : "p-2 hover:bg-gray-100 rounded"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
