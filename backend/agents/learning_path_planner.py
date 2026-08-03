from agents.base_agent import BaseAgent
from services.llm_service import LLMService
from services.prompt_service import PromptService

# Agent responsible for generating a personalized learning path
class LearningPathPlanner(BaseAgent):

    def __init__(
        self,
        llm_service: LLMService,
        prompt_service: PromptService,
    ):
        super().__init__(llm_service)
        self.prompt_service = prompt_service

    def run(self, input_data: dict):

        prompt = self.prompt_service.load("learning_path_planner")

        full_prompt = f"""
{prompt}

Goal Analysis:
{input_data}
"""

        response = self.llm_service.generate(
            "learning_path_planner",
            full_prompt
        )

        return response