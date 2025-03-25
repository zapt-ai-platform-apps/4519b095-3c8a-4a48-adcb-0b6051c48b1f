import React, { useState } from 'react';

const WORKOUT_TYPES = [
  'Strength Training',
  'Cardio',
  'HIIT',
  'Recovery',
  'Skills Practice'
];

const WorkoutLogger = () => {
  const [workoutType, setWorkoutType] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('medium');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Workout logged:', {
        type: workoutType,
        duration: parseInt(duration, 10),
        intensity,
        notes
      });
      
      // Reset form
      setWorkoutType('');
      setDuration('');
      setIntensity('medium');
      setNotes('');
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error logging workout:', error);
      setError('Failed to log workout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="card">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Workout successfully logged!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="workoutType" className="form-label">Workout Type</label>
          <select
            id="workoutType"
            className="input-field"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            required
            disabled={isLoading}
          >
            <option value="">Select workout type</option>
            {WORKOUT_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="duration" className="form-label">Duration (minutes)</label>
          <input
            id="duration"
            type="number"
            className="input-field"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration in minutes"
            min="1"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-4">
          <label className="form-label">Intensity</label>
          <div className="flex space-x-4">
            {['low', 'medium', 'high'].map(level => (
              <label key={level} className="flex items-center">
                <input
                  type="radio"
                  value={level}
                  checked={intensity === level}
                  onChange={() => setIntensity(level)}
                  className="mr-2"
                  disabled={isLoading}
                />
                <span className="capitalize">{level}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            id="notes"
            className="input-field"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How did you feel? Any achievements?"
            rows="3"
            disabled={isLoading}
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="btn-primary cursor-pointer w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Logging...' : 'Log Workout'}
        </button>
      </form>
    </div>
  );
};

export default WorkoutLogger;