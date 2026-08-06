"use client";

import { useEffect } from "react";

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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm 
      animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl 
        animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-white">{quest.title}</h2>

            <p className="mt-2 text-zinc-400">Quest details and objectives.</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/5"
          >
            ✕
          </button>
        </div>

        <div className="mt-8 flex gap-3">
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

        <div className="mt-8">
          <h3 className="mb-2 text-lg font-medium text-white">Description</h3>

          <p className="leading-relaxed text-zinc-400">{quest.description}</p>
        </div>
      </div>
    </div>
  );
}
