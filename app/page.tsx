"use client";

import { useEffect, useState } from "react";
import AgentExecutionPanel from "@/components/AgentExecutionPanel";
import { generateLearningPathStream } from "@/services/api";
import LearningPath from "@/components/LearningPath";
import QuestList from "@/components/QuestList";
import QuestDetails from "@/components/QuestDetails";

export default function Home() {
  const [goal, setGoal] = useState("");

  const [currentAgent, setCurrentAgent] = useState(-1);
  const [completedAgents, setCompletedAgents] = useState<number[]>([]);

  const [learningPath, setLearningPath] = useState<string[]>([]);
  const [quests, setQuests] = useState<any[]>([]);

  const [showWorkflow, setShowWorkflow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [error, setError] = useState("");

  const [selectedQuest, setSelectedQuest] = useState<any>(null);

  const handleGenerate = () => {
    setError("");
    const cleanedGoal = goal.replace(/[^\p{L}\p{N}\s]/gu, "").trim();

    if (cleanedGoal.length === 0) {
      setError("Please enter a valid learning goal.");
      return;
    }

    // Reset UI
    setError("");
    setShowWorkflow(true);
    setIsClosing(false);
    setLearningPath([]);
    setQuests([]);
    setCurrentAgent(-1);
    setCompletedAgents([]);

    generateLearningPathStream(goal, (data) => {
      if (data.type === "status") {
        switch (data.event) {
          case "goal_interpreter_started":
            setCurrentAgent(0);
            break;

          case "goal_interpreter_finished":
            setCompletedAgents((prev) => [...prev, 0]);
            break;

          case "learning_path_planner_started":
            setCurrentAgent(1);
            break;

          case "learning_path_planner_finished":
            setCompletedAgents((prev) => [...prev, 1]);
            break;

          case "quest_generator_started":
            setCurrentAgent(2);
            break;

          case "quest_generator_finished":
            setCompletedAgents((prev) => [...prev, 2]);
            break;
        }
      }

      if (data.type === "error") {
        setError(data.message);

        setIsClosing(true);

        setTimeout(() => {
          setCurrentAgent(-1);
          setCompletedAgents([]);
          setShowWorkflow(false);
        }, 700);
        return;
      }

      if (data.type === "result") {
        setLearningPath(data.data.learning_path.learning_path);
        setQuests(data.data.quests.quests);

        // Start fade out animation
        setIsClosing(true);

        // Hide workflow after the final result is displayed
        setTimeout(() => {
          setCurrentAgent(-1);
          setCompletedAgents([]);
          setShowWorkflow(false);
        }, 700);
      }
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb15,transparent_40%)]" />

      <div className="relative mx-auto flex max-w-3xl flex-col px-6 py-24">
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">DevQuest AI</h1>

          <p className="mt-3 text-zinc-400">
            AI-powered multi-agent learning platform.
          </p>
        </div>
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <textarea
            rows={3}
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              setError("");
            }}
            placeholder="What do you want to learn?"
            className="w-full resize-none bg-transparent text-lg outline-none placeholder:text-zinc-500"
          />

          <div className="mt-6 flex justify-end">
            <button
              //Temporary trigger for UI simulation
              onClick={handleGenerate}
              className="rounded-xl bg-white px-5 py-2.5 font-medium text-black transition hover:opacity-90 cursor-pointer"
            >
              Generate Roadmap
            </button>
          </div>
        </div>
        {showWorkflow && (
          <div className="mt-10">
            <AgentExecutionPanel
              currentAgent={currentAgent}
              completedAgents={completedAgents}
              isClosing={isClosing}
            />
          </div>
        )}
        <LearningPath learningPath={learningPath} />
        <QuestList quests={quests} onSelectQuest={setSelectedQuest} />
        {selectedQuest && (
          <QuestDetails
            quest={selectedQuest}
            onClose={() => setSelectedQuest(null)}
          />
        )}
      </div>
    </main>
  );
}
