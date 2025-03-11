import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipePage({ ingredients }) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log("Received ingredients:", ingredients); // 🔍 ingredients 값 확인

    fetch("/recipes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const filteredRecipes = data.filter((recipe) =>
          ingredients.every((ing) => recipe.ingredients.includes(ing))
        );
        
        setRecipes(filteredRecipes);
      })
      .catch((error) => console.error("Error loading recipes:", error));
  }, [ingredients]);
  
  return (
    <div>
      <h1>Recommended Recipes</h1>

      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <h3>{recipe.name}</h3>
              <p>Ingredients: {recipe.ingredients.join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matching recipes found.</p>
      )}

      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default RecipePage;
