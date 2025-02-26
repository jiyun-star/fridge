import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RecipePage from "./RecipePage";

function App() {
  const [ingredients, setIngredients] = useState([]); // 재료 상태 관리

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setIngredients={setIngredients} />} />
        <Route path="/recipes" element={<RecipePage ingredients={ingredients} />} />
      </Routes>
    </Router>
  );
}

export default App;