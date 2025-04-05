import React from 'react';

const LogoutButton = ({ setToken }) => {
  const handleLogout = () => {
    setToken(''); // Clear token
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
