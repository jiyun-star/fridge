import React, { useState, useRef } from 'react';

function App() {
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); 
  const fileInput = useRef();

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
    setResult(data);
  };

  return (
    <div className="App">
      <h1>이미지 업로드 & 분석</h1>
      <input type="file" ref={fileInput} />
      <button onClick={handleSubmit}>업로드</button>
      
      {imageUrl && (
        <div>
          <h3>업로드한 이미지:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}

      {result && (
        <div>
          <h3>분석 결과:</h3>
          <p>당근: {result.carrot ? '있음' : '없음'}</p>
          <p>양파: {result.onion ? '있음' : '없음'}</p>
          <p>닭고기: {result.chicken ? '있음' : '없음'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
