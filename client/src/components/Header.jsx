// src/components/Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // token varsa
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-gray-800">SmartSpend</h1>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-gray-700 font-medium hover:text-blue-600"
        >
          Birsen Aydın ⌄
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
