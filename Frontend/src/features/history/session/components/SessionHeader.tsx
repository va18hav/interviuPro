import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { SessionData } from '../../session/types/session.types';

interface SessionHeaderProps {
  onBackClick?: () => void;
  sessionData: SessionData
}

export default function SessionHeader({
  onBackClick,
  sessionData
}: SessionHeaderProps) {
  const formattedDate = new Date(sessionData.startedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC", // Keeps the date in UTC
  })
  return (
    <div className="w-full space-y-5">
      {/* Back to Interviews Link */}
      <button
        onClick={onBackClick}
        className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#00E599] hover:text-[#00C281] transition-colors cursor-pointer"
      >
        <ArrowLeft size={14} />
        <span className='text-[16px]'>Back to Dashboard</span>
      </button>
      {/* Main Title */}
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
            {sessionData.interview.title}
          </h1>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-2 max-w-2xl">
            {sessionData.interview.skills.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md text-[12px] font-semibold tracking-wide uppercase border border-gray-800 bg-[#111623] text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Info Row */}
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-center py-1 px-2 border border-gray-400 rounded-xl text-gray-500'>
            {sessionData.type}
          </div>
          <div className="flex items-center gap-6 text-[15px] text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-500" />
              <span>{sessionData.duration} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom thin divider */}
      <div className="w-full h-px bg-gray-800/80 mt-6" />
    </div>
  );
}
