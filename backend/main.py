from unittest import result

from fastapi import FastAPI

from orchestrator.orchestrator import Orchestrator

from models.goal_request import GoalRequest
from models.review_request import ReviewRequest

from fastapi.middleware.cors import CORSMiddleware

from fastapi.responses import StreamingResponse
import json
import queue
import threading

app = FastAPI(
    title="DevQuest AI API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = Orchestrator()


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/generate-learning-path")
def generate_learning_path(request: GoalRequest):
    return orchestrator.generate_learning_path(request.goal)

@app.post("/review-solution")
def review_solution(request: ReviewRequest):
    return orchestrator.review_solution(
        request.quest,
        request.solution,
    )

@app.get("/generate-learning-path-stream")
def generate_learning_path_stream(goal: str):

    # Queue used to stream workflow events from the background thread.
    event_queue = queue.Queue()

    # Callback invoked by the Orchestrator whenever an agent changes state.
    def callback(event):
        event_queue.put({
            "type": "status",
            "event": event,
        })

    # Run the workflow in a separate thread so events can be streamed
    # to the client while the agents are executing.
    def run_workflow():
        try:
            result = orchestrator.generate_learning_path(
                goal,
                callback=callback,
            )

            if "error" in result:
                event_queue.put({
                    "type": "error",
                    "message": result["error"],
                })

                event_queue.put(None)
                return
            
             # Send the final learning roadmap and generated quests.
            event_queue.put({
                "type": "result",
                "data": {
                    "learning_path": result["learning_path"].model_dump(),
                    "quests": result["quests"].model_dump(),
                },
            })

        except Exception:
            event_queue.put({
                "type": "error",
                "message": "Something went wrong while generating your learning roadmap. Please try again.",
            })

        finally:
            event_queue.put(None)

    threading.Thread(target=run_workflow).start()

    # Yield events to the client as Server-Sent Events (SSE).
    def event_generator():

        while True:

            event = event_queue.get()

            if event is None:
                break

            yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
    )