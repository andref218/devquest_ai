from abc import ABC, abstractmethod

from services.llm_service import LLMService

# Abstract base class that all agents inherit from
class BaseAgent(ABC):

    # Constructor executed when an agent is created
    def __init__(self, llm_service: LLMService):
        self.llm_service = llm_service

    # Every agent must implement its own run() method
    @abstractmethod
    def run(self, input_data: dict):
        pass