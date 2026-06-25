import { Check, ArrowRight, Hexagon, ShieldCheck } from 'lucide-react';

export default function Step3Success() {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center pt-8">
      
      {/* Success Icon */}
      <div className="w-16 h-16 bg-[#00E599]/10 rounded-2xl flex items-center justify-center mb-8 border border-[#00E599]/20 shadow-[0_0_30px_rgba(0,229,153,0.15)]">
        <div className="w-10 h-10 bg-[#00E599] rounded-full flex items-center justify-center">
          <Check className="text-black" strokeWidth={3} size={20} />
        </div>
      </div>

      {/* Header text */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">You're all set, Linus</h1>
        <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
          Your first 100 credits are loaded. Each interview session uses credits based on duration.
        </p>
      </div>

      {/* Credits Badge */}
      <div className="flex items-center gap-2 px-4 py-2 border border-[#00E599]/30 rounded-full bg-[#00E599]/5 mb-12">
        <Hexagon size={14} className="text-[#00E599]" />
        <span className="text-[10px] font-bold text-[#00E599] uppercase tracking-widest">100 Credits</span>
      </div>

      {/* Action */}
      <button className="w-full max-w-sm bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3.5 rounded-md text-sm transition-colors flex items-center justify-center gap-2 mb-8">
        Go to Dashboard <ArrowRight size={16} />
      </button>

      {/* Footer info */}
      <div className="text-center space-y-8">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          Step 3 of 3 • System Ready
        </p>
        
        <div className="flex items-center justify-center gap-1.5 text-gray-600">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secure Technical Environment</span>
        </div>
      </div>
      
    </div>
  );
}
