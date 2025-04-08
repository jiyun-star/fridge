import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';  

function HomePage({ setIngredients, setUser, user }) {
  const [ingredients, setLocalIngredients] = useState([]); 
  const [imageUrl, setImageUrl] = useState(null);
  const [newIngredient, setNewIngredient] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const fileInput = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', fileInput.current.files[0]);

    const file = fileInput.current.files[0];
    const imageUrl = URL.createObjectURL(file);  
    setImageUrl(imageUrl);

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    const uniqueIngredients = [...new Set(data.ingredients)];
    setLocalIngredients(uniqueIngredients);
    setIngredients(uniqueIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setLocalIngredients(newIngredients);
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    if (newIngredient && !ingredients.includes(newIngredient)) {
      const updatedIngredients = [...ingredients, newIngredient];
      setLocalIngredients(updatedIngredients);
      setIngredients(updatedIngredients);
      setNewIngredient('');
    } else {
      alert("Ingredient already exists or is empty!");
    }
  };

  const handleFindRecipes = async () => {
    if (ingredients.length === 0) return;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients.join(",")}`);
    const data = await response.json();

    if (data.meals) {
      navigate('/recipes', { state: { recipes: data.meals } });
    } else {
      alert("No recipes found with these ingredients.");
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (email === 'test@example.com' && password === 'password123') {
      setUser({ email });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="homepage-container">
      <h1 className="title">🍽️ Fridge Ingredients</h1>

      {!user && (
        <div className="login-section bg-green-50 p-4 rounded-md shadow-md mb-4">
          <h2 className="text-green-700 font-bold text-xl mb-2">Login</h2>
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

      {user && (
        <div className="upload-container">
          <input type="file" ref={fileInput} className="file-input" />
          <button onClick={handleSubmit} className="upload-button">Upload</button>
        </div>
      )}

      {imageUrl && (
        <div className="image-preview">
          <h3>Your Image:</h3>
          <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
        </div>
      )}

      {ingredients.length > 0 && (
        <div className="ingredients-list">
          <h3>Detected Ingredients:</h3>
          <div className="ingredients-container">
            {ingredients.map((item, index) => (
              <div key={index} className="ingredient-item">
                <span>{item}</span>
                <button 
                  onClick={() => handleRemoveIngredient(index)} 
                  className="remove-button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {user && (
        <div className="add-ingredient-container">
          <input 
            type="text" 
            value={newIngredient} 
            onChange={(e) => setNewIngredient(e.target.value)} 
            placeholder="Add a new ingredient" 
            className="add-ingredient-input"
          />
          <button onClick={handleAddIngredient} className="add-ingredient-button">Add</button>
        </div>
      )}

      {user && (
        <button 
          onClick={handleFindRecipes}
          disabled={ingredients.length === 0}
          className={`find-recipes-button ${ingredients.length === 0 ? 'disabled' : ''}`}
        >
          Find Recipes
        </button>
      )}
    </div>
  );
}

export default HomePage;
