import sqlite3
from pathlib import Path

DB_PATH = Path("train.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # ---- training jobs table ----
    cur.execute("""
    CREATE TABLE IF NOT EXISTS train_jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        model TEXT NOT NULL,
        dataset TEXT NOT NULL,
        epochs INTEGER NOT NULL,
        status TEXT NOT NULL,
        start_time DATETIME,
        end_time DATETIME
    );
    """)

    # ---- epoch logs table ----
    cur.execute("""
    CREATE TABLE IF NOT EXISTS epoch_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job_id INTEGER NOT NULL,
        epoch INTEGER NOT NULL,
        loss REAL,
        lr REAL,
        precision REAL,
        recall REAL,
        map50 REAL,
        map5095 REAL,
        epoch_time REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(job_id) REFERENCES train_jobs(id)
    );
    """)

    conn.commit()
    conn.close()

    print(f"✅ Database initialized: {DB_PATH.resolve()}")

if __name__ == "__main__":
    init_db()
