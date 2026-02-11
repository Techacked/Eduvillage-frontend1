import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isAuthenticated && <Sidebar />}
      <main className={isAuthenticated ? 'ml-64 p-6' : ''}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
