import { Mic } from 'lucide-react';
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

interface SessionRowProps {
  session: SessionSummary;
}

function SessionRow({ session }: SessionRowProps) {
  const score = session.feedback?.overallScore;
  const verdict = session.feedback?.verdict;
  const navigate = useNavigate()

  return (
    <div
      onClick={() => { navigate(`/sessions/${session.id}`) }}
      className='grid grid-cols-6 gap-4 p-5 items-center transition-colors hover:bg-gray-800/30 border-b border-gray-800'
    >
      <div className="col-span-2 text-sm font-semibold text-gray-300 truncate">
        {session.interview.title}
      </div>
      <div className="text-xs font-mono text-gray-400">{session.type}</div>
      <div className="text-xs font-mono text-gray-400">{formatDate(session.startedAt)}</div>
      <div className="text-xs font-mono text-gray-400 text-right">
        {formatDuration(session.duration)}
      </div>
      <div className="text-right">
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
  );
}

export default function RecentInterviews({ sessions }: RecentInterviewsProps) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-white mb-6">Recent Interviews</h3>

      <div className="bg-[#111623] border border-gray-800 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 p-5 border-b border-gray-800 bg-[#0B0F19]/50">
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
