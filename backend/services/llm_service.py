from ollama import chat


class LLMService:

    def generate(self, agent: str, prompt: str) -> str:

        print(f"=== {agent} ===")
        print(prompt)

        response = chat(
            model="llama3.2",
            messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        format="json",
)

        print("\n=== LLM Response ===")
        print(response["message"]["content"])

        return response["message"]["content"]