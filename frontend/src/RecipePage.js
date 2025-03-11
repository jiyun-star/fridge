import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipePage({ ingredients = [] }) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    if (ingredients.length === 0) return;

    const fetchRecipes = async () => {
      try {
        const recipeMap = new Map(); // 중복 제거를 위한 Map

        for (const ingredient of ingredients) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
          );
          const data = await response.json();

          if (data.meals) {
            data.meals.forEach((meal) => {
              if (!recipeMap.has(meal.idMeal)) {
                recipeMap.set(meal.idMeal, { ...meal, count: 1 });
              } else {
                recipeMap.get(meal.idMeal).count += 1;
              }
            });
          }
        }

        const filteredRecipes = Array.from(recipeMap.values()).filter(
          (meal) => meal.count === ingredients.length
        );

        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  return (
    <div>
      <h1>Recommended Recipes</h1>

      {recipes === null ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <ul>
          {recipes.map((meal) => (
            <li key={meal.idMeal}>
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} width="150" />
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
