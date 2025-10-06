import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isLoading } = useUserAuth();

  if (isLoading) {
      return (<div className="flex justify-center items-center h-screen">
      <div className="animate-spin border-4 border-t-4 border-cyan-500 rounded-full w-16 h-16 border-blue-400"></div>
    </div>); // หรือโหลดตัวหมุน
  }

  // ตรวจสอบการเข้าถึง
  const role = user?.role;
  const hasAccess = user && (role && (role === 'admin' || allowedRoles.includes(role)));


  if (!hasAccess) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
