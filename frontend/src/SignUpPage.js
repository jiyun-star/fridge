import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function SignUpPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('http://localhost:5000/register', {  // 해당 URL은 실제 백엔드로 변경
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (data.message === 'User registered successfully!') {
      setUser({ email });  
      navigate('/');  
    } else {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="signup-container bg-green-50 min-h-screen flex flex-col items-center justify-center">
      <div className="signup-form-container bg-white p-6 rounded-lg shadow-md w-96 transition-all duration-500 ease-in-out">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded-md mb-2"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-md mb-2"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-2 border rounded-md mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
