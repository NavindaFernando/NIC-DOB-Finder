import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate loading state
    setIsLoading(true);
    setError('');

    // Simulate API request
    try {
      // Login logic here

      // Simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome back!</h2>
        <p className="login-description">
          NIC converter (birthday finder) NIC to DoB
        </p>
        <div className="input-group">
          <label htmlFor="email">
            <i className="fas fa-envelope"></i>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            placeholder="you@example.com"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">
            <i className="fas fa-lock"></i>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="At least 8 characters"
          />
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className="signup-text">
          Don't you have an account? <span className="signup-link">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;

