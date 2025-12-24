import sqlite3
from contextlib import contextmanager
from pathlib import Path

DB_PATH = Path("train.db")


@contextmanager
def get_conn():
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()

def create_train_job(name, model, dataset, epochs):
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO train_jobs
            (name, model, dataset, epochs, status, start_time)
            VALUES (?, ?, ?, ?, ?, datetime('now'))
        """, (name, model, dataset, epochs, "running"))
        return cur.lastrowid

def update_job_status(job_id, status):
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("""
            UPDATE train_jobs
            SET status=?, end_time=datetime('now')
            WHERE id=?
        """, (status, job_id))

def update_job_status(job_id, status):
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("""
            UPDATE train_jobs
            SET status=?, end_time=datetime('now')
            WHERE id=?
        """, (status, job_id))

def insert_epoch_log(
    job_id,
    epoch,
    loss,
    lr,
    precision=None,
    recall=None,
    map50=None,
    map5095=None,
    epoch_time=None
):
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO epoch_logs
            (job_id, epoch, loss, lr, precision, recall, map50, map5095, epoch_time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            job_id,
            epoch,
            loss,
            lr,
            precision,
            recall,
            map50,
            map5095,
            epoch_time
        ))

def get_epoch_logs(job_id):
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("""
            SELECT
                epoch, loss, lr,
                precision, recall,
                map50, map5095,
                epoch_time, created_at
            FROM epoch_logs
            WHERE job_id=?
            ORDER BY epoch
        """, (job_id,))
        return cur.fetchall()

def list_jobs():
    with get_conn() as conn:
        cur = conn.cursor()
        cur.execute("""
            SELECT
                id, name, model, dataset,
                epochs, status, start_time, end_time
            FROM train_jobs
            ORDER BY id DESC
        """)
        return cur.fetchall()
