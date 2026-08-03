from fastapi import FastAPI

from models.goal_request import GoalRequest
from orchestrator.orchestrator import Orchestrator

app = FastAPI(
    title="DevQuest AI API",
    version="0.1.0",
)


orchestrator = Orchestrator()


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/generate-learning-path")
def generate_learning_path(request: GoalRequest):
    return orchestrator.generate_learning_path(request.goal)