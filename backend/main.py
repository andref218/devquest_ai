from fastapi import FastAPI

from orchestrator.orchestrator import Orchestrator

from models.goal_request import GoalRequest
from models.review_request import ReviewRequest

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

@app.post("/review-solution")
def review_solution(request: ReviewRequest):
    return orchestrator.review_solution(
        request.quest,
        request.solution,
    )