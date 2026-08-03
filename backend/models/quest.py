from pydantic import BaseModel


class Quest(BaseModel):
    title: str
    description: str
    difficulty: str
    estimated_hours: int


class QuestList(BaseModel):
    quests: list[Quest]