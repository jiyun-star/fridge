import React from 'react';
import { useNavigate } from 'react-router-dom';

function RecipePage({ ingredients }) {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Recommended Recipes</h1>

      {ingredients.length > 0 ? (
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients detected.</p>
      )}

      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default RecipePage;