import { LearningTopic } from "@/types/learning";

interface Props {
  learningPath: LearningTopic[];
}

export default function LearningPath({ learningPath }: Props) {
  if (learningPath.length === 0) return null;

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="text-xl font-semibold text-white">Learning Roadmap</h2>

      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Follow this roadmap step by step to build a strong foundation before
        tackling the coding quests.
      </p>
      <div className="mt-4 border-t border-white/10" />

      <div className="mt-5 space-y-4">
        {learningPath.map((topic, index) => (
          <div key={`${topic.title}-${index}`} className="flex gap-4">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-blue-400/40 bg-blue-400/10 text-xs text-blue-300">
              {index + 1}
            </div>

            <div>
              <h3 className="font-semibold text-white">{topic.title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {topic.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
