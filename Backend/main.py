from fastapi import FastAPI
from pydantic import BaseModel
from ai.pipeline import run_pipeline
from ai.services.chat_service import chat_with_context
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/search")
def search(q: str):
    return run_pipeline(q)


class ChatRequest(BaseModel):
    question: str
    context: str


@app.post("/chat")
def chat(req: ChatRequest):
    answer = chat_with_context(req.question, req.context)
    return {"answer": answer}