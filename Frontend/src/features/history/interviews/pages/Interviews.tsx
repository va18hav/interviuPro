import { AlertCircle, Plus } from 'lucide-react';
import InterviewCard from '../components/InterviewCard';
import { InterviewData } from '../types/interviewsData.types'
import { useGetInterviewsData } from '../hooks/interviewsDataHook';
import { useMemo } from 'react';
import InterviewCardSkeleton from '../components/InterviewCardSkeleton';

export default function Interviews() {
  const { interviews = [], isLoading, isError }: { interviews: InterviewData[], isLoading: boolean, isError: boolean } = useGetInterviewsData()

  const interviewsData = useMemo(() => {
    return (interviews || []).map((interview) => {

      let totalScore = 0;
      let scoredSessions = 0;

      for (const session of interview.sessions) {
        if (session.feedback?.overallScore > 0) {
          totalScore += session.feedback.overallScore
          scoredSessions++
        }
      }

      return {
        id: interview.id,
        title: interview.title,
        role: interview.role,
        tags: interview.skills,
        avgScore:
          scoredSessions > 0
            ? Math.round(totalScore / scoredSessions)
            : null,
        totalSessions: interview.sessions.length,
      };
    });
  }, [interviews]);
  console.log(interviewsData)

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3 text-gray-400">
        <AlertCircle size={24} className="text-red-400" />
        <p className="text-sm font-mono text-red-400">Failed to load dashboard data.</p>
        <p className="text-xs text-gray-600">Check your connection or try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-8 font-sans relative overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00E599]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header Row */}
        <div className="flex items-start justify-between border-b border-gray-800 pb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              My Interviews
            </h1>
            <p className="text-sm text-gray-400">
              Dashboard of roles and your practice sessions.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-[11px] font-bold text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider mt-1.5"
          >
            <Plus size={12} className="stroke-[3]" />
            <span>New Interview</span>
          </button>
        </div>

        {/* Interviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <InterviewCardSkeleton key={i} />
            ))
          ) : (
            interviewsData.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
