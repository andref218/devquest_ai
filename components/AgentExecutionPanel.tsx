interface Props {
  currentAgent: number;
  completedAgents: number[];
  isClosing: boolean;
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
    running: "Creating practical quests...",
  },
];

export default function AgentExecutionPanel({
  currentAgent,
  completedAgents,
  isClosing,
}: Props) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl
    transition-all duration-700
    ${
      isClosing
        ? "opacity-0 -translate-y-2 scale-[0.98]"
        : "opacity-100 translate-y-0 scale-100"
    }`}
    >
      <p className="mb-6 text-sm text-zinc-500">AI Workflow</p>

      <div className="space-y-5">
        {/*Only render agents that have started executing.*/}
        {agents.slice(0, currentAgent + 1).map((agent, index) => {
          const completed = completedAgents.includes(index);
          const running = index === currentAgent;

          return (
            <div key={agent.name} className="animate-agent">
              <div className="flex items-center gap-3">
                {completed ? (
                  <div className="flex h-3 w-3 items-center justify-center text-sm text-emerald-400">
                    ✓
                  </div>
                ) : running ? (
                  <div className="h-3 w-3 animate-pulse rounded-full bg-blue-400" />
                ) : (
                  <div className="h-3 w-3 rounded-full bg-white/10" />
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
