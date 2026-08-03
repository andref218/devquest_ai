from agents.base_agent import BaseAgent
from services.llm_service import LLMService
from services.prompt_service import PromptService

# Agent responsible for understanding the user's learning goal
class GoalInterpreter(BaseAgent):

    def __init__(    
            self, 
            llm_service: LLMService, 
            prompt_service: PromptService
        ): 
        super().__init__(llm_service)
        self.prompt_service = prompt_service

    def run(self, input_data: dict):

        prompt = self.prompt_service.load("goal_interpreter")

        goal = input_data["goal"]
        
        full_prompt = f"""
{prompt}

User Goal:
{goal}
"""
        response = self.llm_service.generate(full_prompt)

        return response