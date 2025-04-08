import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // CSS 파일 임포트

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 폼 열기 상태 관리
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (email === 'test@example.com' && password === 'password123') {
      setUser({ email }); // 사용자 정보 설정
      navigate('/'); // 홈으로 이동
    } else {
      setError('Invalid email or password');
    }
  };

  const handleOpenLogin = () => {
    setIsLoginOpen(true); // 로그인 폼 열기
  };

  return (
    <div className="login-container bg-green-50 min-h-screen flex flex-col items-center justify-center">
      {!isLoginOpen && (
        <div className="fridge-container">
          <img
            src={require('./fridge-icon.png')}
            alt="Fridge"
            className="fridge-icon"
            onClick={handleOpenLogin}
          />
        </div>
      )}

      {isLoginOpen && (
        <div className="login-form-container bg-white p-6 rounded-lg shadow-md w-96 transition-all duration-500 ease-in-out">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin}>
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
              className="w-full p-2 border rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
