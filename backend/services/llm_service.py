class LLMService:

    def generate(self, prompt: str) -> str:
        print("=== Prompt sent to the LLM ===")
        print(prompt)

        return """
{
    "goal": "AI Engineer",
    "level": "Beginner",
    "reason": "The user wants to become an AI Engineer."
}
"""