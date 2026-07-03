import { Mail, ArrowRight, Loader2 } from 'lucide-react';

interface SendOtpStepProps {
  onSend: () => void;
  isPending: boolean;
}

export default function SendOtpStep({ onSend, isPending }: SendOtpStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-[#00E599]/10 border border-[#00E599]/20 flex items-center justify-center text-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.1)] animate-fade-in">
        <Mail size={32} />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">Verify your email</h1>
        <p className="text-sm text-gray-400 max-w-sm">
          To secure your account and access the dashboard, we need to verify your email address. We'll send a 4-digit security code.
        </p>
      </div>

      <button
        disabled={isPending}
        onClick={onSend}
        className="relative w-full bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3 rounded-lg text-sm transition-all mt-2 flex justify-center items-center overflow-hidden"
      >
        <span className={`flex items-center gap-2 transition-all duration-300 ${isPending ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          Send Verification Code
          <ArrowRight size={16} strokeWidth={2} />
        </span>
        {isPending && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-black" size={18} strokeWidth={2.5} />
          </span>
        )}
      </button>
    </div>
  );
}
