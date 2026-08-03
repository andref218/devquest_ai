from fastapi import FastAPI

from models.goal_request import GoalRequest
from services.llm_service import LLMService
from services.prompt_service import PromptService
from agents.goal_interpreter import GoalInterpreter

app = FastAPI(
    title="DevQuest AI API",
    version="0.1.0",
)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/generate-learning-path")
def generate_learning_path(request: GoalRequest):

    llm_service = LLMService()

    prompt_service = PromptService()

    goal_agent = GoalInterpreter(
        llm_service,
        prompt_service
    )

    response = goal_agent.run(
        {
            "goal": request.goal
        }
    )

    return response