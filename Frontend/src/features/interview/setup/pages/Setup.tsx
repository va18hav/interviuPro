import { useCreateInterview, useStartSession } from '../hooks/createInterviewHook'
import { ArrowLeft } from 'lucide-react';
import SetupForm from '../components/SetupForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StartSession from '../components/StartSession';

export default function Setup() {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const interviewId = searchParams.get('interviewId')
  const { createInterview, isPending: isCreating } = useCreateInterview()
  const { startSession, isPending: isStarting } = useStartSession()

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans p-6 lg:p-10 flex flex-col items-center">

      <div className="w-full max-w-3xl mb-8">
        {/* Back Navigation */}
        <button
          onClick={() => { navigate('/dashboard') }}
          className="flex items-center gap-2 text-xs font-bold text-[#00E599] hover:text-[#00c985] uppercase tracking-widest transition-colors mb-6">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-white tracking-tight">{interviewId ? 'Start your session' : 'Set up your interview'}</h1>
      </div>

      {/* Main Form Container */}
      {!interviewId
        ? <SetupForm onSubmit={createInterview} isPending={isCreating} />
        : <StartSession interviewId={interviewId} onStart={startSession} isPending={isStarting} />}
    </div>
  );
}
