import React from 'react';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';
import WorkoutLogger from './WorkoutLogger';
import WorkoutHistory from './WorkoutHistory';

const WorkoutDashboard = () => {
  const { user } = useAuthContext();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Log Workout</h2>
          <WorkoutLogger />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Recent Workouts</h2>
          <WorkoutHistory />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDashboard;