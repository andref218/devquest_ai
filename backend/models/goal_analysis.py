from pydantic import BaseModel

class GoalAnalysis(BaseModel):
    goal: str
    level: str
    reason: str