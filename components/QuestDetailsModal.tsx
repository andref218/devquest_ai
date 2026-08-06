"use client";

import { reviewSolution } from "@/services/api";
import { useEffect, useState } from "react";

interface Quest {
  title: string;
  description: string;
  difficulty: string;
  estimated_hours: number;
}

interface Props {
  quest: Quest;
  onClose: () => void;
}

export default function QuestDetails({ quest, onClose }: Props) {
  const [solution, setSolution] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = async () => {
    try {
      const review = await reviewSolution(quest, solution);

      console.log(review);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">{quest.title}</h2>

            <p className="mt-2 text-zinc-400">Quest details and objectives.</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/5 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm ${
              quest.difficulty === "Beginner"
                ? "bg-emerald-500/10 text-emerald-300"
                : quest.difficulty === "Intermediate"
                  ? "bg-amber-500/10 text-amber-300"
                  : "bg-rose-500/10 text-rose-300"
            }`}
          >
            {quest.difficulty}
          </span>

          <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-zinc-400">
            ~{quest.estimated_hours} hours
          </span>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-medium text-white">Description</h3>

          <p className="leading-relaxed text-zinc-400">{quest.description}</p>
        </div>
        <div className="mt-8">
          <h3 className="mb-2 text-sm font-medium text-zinc-300">
            Your Solution
          </h3>

          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Describe your approach or paste your code..."
            rows={8}
            className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900 p-4 text-sm outline-none transition focus:border-blue-500/40"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <button
            disabled={!solution.trim()}
            onClick={handleSubmit}
            className="rounded-xl bg-white px-5 py-2.5 font-medium text-black transition hover:opacity-80 
            disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            Submit Solution
          </button>
        </div>
      </div>
    </div>
  );
}
