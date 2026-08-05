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

    quests.quests.sort(
        # Unknown difficulty levels are assigned a high value so they appear last
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

    def generate_learning_path(self, goal: str, callback=None):

        # Notify that the Goal Interpreter has started
        if callback:
            callback("goal_interpreter_started")

        # Step 1: Interpret the user's goal
        goal_analysis = self.goal_interpreter.run(
            {
                "goal": goal
            }
        )

        # Notify that the Goal Interpreter has finished
        if callback:
            callback("goal_interpreter_finished")

        # Notify that the Learning Path Planner has started
        if callback:
            callback("learning_path_planner_started")

        # Step 2: Generate a personalized learning path based on the goal analysis
        learning_path = self.learning_path_planner.run(
            goal_analysis
        )

        # Notify that the Learning Path Planner has finished
        if callback:
            callback("learning_path_planner_finished")

        # Notify that the Quest Generator has started
        if callback:
            callback("quest_generator_started")

        # Step 3: Generate learning quests
        quests = self.quest_generator.run(
            learning_path
        )

        # Notify that the Quest Generator has finished
        if callback:
            callback("quest_generator_finished")

        # Sort quests from beginner to advanced before returning them
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