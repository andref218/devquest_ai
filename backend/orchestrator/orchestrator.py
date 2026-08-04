from agents.goal_interpreter import GoalInterpreter
from agents.learning_path_planner import LearningPathPlanner
from agents.quest_generator import QuestGenerator
from agents.reviewer import Reviewer

from services.llm_service import LLMService
from services.prompt_service import PromptService

# Sort generated quests by difficulty to provide a logical learning progression
def sort_quests_by_difficulty(quests):

    difficulty_order = {
        "Beginner": 0,
        "Intermediate": 1,
        "Advanced": 2,
    }

    # Unknown difficulty levels are assigned a high value so they appear last
    quests.quests.sort(
        key=lambda quest: difficulty_order.get(quest.difficulty, 999)
    )

    return quests

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
        # Quest Generator Agent
        self.quest_generator = QuestGenerator(
            self.llm_service,
            self.prompt_service,
        )

        # Reviewer Agent   
        self.reviewer = Reviewer(
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

        # Step 3: Generate learning quests
        quests = self.quest_generator.run(
            learning_path
        )

        # Step 4: Sort quests by difficulty
        quests = sort_quests_by_difficulty(quests)

        return {
            "learning_path": learning_path,
            "quests": quests,
}

    def review_solution(self, quest: dict, solution: str):

        # Review the user's solution for a specific quest
        review = self.reviewer.run(
            {
                "quest": quest,
                "solution": solution,
            }
        )

        return review