import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    const { success, error } = await signIn(email, password);
    
    if (!success) {
      setErrorMessage(error.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          type="email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          disabled={loading}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          disabled={loading}
        />
      </div>
      
      {errorMessage && (
        <div className="form-error mb-4">{errorMessage}</div>
      )}
      
      <button 
        type="submit" 
        className="btn-primary cursor-pointer w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;