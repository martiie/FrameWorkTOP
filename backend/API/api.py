from fastapi import FastAPI, HTTPException
from pathlib import Path
import pandas as pd

app = FastAPI()

BASE_PROJECT_DIR = Path(r"D:\0TOP\FrameWorkTOP\TrainAPI\projects")

@app.get("/train/{job_id}/metrics")
def get_training_metrics(job_id: str):
    csv_path = (
        BASE_PROJECT_DIR
        / job_id
        / "detect"
        / "runs"
        / "results.csv"
    )

    if not csv_path.exists():
        raise HTTPException(
            status_code=404,
            detail="results.csv not found"
        )

    df = pd.read_csv(csv_path)

    return {
        "job_id": job_id,
        "epochs": len(df),
        "metrics": df.to_dict(orient="records")
    }
