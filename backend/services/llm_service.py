class LLMService:

    def generate(self, prompt: str) -> dict:

        # Temporary mock implementation.
        # This simulates different LLM responses during development.
        # Later, this will be replaced with a real LLM (e.g. Ollama).

        print("=== Prompt sent to the LLM ===")
        print(prompt)

        if "Goal Analysis:" in prompt:
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

        return {
            "goal": "AI Engineer",
            "level": "Beginner",
            "reason": "The user wants to become an AI Engineer."
        }