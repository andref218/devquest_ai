from agents.base_agent import BaseAgent
from services.llm_service import LLMService
from services.prompt_service import PromptService

from models.goal_analysis import GoalAnalysis
from models.learning_path import LearningPath

# Agent responsible for generating a personalized learning path
class LearningPathPlanner(BaseAgent):

    def __init__(
        self,
        llm_service: LLMService,
        prompt_service: PromptService,
    ):
        super().__init__(llm_service)
        self.prompt_service = prompt_service

    def run(self, input_data: GoalAnalysis):

        prompt = self.prompt_service.load("learning_path_planner")

        full_prompt = f"""
{prompt}

Goal Analysis:
{input_data.model_dump_json(indent=2)}
"""

        return self.execute(
            "learning_path_planner",
            full_prompt,
            LearningPath,
)