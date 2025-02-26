from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image
from flask_cors import CORS
import io
import numpy as np

app = Flask(__name__)
CORS(app)

# 서버 실행 시 이미 학습된 모델만 로드합니다.
model = YOLO("yolo11n.pt")  # 모델을 이미 학습된 상태로 로드

@app.route('/upload', methods=['POST'])
def upload_image():
    file = request.files['file']
    img = Image.open(io.BytesIO(file.read()))

    # 모델 예측 수행
    results = model(img)

    # 첫 번째 결과에서 박스 정보 가져오기
    boxes = results[0].boxes
    names = model.names  # 클래스 ID → 실제 라벨 매핑

    detected_items = []
    for box in boxes:
        label = int(box.cls)  # 클래스 ID
        confidence = float(box.conf)  # 신뢰도
        detected_items.append(names[label])  # 클래스 이름을 리스트에 추가

    return jsonify({"ingredients": detected_items})  # 리스트로 반환

if __name__ == '__main__':
    app.run(debug=True)
