import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import LoginForm from '@/modules/auth/ui/LoginForm';
import Layout from '@/modules/shared/ui/Layout';

const LoginPage = () => {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page they were trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/dashboard';
  
  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user && !loading) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto card">
          <h1 className="text-3xl font-bold text-center mb-8">Elite Athlete Training App</h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;