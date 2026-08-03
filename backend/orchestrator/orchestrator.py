from agents.goal_interpreter import GoalInterpreter
from services.llm_service import LLMService
from services.prompt_service import PromptService
from agents.learning_path_planner import LearningPathPlanner


class Orchestrator:

    def __init__(self):
        # Shared services
        self.llm_service = LLMService()
        self.prompt_service = PromptService()

        # Goal Interpreter Agent
        self.goal_interpreter = GoalInterpreter(
            self.llm_service,
            self.prompt_service,
        )

        # Learning Path Planner Agent
        self.learning_path_planner = LearningPathPlanner(
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

        # Step 2: Generate a personalized learning path based on the goal analysis
        learning_path = self.learning_path_planner.run(
            goal_analysis
    )

        return learning_path