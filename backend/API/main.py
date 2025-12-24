from fastapi import FastAPI, WebSocket
from routers import train
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="YOLO Training Monitor API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # หรือเฉพาะหน้าเว็บของคุณ
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(train.router)

@app.get("/")
def health():
    return {"status": "ok"}

@app.get("/names")
def list_jobs():
    conn = sqlite3.connect(r"D:\0TOP\FrameWorkTOP\TrainAPI\train.db")
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    rows = cur.execute("""
        SELECT name, status
        FROM train_jobs
        ORDER BY start_time DESC
    """).fetchall()
    conn.close()

    return [dict(r) for r in rows]
