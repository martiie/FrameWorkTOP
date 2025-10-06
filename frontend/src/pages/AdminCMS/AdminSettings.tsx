import React from 'react';
import Nav from '../../components/Admin/Nav';
import Sidebar from '../../components/Admin/Sidebar';

const AdminSettings: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Nav />
        <main className="p-4">
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <p>Manage your settings here.</p>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;