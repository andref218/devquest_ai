from pathlib import Path


class PromptService:

    def load(self, prompt_name: str) -> str:
        prompts_dir = Path(__file__).parent.parent / "prompts"

        prompt_path = prompts_dir / f"{prompt_name}.txt"

        if not prompt_path.exists():
            raise FileNotFoundError(f"Prompt '{prompt_name}' not found.")

        return prompt_path.read_text(encoding="utf-8")