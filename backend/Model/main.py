
from utils.Train_worker import run_train

if __name__ == "__main__":
    cfg = {
        "project": "projects",   # ⭐ โฟลเดอร์หลัก
        "name": "SLED_PZT-2",   # ⭐ experiment
        "model": "models/yolo11s.pt",
        "data": "Datas/SLED_PZT-2/data.yaml",
        "epochs": 20,
        "batch": 8,
        "imgsz": 640,
        "device": "0"   # หรือ "0" ถ้ามี GPU
    }

    run_train(cfg)

