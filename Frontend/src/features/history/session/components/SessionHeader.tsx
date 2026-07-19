import { ArrowLeft, Calendar, Clock, Network, Code, MessageSquare } from 'lucide-react';
import { SessionData } from '../../session/types/session.types';

interface SessionIconProps {
  type: string;
  size?: number;
  className?: string;
}

const SessionIcon = ({ type, size = 12, className }: SessionIconProps) => {
  const t = type.toLowerCase();
  if (t.includes('system') || t.includes('design')) return <Network size={size} className={className} />;
  if (t.includes('coding') || t.includes('technical')) return <Code size={size} className={className} />;
  return <MessageSquare size={size} className={className} />;
};

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
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
        <div className='flex flex-col gap-3'>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mt-1">
            {sessionData.interview.title}
          </h1>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-2 max-w-2xl">
            {sessionData.interview.skills.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded bg-gray-900 border border-gray-800 text-[11px] text-gray-400 font-semibold tracking-wide uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Info Row */}
        <div className='flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t border-gray-800/50 md:border-t-0 pt-4 md:pt-0'>
          <div className='flex items-center gap-1.5 py-1 px-3 border border-gray-800 bg-[#111623]/80 rounded-full text-[11px] font-semibold uppercase tracking-wider text-gray-400 shrink-0'>
            <SessionIcon type={sessionData.type} size={12} className="text-gray-500" />
            <span>{sessionData.type}</span>
          </div>
          <div className="flex items-center gap-4 text-[14px] text-gray-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-gray-600" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-gray-600" />
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
