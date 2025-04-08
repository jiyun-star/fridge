import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RecipePage() {
  const location = useLocation();
  const { recipes } = location.state || { recipes: [] }; // HomePage에서 전달된 레시피 데이터
  const [ingredients, setIngredients] = useState({});

  // 각 레시피의 아이디로 상세 정보를 불러오는 함수
  const fetchRecipeDetails = async (idMeal) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
      const data = await response.json();
      return data.meals[0];  // meals 배열의 첫 번째 항목을 반환
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  // 레시피 아이디로 데이터를 받아오는 useEffect
  useEffect(() => {
    const loadIngredients = async () => {
      const recipeDetails = {};
      for (const recipe of recipes) {
        const details = await fetchRecipeDetails(recipe.idMeal);
        const ingredientsList = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = details[`strIngredient${i}`];
          if (ingredient) {
            ingredientsList.push(ingredient); // 재료 이름만 추가
          }
        }
        recipeDetails[recipe.idMeal] = ingredientsList; // 레시피 아이디에 맞는 재료 이름 리스트 저장
      }
      setIngredients(recipeDetails);  // 최종적으로 상태 업데이트
    };

    if (recipes.length > 0) {
      loadIngredients();
    }
  }, [recipes]);

  return (
    <div className="recipes-container" style={{ padding: '20px' }}>
      <h1>Recommended Recipes</h1>

      {recipes.length > 0 ? (
        <div className="recipe-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {recipes.map((recipe, index) => (
            <div key={index} className="recipe-card" style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '10px',
              textAlign: 'center',
              backgroundColor: '#fff',
            }}>
              <h3>{recipe.strMeal}</h3>
              <img 
                src={recipe.strMealThumb} 
                alt={recipe.strMeal} 
                className="recipe-image"
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div className="recipe-details" style={{ marginTop: '10px' }}>
                <h4>Ingredients:</h4>
                <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                  {/* 해당 레시피의 아이디로 가져온 재료들 */}
                  {ingredients[recipe.idMeal] && ingredients[recipe.idMeal].map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
}

export default RecipePage;
