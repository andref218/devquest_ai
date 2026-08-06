export interface Review {
  passed: boolean;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">AI Review</h3>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            review.passed
              ? "bg-emerald-500/10 text-emerald-300"
              : "bg-rose-500/10 text-rose-300"
          }`}
        >
          {review.passed ? "Passed" : "Needs Improvement"}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm text-zinc-400">Score</p>

        <p className="mt-1 text-3xl font-bold">
          {review.score}
          <span className="text-lg text-zinc-500"> / 100</span>
        </p>
      </div>

      <div className="mt-8">
        <h4 className="font-medium text-white">Feedback</h4>

        <p className="mt-2 leading-relaxed text-zinc-400">{review.feedback}</p>
      </div>

      {review.strengths.length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-emerald-300">Strengths</h4>

          <ul className="mt-3 space-y-2">
            {review.strengths.map((strength, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-zinc-300"
              >
                <span className="mt-0.5 text-emerald-400">✓</span>

                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {review.improvements.filter(Boolean).length > 0 && (
        <div className="mt-8">
          <h4 className="font-medium text-amber-300">Suggested Improvements</h4>

          <ul className="mt-3 space-y-2">
            {review.improvements.filter(Boolean).map((improvement, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-zinc-300"
              >
                <span className="mt-0.5 text-amber-400">•</span>

                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
