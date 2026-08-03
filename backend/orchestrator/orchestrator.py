from agents.goal_interpreter import GoalInterpreter
from services.llm_service import LLMService
from services.prompt_service import PromptService


class Orchestrator:

    def __init__(self):
        # Shared services
        self.llm_service = LLMService()
        self.prompt_service = PromptService()

        # Agents
        self.goal_interpreter = GoalInterpreter(
            self.llm_service,
            self.prompt_service,
        )

    def generate_learning_path(self, goal: str):

        # Step 1: Interpret the user's goal
        goal_analysis = self.goal_interpreter.run(
            {
                "goal": goal
            }
        )

        return goal_analysis