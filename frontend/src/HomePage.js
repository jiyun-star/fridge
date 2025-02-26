import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setIngredients }) {
  const [ingredients, setLocalIngredients] = useState([]); 
  const [imageUrl, setImageUrl] = useState(null);
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
    const uniqueIngredients = [...new Set(data.ingredients)]; // 중복 제거
    setLocalIngredients(uniqueIngredients);
    setIngredients(uniqueIngredients); // 부모 컴포넌트로 전달
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setLocalIngredients(newIngredients);
    setIngredients(newIngredients);
  };

  return (
    <div>
      <h1>Fridge</h1>
      <input type="file" ref={fileInput} />
      <button onClick={handleSubmit}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Your image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}

      {ingredients.length > 0 && (
        <div>
          <h3>Detected Ingredients:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {ingredients.map((item, index) => (
              <span key={index} style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f0f0f0',
                padding: '5px 10px',
                borderRadius: '20px',
              }}>
                {item}
                <button 
                  onClick={() => handleRemoveIngredient(index)} 
                  style={{
                    marginLeft: '5px',
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={() => navigate('/recipes')}
        disabled={ingredients.length === 0}
        style={{
          marginTop: '20px',
          background: ingredients.length > 0 ? 'blue' : 'gray',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: ingredients.length > 0 ? 'pointer' : 'not-allowed',
        }}
      >
        Find Recipes
      </button>
    </div>
  );
}

export default HomePage;
