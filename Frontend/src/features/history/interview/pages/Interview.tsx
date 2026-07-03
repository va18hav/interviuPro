import { useMemo } from 'react';
import { History, Building2, Code, GitBranch, MessageSquare, AlertCircle } from 'lucide-react';
import { useGetInterviewSessionsData } from '../hooks/interviewDataHook';
import ReadinessCard from '../components/ReadinessCard';
import PerformanceCard from '../components/PerformanceCard';
import SessionHistoryTable from '../components/SessionHistoryTable';
import InterviewSkeleton from '../components/InterviewSkeleton';

export default function Interview() {
  const { interviewData, isLoading, isError } = useGetInterviewSessionsData();

  const overallReadiness = useMemo(() => {
    if (!interviewData?.sessions) return null;
    const scoredSessions = interviewData.sessions.filter(
      (s) => s.feedback && s.feedback.overallScore > 0
    );
    if (scoredSessions.length === 0) return null;
    const total = scoredSessions.reduce((acc, s) => acc + s.feedback!.overallScore, 0);
    return Math.round(total / scoredSessions.length);
  }, [interviewData]);

  const performanceCategories = useMemo(() => {
    if (!interviewData?.sessions) return [];

    // Define the categories with their matchers
    const config = [
      {
        name: 'Algorithms & Technical',
        icon: Code,
        matcher: (type: string) => {
          const t = type.toLowerCase();
          return t.includes('coding') || t.includes('technical') || t.includes('algorithm');
        }
      },
      {
        name: 'System Design',
        icon: GitBranch,
        matcher: (type: string) => {
          const t = type.toLowerCase();
          return t.includes('system') || t.includes('design') || t.includes('architecture');
        }
      },
      {
        name: 'Behavioral & Communication',
        icon: MessageSquare,
        matcher: (type: string) => {
          const t = type.toLowerCase();
          return t.includes('behavioral') || t.includes('communication');
        }
      }
    ];

    return config.map((cat) => {
      const matchedSessions = interviewData.sessions.filter((s) => cat.matcher(s.type));
      const scoredSessions = matchedSessions.filter(
        (s) => s.feedback && s.feedback.overallScore > 0
      );

      let averageScore: number | null = null;
      if (scoredSessions.length > 0) {
        const sum = scoredSessions.reduce((acc, s) => acc + s.feedback!.overallScore, 0);
        averageScore = Math.round(sum / scoredSessions.length);
      }

      return {
        name: cat.name,
        score: averageScore,
        icon: cat.icon
      };
    });
  }, [interviewData]);

  if (isLoading) {
    return <InterviewSkeleton />;
  }

  if (isError || !interviewData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3 text-gray-400">
        <AlertCircle size={24} className="text-red-400" />
        <p className="text-sm font-mono text-red-400">Failed to load interview details.</p>
        <p className="text-xs text-gray-600">Check your connection or try refreshing the page.</p>
      </div>
    );
  }

  const sessionCount = interviewData.sessions.length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:p-8 font-sans relative overflow-hidden">
      {/* Decorative gradient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00E599]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        {/* Header Block */}
        <div className="space-y-4">
          {/* Role Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            {interviewData.title}
          </h1>

          {/* Metadata Meta Rows */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-400">
            <span className="flex items-center gap-1.5">
              <Building2 size={14} className="text-gray-500" />
              <span>Role: {interviewData.role}</span>
            </span>
            <span className="text-gray-700 font-normal">•</span>
            <span className="flex items-center gap-1.5">
              <History size={14} className="text-gray-500" />
              <span>{sessionCount} {sessionCount === 1 ? 'Session' : 'Sessions'}</span>
            </span>
          </div>
        </div>

        {/* Overview Row: Readiness & Performance Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ReadinessCard percentage={overallReadiness} />
          </div>
          <div className="md:col-span-2">
            <PerformanceCard categories={performanceCategories} />
          </div>
        </div>

        {/* Session History Section */}
        <SessionHistoryTable sessions={interviewData.sessions} />
      </div>
    </div>
  );
}
