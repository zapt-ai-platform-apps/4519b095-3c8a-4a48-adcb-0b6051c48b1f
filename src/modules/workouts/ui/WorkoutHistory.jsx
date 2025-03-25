import React from 'react';

// Mock data for workout history
const SAMPLE_WORKOUTS = [
  {
    id: 1,
    type: 'Strength Training',
    date: '2023-06-15',
    duration: 45,
    intensity: 'high'
  },
  {
    id: 2,
    type: 'Cardio',
    date: '2023-06-13',
    duration: 30,
    intensity: 'medium'
  },
  {
    id: 3,
    type: 'Recovery',
    date: '2023-06-11',
    duration: 60,
    intensity: 'low'
  }
];

const WorkoutHistory = () => {
  // In a real app, this would fetch data from an API
  const workouts = SAMPLE_WORKOUTS;
  
  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="card">
      {workouts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No workouts logged yet. Start tracking your progress!
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {workouts.map(workout => (
            <div key={workout.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{workout.type}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(workout.date).toLocaleDateString()} • {workout.duration} minutes
                  </p>
                </div>
                <span 
                  className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getIntensityColor(workout.intensity)}`}
                >
                  {workout.intensity}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All Workouts →
        </button>
      </div>
    </div>
  );
};

export default WorkoutHistory;