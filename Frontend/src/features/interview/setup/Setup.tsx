import { ArrowLeft } from 'lucide-react';
import SetupForm from './components/SetupForm';
import { useNavigate } from 'react-router-dom';

export default function Setup() {

  const navigate = useNavigate()

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
        <h1 className="text-4xl font-bold text-white tracking-tight">Set up your interview</h1>
      </div>

      {/* Main Form Container */}
      <SetupForm />

    </div>
  );
}
