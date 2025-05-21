import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import { AuthProvider } from './contexts/AuthContext';
import { CaseProvider } from './contexts/CaseContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CaseProvider>
          <NotificationProvider>
            <AppLayout />
          </NotificationProvider>
        </CaseProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;