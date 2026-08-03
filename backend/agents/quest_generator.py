from agents.base_agent import BaseAgent

from models.learning_path import LearningPath
from models.quest import QuestList

from services.llm_service import LLMService
from services.prompt_service import PromptService

# Agent responsible for generating personalized learning quests
class QuestGenerator(BaseAgent):

    def __init__(
        self,
        llm_service: LLMService,
        prompt_service: PromptService,
    ):
        super().__init__(llm_service)
        self.prompt_service = prompt_service

    def run(self, input_data: LearningPath):

        prompt = self.prompt_service.load("quest_generator")

        full_prompt = f"""
{prompt}

Learning Path:
{input_data.model_dump_json(indent=2)}
"""

        response = self.llm_service.generate(
            "quest_generator",
            full_prompt
        )

        return QuestList.model_validate_json(response)