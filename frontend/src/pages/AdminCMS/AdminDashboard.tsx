import React from 'react';
import Nav from '../../components/Admin/Nav';
import Sidebar from '../../components/Admin/Sidebar';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Nav />
        <main className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p>Welcome to the Admin Dashboard!</p>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;