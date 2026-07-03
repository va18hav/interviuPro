import { SessionData } from "../../session/types/session.types";

interface ScoreCardProps {
  sessionData: SessionData
}

export default function ScoreCard({
  sessionData
}: ScoreCardProps) {
  if (!sessionData.feedback) {
    return (
      <div>No Feedback found for this session</div>
    )
  }
  return (
    <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 flex flex-col items-center justify-center h-[240px] shadow-sm">
      {/* Label */}
      <span className="text-[18px] font-bold text-gray-500 uppercase tracking-widest mb-3">
        Overall Score
      </span>

      {/* Score Display */}
      <div className="flex items-baseline gap-0.5 mb-4">
        <span className="text-5xl font-black text-[#00E599] tracking-tight">
          {sessionData.feedback.overallScore}
        </span>
        <span className="text-lg font-bold text-gray-400">
          /100
        </span>
      </div>

      {/* Verdict Badge */}
      <div className="px-4 py-1.5 rounded bg-[#00E599]/10 border border-[#00E599]/20">
        <span className="text-[10px] font-extrabold tracking-widest text-[#00E599] uppercase">
          {sessionData.feedback.verdict}
        </span>
      </div>
    </div>
  );
}
