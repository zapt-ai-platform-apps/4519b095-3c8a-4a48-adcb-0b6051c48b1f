import React from 'react';
import Layout from '@/modules/shared/ui/Layout';
import WorkoutDashboard from '@/modules/workouts/ui/WorkoutDashboard';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';

const DashboardPage = () => {
  const { user } = useAuthContext();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, Athlete!</h1>
        <WorkoutDashboard />
      </div>
    </Layout>
  );
};

export default DashboardPage;