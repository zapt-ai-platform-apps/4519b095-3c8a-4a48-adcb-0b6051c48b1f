import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page, but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;