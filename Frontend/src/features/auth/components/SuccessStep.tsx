import { CheckCircle2, ArrowRight } from 'lucide-react';

interface SuccessStepProps {
  onComplete: () => void;
}

export default function SuccessStep({ onComplete }: SuccessStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-4 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center text-[#00E599] shadow-[0_0_25px_rgba(0,229,153,0.2)] animate-bounce">
        <CheckCircle2 size={36} />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-[#00E599]">Verification Successful!</h1>
        <p className="text-sm text-gray-400 max-w-sm">
          Thank you! Your email has been verified, and your account is now fully active.
        </p>
      </div>

      <div className="text-xs text-gray-500 italic">
        Redirecting to your dashboard in a few seconds...
      </div>

      <button
        onClick={onComplete}
        className="w-full bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3 rounded-lg text-sm transition-all flex justify-center items-center gap-2"
      >
        Go to Dashboard
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
}
