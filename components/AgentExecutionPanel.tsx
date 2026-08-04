interface Props {
  currentAgent: number;
}

//Temporary agent definitions for UI visualization.
//These will eventually be driven by backend events.
const agents = [
  {
    name: "Goal Interpreter",
    running: "Analyzing your learning goal...",
  },
  {
    name: "Learning Path Planner",
    running: "Building your personalized roadmap...",
  },
  {
    name: "Quest Generator",
    running: "Creating practical coding quests...",
  },
];

export default function AgentExecutionPanel({ currentAgent }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <p className="mb-6 text-sm text-zinc-500">AI Workflow</p>

      <div className="space-y-5">
        {/*Only render agents that have started executing.*/}
        {agents.slice(0, currentAgent + 1).map((agent, index) => {
          const running = index === currentAgent;

          return (
            <div key={agent.name}>
              <div className="flex items-center gap-3">
                {running ? (
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400" />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center text-sm text-emerald-400">
                    ✓
                  </div>
                )}

                <span className="text-sm font-medium">{agent.name}</span>
              </div>

              {running && (
                <p className="ml-8 mt-2 text-sm text-zinc-400">
                  {agent.running}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
