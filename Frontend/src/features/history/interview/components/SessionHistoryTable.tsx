import { Filter, GitBranch, Code, MessageSquare, LucideIcon } from 'lucide-react';
import { SessionHistoryData } from '../types/interviewData.types';

interface SessionHistoryTableProps {
  sessions: SessionHistoryData[];
}

const getSessionIcon = (type: string): LucideIcon => {
  const t = type.toLowerCase();
  if (t.includes('system')) return GitBranch;
  if (t.includes('coding') || t.includes('technical')) return Code;
  return MessageSquare;
};

const formatDate = (isoString?: string) => {
  if (!isoString) return '—';
  return isoString.split('T')[0];
};

const getVerdictStyles = (verdict: string | undefined) => {
  if (!verdict) return 'text-gray-400 border-gray-800 bg-gray-900/10';
  const v = verdict.toLowerCase();
  if (v.includes('strong')) {
    return 'text-[#00E599] border-[#00E599]/20 bg-[#00E599]/5';
  }
  if (v.includes('no') || v.includes('leaning')) {
    return 'text-orange-400 border-orange-500/20 bg-orange-500/5';
  }
  return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
};

export default function SessionHistoryTable({ sessions }: SessionHistoryTableProps) {
  return (
    <div className="bg-[#111623]/40 border border-gray-800/80 rounded-2xl p-6 space-y-6">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">
          Session History
        </h3>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-800 hover:border-gray-700 bg-[#181d2c]/50 text-gray-400 hover:text-white rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
        >
          <Filter size={12} />
          <span>Filter</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto w-full">
        {sessions.length > 0 ? (
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-800 text-[14px] font-bold text-gray-500 uppercase tracking-widest">
                <th className="pb-3 font-semibold">Round Type</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Duration</th>
                <th className="pb-3 font-semibold text-center">Score</th>
                <th className="pb-3 font-semibold text-right">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {sessions.map((session) => {
                const Icon = getSessionIcon(session.type);
                const score = session.feedback?.overallScore;
                const verdict = session.feedback?.verdict;

                return (
                  <tr key={session.id} className="group hover:bg-[#181d2c]/20 transition-all">
                    {/* Round Type */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-800/80 bg-[#181d2c]/50 text-gray-400 group-hover:text-[#00E599] transition-colors">
                          <Icon size={14} />
                        </div>
                        <span className="text-[12px] font-semibold text-white group-hover:text-[#00E599] transition-colors">
                          {session.type}
                        </span>
                      </div>
                    </td>
                    {/* Date */}
                    <td className="py-4 text-[12px] font-medium text-gray-400 font-mono">
                      {formatDate(session.startedAt)}
                    </td>
                    {/* Duration */}
                    <td className="py-4 text-[12px] font-medium text-gray-400 font-mono">
                      {session.duration}m
                    </td>
                    {/* Score */}
                    <td className="py-4 text-[12px] font-bold text-center font-mono text-[#00E599]">
                      {score !== undefined && score !== null ? `${score}/100` : '—'}
                    </td>
                    {/* Verdict */}
                    <td className="py-4 text-right">
                      <div className="inline-block min-w-[110px]">
                        <span className={`px-2.5 py-1 text-[10px] font-bold tracking-wider rounded border uppercase text-center block ${getVerdictStyles(verdict)}`}>
                          {verdict || 'No Feedback'}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-sm text-gray-500 font-medium">
            No sessions practiced yet.
          </div>
        )}
      </div>
    </div>
  );
}
