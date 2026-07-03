import { MonitorPlay, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CustomInterviewCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#111623] border border-[#00E599] rounded-xl p-8 relative overflow-hidden flex flex-col items-start shadow-[0_0_15px_rgba(0,229,153,0.1)] transition-all hover:shadow-[0_0_25px_rgba(0,229,153,0.2)]">

      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#00E599]/5 to-transparent pointer-events-none"></div>

      <div className="w-10 h-10 border border-[#00E599] bg-[#00E599]/10 rounded-lg flex items-center justify-center mb-6">
        <MonitorPlay className="text-[#00E599]" size={20} />
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">Custom Interview</h2>

      <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
        Configure role, strictness, and specific technical domains for a personalized AI mock interview session.
      </p>

      <button
        onClick={() => navigate('/interview/setup')}
        className="flex items-center gap-2 px-6 py-3 bg-[#00E599] hover:bg-[#00c985] text-black text-xs font-bold uppercase tracking-widest rounded transition-colors"
      >
        Start <ArrowRight size={16} />
      </button>
    </div>
  );
}
