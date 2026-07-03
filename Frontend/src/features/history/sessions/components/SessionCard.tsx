import { Calendar, Clock, ChevronRight, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface SessionData {
  id: string;
  title: string
  date: string
  duration: number
  type: string
  score: number
  verdict: string
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
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#00E599]';
    if (score >= 70) return 'text-emerald-400';
    return 'text-orange-400';
  };

  return (
    <div
      onClick={() => {
        if (session.score) navigate(`/sessions/${session.id}`)
      }}
      className="group flex items-center justify-between p-5 bg-[#111623]/40 border border-gray-800/80 rounded-xl hover:border-[#00E599]/30 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Left Icon Block */}
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[#181d2c] border border-gray-800 group-hover:border-gray-700 transition-colors">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
        </div>

        {/* Title and Sub-details */}
        <div className="space-y-1">
          <h4 className="text-base font-semibold text-white group-hover:text-[#00E599] transition-colors">
            {session.title}
          </h4>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {formattedDate}
            </span>
            <span className="text-gray-700">•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {session.duration}
            </span>
            <span className="text-gray-700">•</span>
            <span>{session.type}</span>
          </div>
        </div>
      </div>

      {/* Right Score, Verdict and Arrow */}

      {!session.score && <div className="flex items-center gap-6">
        <span
          className='px-3 py-1 text-[10px] font-bold tracking-wider rounded border uppercase text-center w-full block'>
          Generate Feedback
        </span>
      </div>}

      {session.verdict && <div className="flex items-center gap-6">
        {/* Score Block */}
        <div className="text-center min-w-[70px]">
          <div className={`text-lg font-bold font-mono ${getScoreColor(session.score)}`}>
            {session.score}/100
          </div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">
            Score
          </div>
        </div>

        {/* Verdict Badge */}
        <div className="min-w-[125px] flex justify-center">
          <span className={`px-3 py-1 text-[10px] font-bold tracking-wider rounded border uppercase text-center w-full block ${getVerdictStyles(session.verdict)}`}>
            {session.verdict}
          </span>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
      </div>}
    </div>
  );
}
