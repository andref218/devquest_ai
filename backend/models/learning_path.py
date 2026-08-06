from pydantic import BaseModel

class LearningTopic(BaseModel):
    title: str
    description: str


class LearningPath(BaseModel):
    learning_path: list[LearningTopic]