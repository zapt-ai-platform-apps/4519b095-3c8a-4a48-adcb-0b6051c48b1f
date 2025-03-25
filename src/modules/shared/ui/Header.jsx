import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/modules/auth/context/AuthProvider';

const Header = () => {
  const { user, signOut, loading } = useAuthContext();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Elite Athlete Training</Link>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Welcome, Athlete!</span>
            <button 
              onClick={handleSignOut}
              disabled={loading}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded transition duration-300 cursor-pointer"
            >
              {loading ? 'Loading...' : 'Sign Out'}
            </button>
          </div>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded transition duration-300">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;