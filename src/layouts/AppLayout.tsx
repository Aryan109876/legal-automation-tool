import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';
import Header from '../components/navigation/Header';
import Dashboard from '../pages/Dashboard';
import CaseManagement from '../pages/CaseManagement';
import CaseDetail from '../pages/CaseDetail';
import Documents from '../pages/Documents';
import DocumentDetail from '../pages/DocumentDetail';
import Clients from '../pages/Clients';
import ClientDetail from '../pages/ClientDetail';
import Calendar from '../pages/Calendar';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import Login from '../pages/Login';
import { useAuth } from '../contexts/AuthContext';

const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          collapsed={sidebarCollapsed} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases" element={<CaseManagement />} />
            <Route path="/cases/:id" element={<CaseDetail />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/documents/:id" element={<DocumentDetail />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:id" element={<ClientDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;