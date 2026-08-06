interface Quest {
  title: string;
  description: string;
  difficulty: string;
  estimated_hours: number;
}

interface Props {
  quests: Quest[];
  onSelectQuest: (quest: Quest) => void;
}

export default function QuestList({ quests, onSelectQuest }: Props) {
  if (quests.length === 0) return null;

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold">Coding Quests</h2>

      <div className="mt-5 space-y-6">
        {quests.map((quest, index) => (
          <div
            key={`${quest.title}-${index}`}
            onClick={() => onSelectQuest(quest)}
            className="flex cursor-pointer gap-4 rounded-xl p-3 transition-all duration-200 hover:bg-white/5 hover:scale-[1.01]"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-400/40 bg-blue-400/10 text-xs text-blue-300">
              {index + 1}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-zinc-100">{quest.title}</h3>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs ${
                    quest.difficulty === "Beginner"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : quest.difficulty === "Intermediate"
                        ? "bg-amber-500/10 text-amber-300"
                        : "bg-rose-500/10 text-rose-300"
                  }`}
                >
                  {quest.difficulty}
                </span>

                <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-400">
                  ~{quest.estimated_hours}h
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {quest.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
