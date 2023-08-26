import React, { useState } from 'react';
import './LoginForm.css';
import SignupForm from '../sign_up/SignupForm'; 

function LoginForm({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate loading state
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        console.log('Login successful');
        window.alert('Sign-up successful!');
        onLogin(); // Call the onLogin callback
      } else {
        setError('Invalid email or password');
      }

      setIsLoading(false);
    } catch (err) {
      setError('Login error');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      {showSignup ? (
        <SignupForm toggleMode={() => setShowSignup(false)} />
      ) : (
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

        {error && <p className="error-message">{error}</p>}

        <p className="signup-text">
            Don't you have an account?{' '}
            <span className="signup-link" onClick={() => setShowSignup(true)}>
              Sign Up
            </span>
          </p>
      </form>
      )}
    </div>
  );
}

export default LoginForm;
