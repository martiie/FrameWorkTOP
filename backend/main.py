import os
import cv2
import numpy as np
import onnxruntime as ort
import base64

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List


# ===============================
# Load ONNX model
# ===============================
MODEL_PATH = "Models_Padim\weights\onnx\model.onnx"

session = ort.InferenceSession(
    MODEL_PATH,
    providers=["CPUExecutionProvider"]
)

INPUT_NAME = session.get_inputs()[0].name  # "image"


# ===============================
# FastAPI
# ===============================
app = FastAPI(title="Padim Anomaly Inference")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===============================
# Utils
# ===============================
def preprocess(img: np.ndarray) -> np.ndarray:
    img = cv2.resize(img, (256, 256))
    img = img.astype(np.float32) / 255.0
    img = img.transpose(2, 0, 1)[None, ...]  # (1,3,256,256)
    return img


def encode_image(img: np.ndarray) -> str:
    _, buffer = cv2.imencode(".png", img)
    return base64.b64encode(buffer).decode("utf-8")


# ===============================
# API
# ===============================
@app.post("/infer")
async def infer_image(
    file: UploadFile = File(...),
    threshold: float = 0.5,
):
    # --- Read image ---
    contents = await file.read()
    np_img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "Cannot read image"}

    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w = img_rgb.shape[:2]

    # --- Preprocess ---
    input_tensor = preprocess(img_rgb)

    # --- ONNX inference ---
    anomaly_map = session.run(
        None, {INPUT_NAME: input_tensor}
    )[0][0]  # (256,256)

    # --- Normalize ---
    anomaly_map = (anomaly_map - anomaly_map.min()) / (
        anomaly_map.max() - anomaly_map.min() + 1e-8
    )

    # --- Resize back ---
    anomaly_map_resized = cv2.resize(anomaly_map, (w, h))

    # --- Binary mask ---
    mask = (anomaly_map_resized > threshold).astype(np.uint8) * 255

    # --- Find contours ---
    contours, _ = cv2.findContours(
        mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
    )

    defects = []
    for c in contours:
        x, y, bw, bh = cv2.boundingRect(c)
        area = bw * bh
        if area < 50:
            continue

        defects.append({
            "x": int(x + bw / 2),
            "y": int(y + bh / 2),
            "w": int(bw),
            "h": int(bh),
            "area": int(area),
            "score": float(anomaly_map_resized[y:y+bh, x:x+bw].max()),
        })

    # --- Overlay heatmap ---
    heatmap_color = cv2.applyColorMap(
        (anomaly_map_resized * 255).astype(np.uint8),
        cv2.COLORMAP_JET,
    )
    overlay = cv2.addWeighted(
        img_rgb.astype(np.float32) / 255.0,
        0.6,
        heatmap_color.astype(np.float32) / 255.0,
        0.4,
        0,
    )
    overlay = (overlay * 255).astype(np.uint8)

    return {
        "filename": file.filename,
        "threshold": threshold,
        "num_defects": len(defects),
        "defects": defects,
        "heatmap_base64": encode_image(overlay),
    }
