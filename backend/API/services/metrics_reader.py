import pandas as pd
from pathlib import Path

def read_results_csv(project_dir: Path, job_id: str):
    csv_path = (
        project_dir
        / job_id
        / "results.csv"
    )

    if not csv_path.exists():
        return None

    df = pd.read_csv(csv_path)

    return df
