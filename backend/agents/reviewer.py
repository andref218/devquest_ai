from models.review import Review

from agents.base_agent import BaseAgent

from services.llm_service import LLMService
from services.prompt_service import PromptService


# Agent responsible for reviewing the user's solution
class Reviewer(BaseAgent):

    def __init__(
        self,
        llm_service: LLMService,
        prompt_service: PromptService,
    ):
        super().__init__(llm_service)
        self.prompt_service = prompt_service

    def run(self, input_data: dict):

        prompt = self.prompt_service.load("reviewer")

        full_prompt = f"""
{prompt}

Programming Quest:
{input_data["quest"]}

User Solution:
{input_data["solution"]}
"""

        return self.execute(
            "reviewer",
            full_prompt,
            Review,
        )