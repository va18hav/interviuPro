import { Calendar, Clock, ChevronRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface SessionData {
  id: string;
  title: string
  date: string
  duration: number
  type: string
  score: number | null
  verdict: string | null
  icon: LucideIcon;
}

interface SessionCardProps {
  session: SessionData;
}

export default function SessionCard({ session }: SessionCardProps) {
  const Icon = session.icon;
  const navigate = useNavigate()

  const formattedDate = new Date(session.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC", // Keeps the date in UTC
  })

  // Verdict style mapping
  const getVerdictStyles = (verdict: SessionData['verdict']) => {
    switch (verdict) {
      case 'STRONG HIRE':
        return 'text-[#00E599] border-[#00E599]/20 bg-[#00E599]/5';
      case 'HIRE':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'LEANING NO HIRE':
        return 'text-orange-400 border-orange-500/20 bg-orange-500/5';
      default:
        return 'text-gray-400 border-gray-800 bg-gray-900/10';
    }
  };

  // Score style mapping
  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-400';
    if (score >= 90) return 'text-[#00E599]';
    if (score >= 70) return 'text-emerald-400';
    return 'text-orange-400';
  };

  return (
    <div
      onClick={() => {
        if (session.score) navigate(`/sessions/${session.id}`)
      }}
      className="group flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 gap-3 bg-[#111623]/40 border border-gray-800/80 rounded-xl hover:border-[#00E599]/30 transition-all duration-300 cursor-pointer">
      <div className="flex items-start md:items-center gap-4">
        {/* Left Icon Block */}
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#181d2c] border border-gray-800 group-hover:border-gray-700 transition-colors shrink-0">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </div>

        {/* Title and Sub-details */}
        <div className="space-y-1 min-w-0">
          <h4 className="text-base font-semibold text-white group-hover:text-[#00E599] transition-colors truncate">
            {session.title}
          </h4>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span className="text-gray-750">•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {session.duration} min
            </span>
            <span className="text-gray-750">•</span>
            <span className="px-2 py-0.5 rounded bg-gray-900/60 border border-gray-800/80 text-[10px] text-gray-400 font-semibold uppercase">{session.type}</span>
          </div>
        </div>
      </div>

      {/* Right Score, Verdict and Arrow */}

      {!session.score && (
        <div className="flex items-center justify-end w-full md:w-auto border-t border-gray-800/40 md:border-none pt-3 md:pt-0 pl-16 md:pl-0">
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider rounded border border-gray-850 bg-gray-900/10 text-gray-400 uppercase text-center w-full md:w-auto block">
            Generate Feedback
          </span>
        </div>
      )}

      {session.verdict && (
        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-6 w-full md:w-auto border-t border-gray-800/40 md:border-none pt-3 md:pt-0 pl-16 md:pl-0">
          {/* Score Block */}
          <div className="text-left md:text-center min-w-[70px]">
            <div className={`text-base md:text-lg font-bold font-mono ${getScoreColor(session.score)}`}>
              {session.score}/100
            </div>
            <div className="text-[9px] md:text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
              Score
            </div>
          </div>

          {/* Verdict Badge */}
          <div className="min-w-[110px] md:min-w-[125px] flex justify-center">
            <span className={`px-2.5 md:px-3 py-1 text-[9px] md:text-[10px] font-bold tracking-wider rounded border uppercase text-center w-full block ${getVerdictStyles(session.verdict)}`}>
              {session.verdict}
            </span>
          </div>

          {/* Chevron */}
          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors hidden md:block" />
        </div>
      )}
    </div>
  );
}
