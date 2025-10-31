from re import X
import onnxruntime as ort
import numpy as np
import cv2
import matplotlib.pyplot as plt
import time
import os

# โหลดโมเดล
# session = ort.InferenceSession("Models_Padim\weights\onnx\model.onnx")
session = ort.InferenceSession("Models_PatchCore\weights\onnx\model.onnx")
# เตรียม loop
x = 0
data_dir = r"dataset\good"  # โฟลเดอร์ที่เก็บภาพทดสอบ

threshold = 0.5  # ปรับ threshold ตามต้องการ

for a in os.listdir(data_dir):
    print(f"Round {x}: {a}")
    time.sleep(0.5)

    img_path = os.path.join(data_dir, a)
    img = cv2.imread(img_path)
    if img is None:
        print(f"⚠️ Skip {a}, cannot read file.")
        continue

    # เตรียมภาพ
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img, (256, 256))
    img_input = img_resized.transpose(2, 0, 1)[None, ...].astype(np.float32) / 255.0

    # Run inference
    outputs = session.run(None, {"input": img_input})

    # --- ดึง anomaly map ---
    heatmap = outputs[2].squeeze()
    heatmap = (heatmap - heatmap.min()) / (heatmap.max() - heatmap.min() + 1e-8)
    heatmap_resized = cv2.resize(heatmap, (img.shape[1], img.shape[0]))

    # --- สร้าง binary mask ---
    mask = (heatmap_resized > threshold).astype(np.uint8) * 255

    # --- หา contour ---
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # --- วาด contour + bounding box ---
    img_contours = img.copy()
    for c in contours:
        # วาด contour สีแดง
        cv2.drawContours(img_contours, [c], -1, (255, 0, 0), 2)
        # วาด bounding box สีเขียว ถ้าพื้นที่ใหญ่กว่า 50 px
        rect = cv2.boundingRect(c)
        if rect[2]*rect[3] > 50:
            cv2.rectangle(img_contours, (rect[0], rect[1]), 
                          (rect[0]+rect[2], rect[1]+rect[3]), (0, 255, 0), 2)

    # --- สร้าง overlay heatmap ---
    heatmap_color = cv2.applyColorMap((heatmap_resized*255).astype(np.uint8), cv2.COLORMAP_JET)
    overlay = cv2.addWeighted(img.astype(np.float32)/255, 0.6, heatmap_color.astype(np.float32)/255, 0.4, 0)
    overlay = (overlay*255).astype(np.uint8)

    # --- แสดงผล ---
    plt.figure(figsize=(18,6))

    plt.subplot(1,3,1)
    plt.title("Original + Contours/BoundingBox")
    plt.imshow(img_contours)
    plt.axis('off')

    plt.subplot(1,3,2)
    plt.title("Overlay Heatmap")
    plt.imshow(overlay)
    plt.axis('off')

    plt.subplot(1,3,3)
    plt.title(f"Binary Mask (th={threshold})")
    plt.imshow(mask, cmap='gray')
    plt.axis('off')

    plt.tight_layout()
    plt.show()
    x += 1