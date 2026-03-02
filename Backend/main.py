from fastapi import FastAPI
from ai.pipeline import run_pipeline

app = FastAPI()


@app.get("/search")
def search(q: str):
    return run_pipeline(q)