import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes';
import { AuthProvider } from './modules/auth/context/AuthProvider';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="h-full">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;