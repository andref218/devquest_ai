from pydantic import BaseModel

class LearningPath(BaseModel):
    learning_path: list[str]