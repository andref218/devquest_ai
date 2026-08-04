from pydantic import BaseModel

class Review(BaseModel):
    passed: bool
    score: int
    feedback: str
    strengths: list[str]
    improvements: list[str]