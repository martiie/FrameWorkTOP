from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect

from config import BASE_PROJECT_DIR
from services.metrics_reader import read_results_csv
import asyncio
router = APIRouter(prefix="/train", tags=["Training"])

@router.get("/{name}/metrics")
def get_training_metrics(name: str):
    df = read_results_csv(BASE_PROJECT_DIR, name)

    if df is None: 
        raise HTTPException(
            status_code=404,
            detail=f"results.csv not found in {BASE_PROJECT_DIR}/{name}"
        )

    return {
        "name": name,
        "epochs": len(df),
        "metrics": df.to_dict(orient="records")
    }

@router.websocket("/{name}/metrics")
async def websocket_metrics(websocket: WebSocket, name: str):
    await websocket.accept()
    try:
        while True:
            df = read_results_csv(BASE_PROJECT_DIR, name)
            if df is not None:
                metrics = df.to_dict(orient="records")
                await websocket.send_json({
                    "name": name,
                    "epochs": len(df),
                    "metrics": metrics
                })
            await asyncio.sleep(1)  # ส่งข้อมูลทุก 1 วินาที
    except WebSocketDisconnect:
        print(f"Client disconnected from {name} WebSocket")

@router.get("/{name}/latest")
def get_latest_epoch(name: str):
    df = read_results_csv(BASE_PROJECT_DIR, name)

    if df is None or df.empty:
        return {"status": "training_not_started"}

    last = df.iloc[-1].to_dict()

    return {
        "name": name,
        "epoch": int(last["epoch"]),
        "metrics": last
    }
