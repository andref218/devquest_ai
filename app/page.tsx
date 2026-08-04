"use client";

import { useEffect, useState } from "react";
import AgentExecutionPanel from "@/components/AgentExecutionPanel";

export default function Home() {
  const [currentAgent, setCurrentAgent] = useState(-1);

  //Temporary simulation of sequential agent execution.
  //This will be replaced with real backend events in a future iteration.
  useEffect(() => {
    if (currentAgent === -1) return;

    if (currentAgent < 2) {
      const timer = setTimeout(() => {
        setCurrentAgent((prev) => prev + 1);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [currentAgent]);

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

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <textarea
            rows={3}
            placeholder="What do you want to learn?"
            className="w-full resize-none bg-transparent text-lg outline-none placeholder:text-zinc-500"
          />

          <div className="mt-6 flex justify-end">
            <button
              //Temporary trigger for UI simulation
              onClick={() => setCurrentAgent(0)}
              className="rounded-xl bg-white px-5 py-2.5 font-medium text-black transition hover:opacity-90 cursor-pointer"
            >
              Generate Roadmap
            </button>
          </div>
        </div>

        {currentAgent >= 0 && (
          <div className="mt-10">
            <AgentExecutionPanel currentAgent={currentAgent} />
          </div>
        )}
      </div>
    </main>
  );
}
