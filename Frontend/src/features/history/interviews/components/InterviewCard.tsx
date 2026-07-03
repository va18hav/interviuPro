import { BriefcaseBusiness, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface InterviewData {
  id: string;
  title: string;
  role: string;
  tags: string[];
  avgScore: number | null;
  totalSessions: number;
}

interface InterviewCardProps {
  interview: InterviewData;
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => { navigate(`/interviews/${interview.id}`) }}
      className="group bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 hover:border-[#00E599]/30 transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Title and Company Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white group-hover:text-[#00E599] transition-colors">
              {interview.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-gray-400 bg-[#181d2c] border border-gray-800/80 rounded">
                {interview.role}
              </span>
              <span className="text-[10px] text-gray-500 font-semibold bg-[#111623] border border-gray-800/50 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${interview.totalSessions > 0 ? 'bg-[#00E599]' : 'bg-gray-600'}`}></span>
                {interview.totalSessions} {interview.totalSessions === 1 ? 'session' : 'sessions'}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-800 bg-[#181d2c]/50 text-gray-400 group-hover:text-[#00E599] group-hover:border-[#00E599]/20 transition-all">
            <BriefcaseBusiness size={18} />
          </div>
        </div>

        {/* Center Area: Tags / Skills */}
        <div className="flex-grow flex flex-col justify-start min-h-[64px] my-4">
          <div className="flex flex-wrap gap-1.5">
            {interview.tags && interview.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-[10px] font-semibold text-gray-400 bg-[#161a26] border border-gray-800 rounded-full hover:border-[#00E599]/20 hover:text-white transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="pt-4 border-t border-gray-800/80">
        {interview.totalSessions === 0 ? (
          <button
            type="button"
            onClick={() => navigate(`/interview/setup?interviewId=${interview.id}`)}
            className="w-full py-3 px-4 flex items-center justify-center gap-2 rounded-xl bg-[#00E599]/5 hover:bg-[#00E599]/10 border border-[#00E599]/20 hover:border-[#00E599]/40 text-[#00E599] font-bold text-xs uppercase tracking-wider transition-all duration-300 group/btn shadow-[0_0_15px_rgba(0,229,153,0.02)] hover:shadow-[0_0_20px_rgba(0,229,153,0.06)]"
          >
            <span>Start First Session</span>
            <Play size={12} className="fill-[#00E599] stroke-[#00E599] transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Avg Role Score</span>
                <div className="flex items-baseline gap-0.5 font-mono">
                  {interview.avgScore !== null ? (
                    <>
                      <span className="text-sm font-bold text-[#00E599]">{interview.avgScore}</span>
                      <span className="text-[10px] font-semibold text-gray-500">/ 100</span>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-gray-500">—</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/interview/setup?interviewId=${interview.id}`)}
                className="text-[#00E599] hover:text-[#00c985] font-bold transition-colors flex items-center gap-1"
              >
                <span>Practice</span>
                <Play size={10} className="fill-current" />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 bg-gray-800/80 rounded-full overflow-hidden w-full">
              <div
                className="bg-[#00E599] h-full rounded-full transition-all duration-500"
                style={{ width: `${interview.avgScore || 0}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



