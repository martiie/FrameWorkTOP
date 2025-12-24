from ultralytics import YOLO
from utils.DbHelper import create_train_job
# from db_trainer import SQLiteTrainer

def run_train(cfg):
    job_id = create_train_job(
        name=cfg["name"],
        model=cfg["model"],
        dataset=cfg["data"],
        epochs=cfg["epochs"]
    )

    model = YOLO(cfg["model"])

    model.train(
        data=cfg["data"],
        epochs=cfg["epochs"],
        batch=cfg["batch"],
        imgsz=cfg["imgsz"],
        project=cfg["project"],   # ⭐ ต้องมี
        name=cfg["name"],         # ⭐ ต้องมี
        exist_ok=True
    )

    return job_id
