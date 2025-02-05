from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image
from flask_cors import CORS


import io
import numpy as np

app = Flask(__name__)
CORS(app)  

model = YOLO("yolo11n.pt") 

@app.route('/upload', methods=['POST'])
def upload_image():
 
    file = request.files['file']
    img = Image.open(io.BytesIO(file.read()))
    
    
    results = model(img)  
    predictions = results[0].boxes  

    labels = predictions.cls.numpy().astype(int) 
    confidences = predictions.conf.numpy()  

    detected_items = []
    for label, confidence in zip(labels, confidences):
        item = {
            "label": int(label), 
            "confidence": float(confidence) 
        }
        detected_items.append(item)

    return jsonify(detected_items)

if __name__ == '__main__':
    app.run(debug=True)
