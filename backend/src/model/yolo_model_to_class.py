import cv2
import matplotlib.pyplot as plt   # ตรงนี้ต้องเป็น pyplot ไม่ใช่ matplotlib เฉย ๆ
from ultralytics import YOLO      # import YOLO ให้ถูก


if __name__=="__main__":
    test_base_path = "D:/intern/dataset/fold/test"
    model_base_path = "D:/intern/core/models/yolo/"
    iou_threshold = 0.5


    image = cv2.imread("D:/intern/dataset/fold/test/images/img_26.jpg")

    plt.figure(figsize=(8, 5))
    plt.imshow(image)
    plt.axis('off')
    plt.show()

    onnx_model = YOLO("D:/intern/core/models/yolo/yolov8n_fold_3_2class.onnx")
    # onnx_model = YOLO("D:/intern/core/models/yolo/yolov8n_fold_3_2class.pt")


    results = onnx_model(image)
    
    image_detected = image.copy()
    detected_data = []
    for result in results:
        boxes = result.boxes.xyxy.cpu().numpy()
        confs = result.boxes.conf.cpu().numpy()
        clses = result.boxes.cls.cpu().numpy().astype(int)
        names = onnx_model.names

        for box, conf, cls in zip(boxes, confs, clses):
            x1, y1, x2, y2 = map(int, box)
            label = f"{names[cls]} {conf:.2f}"
            cv2.rectangle(image_detected, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(image_detected, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)
            detected_data.append({
                "Class": names[cls],
                "Confidence": round(float(conf), 3),
                "X1": int(x1), "Y1": int(y1), "X2": int(x2), "Y2": int(y2)
            })

    print(detected_data)