import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/modules/shared/ui/Layout';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';

const HomePage = () => {
  const { user } = useAuthContext();
  
  return (
    <Layout>
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Elite Athlete Training</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Track your workouts, monitor your progress, and achieve your athletic goals with our specialized training platform.
          </p>
          
          {user ? (
            <Link 
              to="/dashboard" 
              className="btn-primary text-lg px-8 py-3 cursor-pointer inline-block"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="btn-primary text-lg px-8 py-3 cursor-pointer inline-block"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features for Elite Athletes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Workout Tracking</h3>
              <p className="text-gray-600">
                Log your workouts with detailed information about type, duration, and intensity.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Progress Monitoring</h3>
              <p className="text-gray-600">
                Track your athletic progress over time with detailed statistics and visual charts.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Goal Setting</h3>
              <p className="text-gray-600">
                Set and achieve your athletic goals with our specialized training tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;