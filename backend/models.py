
import onnxruntime as ort
import numpy as np
import cv2
import os


# ---------- Load ONNX ----------
session = ort.InferenceSession(
    "Models_PatchCore/weights/onnx/model.onnx",
    providers=["CPUExecutionProvider"]
)

# ---------- Preprocess ----------
def preprocess(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_resized = cv2.resize(img, (256, 256))
    img_input = img_resized.transpose(2, 0, 1)[None, ...].astype(np.float32) / 255.0
    return img_input

# ---------- Infer ----------
def infer(img, threshold=0.5):
    x = preprocess(img)
    outputs = session.run(None, {"input": x})

    # anomalib PatchCore output
    heatmap = outputs[2].squeeze()

    # normalize
    heatmap = (heatmap - heatmap.min()) / (heatmap.max() - heatmap.min() + 1e-8)
    heatmap = cv2.resize(heatmap, (img.shape[1], img.shape[0]))

    score = float(heatmap.max())

    # binary mask
    mask = (heatmap > threshold).astype(np.uint8) * 255

    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    defects = []
    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        area = w * h
        if area > 50:
            defects.append({
                "x": int(x + w / 2),
                "y": int(y + h / 2),
                "w": int(w),
                "h": int(h),
                "area": int(area)
            })

    return score, defects
