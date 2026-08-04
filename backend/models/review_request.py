from pydantic import BaseModel

from models.quest import Quest


class ReviewRequest(BaseModel):
    quest: Quest
    solution: str