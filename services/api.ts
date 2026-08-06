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

export async function reviewSolution(quest: any, solution: string) {
  const response = await fetch(`${API_URL}/review-quest`, {
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

// Opens a Server-Sent Events (SSE) connection to receive real-time
// workflow updates and the final learning roadmap from the backend.
export function generateLearningPathStream(
  goal: string,
  onMessage: (data: any) => void,
) {
  const eventSource = new EventSource(
    `${API_URL}/generate-learning-path-stream?goal=${encodeURIComponent(goal)}`,
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);

    if (data.type === "result") {
      eventSource.close();
    }
  };

  eventSource.onerror = () => {
    eventSource.close();
  };

  return eventSource;
}
