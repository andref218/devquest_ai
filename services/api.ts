const API_URL = "http://localhost:8000";

export async function generateLearningPath(goal: string) {
  const response = await fetch(`${API_URL}/generate-learning-path`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goal,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate learning path.");
  }

  return await response.json();
}

export async function reviewSolution(quest: string, solution: string) {
  const response = await fetch(`${API_URL}/review-solution`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quest,
      solution,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to review solution.");
  }

  return await response.json();
}
