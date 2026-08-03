from abc import ABC, abstractmethod

from pydantic import BaseModel

from services.llm_service import LLMService


# Abstract base class that all agents inherit from
class BaseAgent(ABC):

    # Constructor executed when an agent is created
    def __init__(self, llm_service: LLMService):
        self.llm_service = llm_service

    def execute(
        self,
        agent_name: str,
        prompt: str,
        response_model: type[BaseModel],
    ):

        response = self.llm_service.generate(
            agent_name,
            prompt,
        )

        return response_model.model_validate_json(response)

    @abstractmethod
    def run(self, input_data):
        pass