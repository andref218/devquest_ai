interface Props {
  learningPath: string[];
}

export default function LearningPath({ learningPath }: Props) {
  if (learningPath.length === 0) return null;

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-lg font-semibold">Learning Roadmap</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Follow this roadmap step by step to build a strong foundation before
        tackling the coding quests.
      </p>

      <div className="mt-5 space-y-4">
        {learningPath.map((topic, index) => (
          <div key={topic} className="flex items-center gap-4">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-400/40 bg-blue-400/10 text-xs text-blue-300">
              {index + 1}
            </div>

            <p className="text-zinc-200">{topic}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
