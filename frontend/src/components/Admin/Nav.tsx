// src/components/Nav.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '../../contexts/UserAuthContext'; // Adjust the import based on your structure

const Nav: React.FC = () => {
  const { logOut } = useUserAuth(); // Get logOut from context

  const handleLogout = async () => {
    try {
      await logOut(); // Call logOut function
      console.log("Logged out successfully.");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-7 text-white flex items-center justify-between">
      <div className="flex-1"></div>
      <div className="flex space-x-4"> 
        <Link
          to="/ta"
          className="bg-gray-600 p-2 rounded hover:bg-gray-700 transition-colors"
        >
          ไปหน้า TA
        </Link>
        <Link
          to="/sg"
          className="bg-gray-600 p-2 rounded hover:bg-gray-700 transition-colors"
        >
          ไปหน้า SG
        </Link>
        <Link
          to="/login" // Redirect to login after logout
          className="bg-gray-600 p-2 rounded hover:bg-gray-700 transition-colors"
          onClick={handleLogout} // Call handleLogout on click
        >
          Logout
        </Link>
      </div>
      <h1 className="text-xl p-1">Admin</h1>
    </nav>
  );
};

export default Nav;
