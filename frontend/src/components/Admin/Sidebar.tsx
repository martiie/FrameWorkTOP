import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 p-4 w-80 h-screen flex flex-col">
      <Link to="/admin/dashboard">
        <img src="/unity.jpg" alt="Unity Logo" className="w-70 h-12 mb-4 cursor-pointer" />
      </Link>
      <ul className="text-white flex-2">
        <li className="border-b border-gray-600 last:border-b-0">
          <a
            href="/admin/dashboard"
            className="block p-4 hover:bg-gray-700 transition-colors"
          >
            Dashboard
          </a>
        </li>
        <li className="border-b border-gray-600 last:border-b-0">
          <a
            href="/admin/zones"
            className="block p-4 hover:bg-gray-700 transition-colors"
          >
            Manage Zone
          </a>
        </li>
        <li className="border-b border-gray-600 last:border-b-0">
          <a
            href="/admin/cameras"
            className="block p-4 hover:bg-gray-700 transition-colors"
          >
            Manage Camera
          </a>
        </li>
        <li className="border-b border-gray-600 last:border-b-0">
          <a
            href="/admin/reports"
            className="block p-4 hover:bg-gray-700 transition-colors"
          >
            Reports
          </a>
        </li>
        <li className="border-b border-gray-600 last:border-b-0">
          <a
            href="/admin/settings"
            className="block p-4 hover:bg-gray-700 transition-colors"
          >
            Settings
          </a>
        </li>
        <li className="border-b border-gray-600 last:border-b-0">
          <a
            href="/admin/dashboard"
            className="block p-4 hover:bg-gray-700 transition-colors"
          >
            อื่นๆ (ถ้ามี)
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
