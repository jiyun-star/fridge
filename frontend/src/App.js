import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import RecipePage from "./RecipePage";
import LoginPage from "./LoginPage";
import AboutPage from './AboutPage';
import PrivacyPage from './PrivacyPage';
import HistoryPage from './HistoryPage';
import Header from './Header';
import SignUpPage from './SignUpPage';

function App() {
  const [ingredients, setIngredients] = useState([]); // 재료 상태 관리
  const [user, setUser] = useState(null); // 사용자 상태 관리

  return (
    <Router>
      <Header /> 
      <div className="main-content"> 
        <Routes>
          <Route 
            path="/" 
            element={user ? 
              <HomePage setIngredients={setIngredients} user={user} setUser={setUser} /> 
              : <Navigate to="/login" /> 
            } 
          />
          <Route path="/recipes" element={<RecipePage ingredients={ingredients} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/signup" element={<SignUpPage />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
