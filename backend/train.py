from ultralytics import YOLO

# 모델 로드 (YOLOv5의 기본 모델을 사용)
model = YOLO('yolov5n.pt')  # 사전 학습된 모델 사용

# 모델 학습
model.train(data='data.yaml', epochs=30, imgsz=640)  # data.yaml을 통해 학습 시작

# 학습 후 모델 저장
model.save('yolo11n.pt')  # 학습된 모델을 'yolo11n.pt'로 저장