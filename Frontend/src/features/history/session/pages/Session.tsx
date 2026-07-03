import SessionHeader from '../components/SessionHeader';
import ScoreCard from '../components/ScoreCard';
import AISummaryCard from '../components/AISummaryCard';
import FeedbackDetails from '../components/FeedbackDetails';
import TranscriptSection from '../components/TranscriptSection';
import { useSessionData } from '../hooks/sessionDataHook';
import { AlertCircle } from 'lucide-react';
import { SessionData } from '../types/session.types'
import { useNavigate } from 'react-router-dom';
import SessionSkeleton from '../components/SessionSkeleton';

export default function Session() {
  const navigate = useNavigate()
  const { isLoading, isError, sessionData }
    : { isLoading: boolean, isError: boolean, sessionData: SessionData } = useSessionData()
  const handleBack = () => {
    navigate('/dashboard')
  };

  if (isLoading) {
    return <SessionSkeleton />;
  }

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
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Decorative gradient glows for high-end aesthetic */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#00E599]/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      {sessionData.feedback && <div className="no-scrollbar flex-1 w-full max-w-6xl mx-auto px-4 pt-8 md:pt-12 space-y-8 relative z-10">
        {/* Header Component */}
        <SessionHeader onBackClick={handleBack} sessionData={sessionData} />

        {/* First Row: Score and AI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-1">
            <ScoreCard sessionData={sessionData} />
          </div>
          <div className="md:col-span-2">
            <AISummaryCard sessionData={sessionData} />
          </div>
        </div>

        {/* Second Row: Strengths, Focus Areas, Next Steps */}
        <FeedbackDetails sessionData={sessionData} />

        {/* Third Row: Dialog Transcript */}
        <TranscriptSection />

      </div>}
    </div>
  );
}
