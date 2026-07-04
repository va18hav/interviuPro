import { Plus, ChevronDown, Network, AlertCircle } from 'lucide-react';
import SessionCard from '../components/SessionCard';
import SessionFilters from '../components/SessionFilters';
import { useGetSessionsData } from '../hooks/sessionsDataHook';
import SessionCardSkeleton from '../components/SessionCardSkeleton';

// const useIcon = (type: 'Techical Round/Coding' | 'System Design' | 'Behavioral') => {
//   switch (type) {
//     case 'Techical Round/Coding':
//       return Terminal
//       break
//     case 'System Design':
//       return Network
//       break
//     case 'Behavioral':
//       return Users
//       break
//   }
// }

export default function Sessions() {

  const { sessions = [], isLoading, isError } = useGetSessionsData()
  console.log(sessions)

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3 text-gray-400">
        <AlertCircle size={24} className="text-red-400" />
        <p className="text-sm font-mono text-red-400">Failed to load session data.</p>
        <p className="text-xs text-gray-600">Check your connection or try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-8 font-sans relative overflow-hidden">
      {/* Decorative gradient glows for high-end aesthetic */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00E599]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            My Sessions
          </h1>
          <button
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 bg-[#00E599] hover:bg-[#00C281] text-black font-semibold text-[11px] tracking-wide rounded transition-colors shadow-lg shadow-[#00E599]/10"
          >
            <Plus size={14} className="stroke-[3]" />
            <span>New Session</span>
          </button>
        </div>

        {/* Filters and Search */}
        <SessionFilters />

        {/* Sessions List */}
        <div className="flex flex-col gap-4 mt-6">
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <SessionCardSkeleton key={i} />
            ))
          ) : (
            sessions.map((session) => {
              const sessionData = {
                id: session.id,
                title: session.interview.title,
                date: session.startedAt,
                duration: session.duration,
                type: session.type,
                score: session.feedback?.overallScore || null,
                verdict: session.feedback?.verdict || null,
                icon: Network
              }
              return <SessionCard key={session.id} session={sessionData} />
            })
          )}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center pt-6">
          <button
            type="button"
            className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider"
          >
            <span>Load Older Sessions</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
