import './App.css';
import React, { useState } from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import LoginForm from './pages/login_form/LoginForm';
import SignupForm from './pages/sign_up/SignupForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;