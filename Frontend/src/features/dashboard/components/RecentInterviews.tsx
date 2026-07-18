import { Mic, Code, Network, MessageSquare, Calendar, Clock, LucideIcon } from 'lucide-react';
import type { SessionSummary } from '../types/dashboard.types';
import { useNavigate } from 'react-router-dom';

interface RecentInterviewsProps {
  sessions: SessionSummary[];
}

// Maps verdict strings from the backend to display colours.
// Keeps the colour logic in one place — easy to extend later.
function verdictColour(verdict: string | undefined): string {
  switch (verdict) {
    case 'Strong Hire': return 'text-[#00E599]';
    case 'Hire': return 'text-emerald-400';
    case 'No Hire': return 'text-red-400';
    default: return 'text-gray-400';
  }
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(iso));
}

function formatDuration(minutes: number | null): string {
  if (!minutes) return '—';
  return `${minutes}m`;
}

const getSessionIcon = (type: string): LucideIcon => {
  const t = type.toLowerCase();
  if (t.includes('system') || t.includes('design')) return Network;
  if (t.includes('coding') || t.includes('technical')) return Code;
  return MessageSquare;
};

interface SessionRowProps {
  session: SessionSummary;
}

function SessionRow({ session }: SessionRowProps) {
  const score = session.feedback?.overallScore;
  const verdict = session.feedback?.verdict;
  const navigate = useNavigate();
  const Icon = getSessionIcon(session.type);

  return (
    <div
      onClick={() => { navigate(`/sessions/${session.id}`) }}
      className="flex flex-col md:grid md:grid-cols-6 gap-3 md:gap-4 p-5 items-stretch md:items-center transition-colors hover:bg-gray-800/30 border-b border-gray-800 cursor-pointer"
    >
      {/* Title & Icon */}
      <div className="col-span-2 flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-800 bg-[#181d2c]/50 text-gray-400 group-hover:text-[#00E599] transition-colors shrink-0">
          <Icon size={14} />
        </div>
        <div className="text-sm font-semibold text-gray-300 truncate">
          {session.interview.title}
        </div>
      </div>

      {/* Mobile Metadata */}
      <div className="flex md:hidden items-center gap-3 text-xs text-gray-500 font-medium flex-wrap pl-11">
        <span className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[10px] text-gray-400 font-semibold uppercase">
          {session.type}
        </span>
        <span className="flex items-center gap-1.5 font-mono">
          <Calendar size={12} className="text-gray-600" />
          {formatDate(session.startedAt)}
        </span>
        <span className="flex items-center gap-1.5 font-mono">
          <Clock size={12} className="text-gray-600" />
          {formatDuration(session.duration)}
        </span>
      </div>

      {/* Desktop Column: Type */}
      <div className="hidden md:block text-xs font-mono text-gray-400">{session.type}</div>

      {/* Desktop Column: Date */}
      <div className="hidden md:block text-xs font-mono text-gray-400">{formatDate(session.startedAt)}</div>

      {/* Desktop Column: Duration */}
      <div className="hidden md:block text-xs font-mono text-gray-400 text-right">
        {formatDuration(session.duration)}
      </div>

      {/* Score / Verdict Column */}
      <div className="flex items-center justify-between md:justify-end border-t border-gray-800/40 md:border-none pt-3 md:pt-0 pl-11 md:pl-0">
        <span className="md:hidden text-[10px] font-bold text-gray-500 uppercase tracking-widest">Performance</span>
        <div>
          {score != null ? (
            <span className={`text-sm font-bold ${score >= 80 ? 'text-[#00E599]' : score >= 60 ? 'text-orange-400' : 'text-red-400'}`}>
              {score}/100
            </span>
          ) : (
            <span className={`text-xs font-semibold ${verdictColour(verdict)}`}>
              {verdict ?? '—'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RecentInterviews({ sessions }: RecentInterviewsProps) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-white mb-6">Recent Interviews</h3>

      <div className="bg-[#111623] border border-gray-800 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-6 gap-4 p-5 border-b border-gray-800 bg-[#0B0F19]/50">
          <div className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Title</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Type</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Duration</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Score</div>
        </div>

        {/* Table Body */}
        {sessions.length > 0 ? (
          <div className="flex flex-col">
            {sessions.slice(0, 5).map((session) => (
              <SessionRow
                key={session.id}
                session={session}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 gap-3 opacity-40">
            <Mic size={32} className="text-gray-500" />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center max-w-xs leading-relaxed">
              No interviews yet. Hit Start to begin your first session.
            </p>
          </div>
        )}
      </div>

      {/* Footer hint — only shown when there are sessions */}
      {sessions.length > 0 && (
        <div className="mt-12 flex flex-col items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
          <Mic size={32} className="text-gray-500 mb-4" />
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center max-w-xs leading-relaxed">
            Ready for more? Hit the Start button above to begin a new session.
          </p>
        </div>
      )}
    </div>
  );
}
