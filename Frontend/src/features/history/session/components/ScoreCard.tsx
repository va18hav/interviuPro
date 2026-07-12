import { SessionData } from "../../session/types/session.types";

interface ScoreCardProps {
  sessionData: SessionData
}

export default function ScoreCard({
  sessionData
}: ScoreCardProps) {
  if (!sessionData.feedback) {
    return (
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-6 text-center text-gray-400">
        No Feedback found for this session
      </div>
    )
  }

  const { overallScore, verdict, technicalScore, communicationScore, problemSolvingScore } = sessionData.feedback;

  const getVerdictStyle = (v: string) => {
    switch (v?.toLowerCase()) {
      case 'strong':
        return 'bg-[#00E599]/15 border-[#00E599]/30 text-[#00E599]';
      case 'good':
        return 'bg-blue-500/15 border-blue-500/30 text-blue-400';
      case 'needs work':
        return 'bg-amber-500/15 border-amber-500/30 text-amber-400';
      case 'weak':
        return 'bg-rose-500/15 border-rose-500/30 text-rose-400';
      default:
        return 'bg-gray-500/15 border-gray-500/30 text-gray-400';
    }
  };

  const hasSubScores = technicalScore !== undefined || communicationScore !== undefined || problemSolvingScore !== undefined;

  return (
    <div className="bg-[#111623] border border-gray-800/80 rounded-xl p-6 flex flex-col justify-between h-[280px] shadow-lg relative overflow-hidden group hover:border-gray-700/60 transition-all duration-300">
      {/* Glow background effect */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#00E599]/5 rounded-full blur-2xl group-hover:bg-[#00E599]/8 transition-all duration-300" />
      
      <div className="flex flex-col items-center text-center">
        <span className="text-[12px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">
          Overall Performance
        </span>
        
        {/* Score and Verdict row */}
        <div className="flex items-center gap-4 my-1.5">
          <div className="flex items-baseline gap-0.5">
            <span className="text-5xl font-black text-white tracking-tight">
              {overallScore}
            </span>
            <span className="text-sm font-bold text-gray-500">
              /100
            </span>
          </div>
          <div className={`px-2.5 py-1 rounded text-[10px] font-extrabold tracking-widest uppercase border ${getVerdictStyle(verdict)}`}>
            {verdict}
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="border-t border-gray-800/80 pt-4 mt-2 space-y-3 flex-1 flex flex-col justify-end">
        {hasSubScores ? (
          <>
            {/* Technical */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400">
                <span>Technical Understanding</span>
                <span className="text-white font-bold">{technicalScore ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-955 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#00E599]"
                  style={{ width: `${technicalScore ?? 0}%` }}
                />
              </div>
            </div>

            {/* Problem Solving */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400">
                <span>Problem Solving</span>
                <span className="text-white font-bold">{problemSolvingScore ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-955 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-[#00bcff]"
                  style={{ width: `${problemSolvingScore ?? 0}%` }}
                />
              </div>
            </div>

            {/* Communication */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[11px] font-semibold text-gray-400">
                <span>Communication</span>
                <span className="text-white font-bold">{communicationScore ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-955 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-500"
                  style={{ width: `${communicationScore ?? 0}%` }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center text-[11px] text-gray-500 italic py-2">
            Detailed skill sub-scores not available for older sessions.
          </div>
        )}
      </div>
    </div>
  );
}

