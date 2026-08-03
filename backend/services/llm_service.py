class LLMService:

    # Generates a response from the selected LLM.
    # Currently returns mock data for development and testing.
    def generate(self, agent: str, prompt: str) -> dict:

        # Temporary mock implementation.
        # This simulates different LLM responses during development.
        # Later, this will be replaced with a real LLM integration (e.g. Ollama).

        print(f"=== {agent} ===")
        print(prompt)

        if agent == "goal_interpreter":
            return {
                "goal": "AI Engineer",
                "level": "Beginner",
                "reason": "The user wants to become an AI Engineer."
            }

        if agent == "learning_path_planner":
            return {
                "learning_path": [
                    "Python Fundamentals",
                    "Object-Oriented Programming",
                    "Data Structures",
                    "Machine Learning Basics",
                    "Deep Learning",
                    "LLMs",
                    "RAG",
                    "AI Agents"
                ]
            }

        if agent == "quest_generator":
            return {
                "quests": [
                    {
                        "title": "Python Variables",
                        "description": "Create a calculator using variables.",
                        "difficulty": "Easy",
                        "estimated_hours": 2
                    },
                    {
                        "title": "Functions",
                        "description": "Build a calculator using functions.",
                        "difficulty": "Easy",
                        "estimated_hours": 3
                    }
                ]
            }

        raise ValueError(f"Unknown agent: {agent}")