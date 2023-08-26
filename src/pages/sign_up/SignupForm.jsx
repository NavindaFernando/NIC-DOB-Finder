import React, { useState } from 'react';
import './SignupForm.css';

function SignupForm({ toggleMode }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullName, email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data.message);
        window.alert('Sign-up successful!');
      } else {
        window.alert('Error signing up. Please try again.');
      }
    } catch (err) {
      window.alert('Error signing up. Please try again.');
    }

    // Check if terms are accepted
    if (!termsAccepted) {
      setError('Please accept the terms & conditions.');
      return;
    }

    // Simulate loading state
    setIsLoading(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create your Account</h2>
        <p className="account-description">
          Welcome back! Please enter your details
        </p>
        <div className="input-group">
          <label htmlFor="fullName">
            <i className="fas fa-user"></i>
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Enter your name"
          />
        </div>
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
            placeholder="Enter your email address"
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
            placeholder="Password (at least 8 characters)"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">
            <i className="fas fa-lock"></i>
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Confirm Password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="termsAccepted" className="checkbox-label">
            <input
            type="checkbox"
            id="termsAccepted"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            disabled={isLoading}
            />
            <span className="checkmark"></span>
            I accept all terms & conditions
            </label>
          </div>
            
          {error && <p className="signup-error-message">{error}</p>}

        <button type="submit" className="signup-button" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="signup-text">
          Already have an account?{' '}
          <span className="signup-link" onClick={toggleMode}>
            Sign in
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupForm;

