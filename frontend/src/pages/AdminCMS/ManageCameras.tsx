import React from 'react';
import Nav from '../../components/Admin/Nav';
import Sidebar from '../../components/Admin/Sidebar';

const ManageCameras: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Nav />
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold">จัดการกล้อง</h1>
          <p>Manage and configure cameras here.</p>
        </main>
      </div>
    </div>
  );
};

export default ManageCameras;
