import { useState, useRef } from 'react';
import { ArrowLeft, RefreshCw, ArrowRight, Loader2 } from 'lucide-react';

interface EnterOtpStepProps {
  onVerify: (code: string) => void;
  onBack: () => void;
  isPending: boolean;
  onResend: () => void;
}

export default function EnterOtpStep({ onVerify, onBack, isPending, onResend }: EnterOtpStepProps) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d{4}$/.test(pastedData)) return;

    const digits = pastedData.split('');
    setOtp(digits);
    inputRefs[3].current?.focus();
  };

  const handleSubmit = () => {
    const code = otp.join('');
    if (code.length === 4) {
      onVerify(code);
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
      <button
        onClick={onBack}
        className="self-start flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-[#00E599] transition-colors mb-2"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="w-16 h-16 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.1)]">
        <RefreshCw size={28} className="animate-pulse" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">Enter OTP Code</h1>
        <p className="text-sm text-gray-400 max-w-sm">
          We've sent a 4-digit code to your email. Please enter it below to verify your account.
        </p>
      </div>

      <div className="flex gap-4 my-2">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            ref={inputRefs[idx]}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={idx === 0 ? handlePaste : undefined}
            className="w-14 h-16 text-center text-2xl font-bold bg-[#1F2937]/50 border border-gray-700/80 rounded-xl focus:outline-none focus:border-[#00E599] focus:ring-1 focus:ring-[#00E599] transition-all text-white placeholder-gray-700"
            placeholder="-"
          />
        ))}
      </div>

      <button
        disabled={isPending || otp.some(d => !d)}
        onClick={handleSubmit}
        className="mt-4 relative w-full bg-[#00E599] hover:bg-[#00c985] text-black font-semibold py-3 rounded-lg text-sm transition-all flex justify-center items-center overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={`flex items-center gap-2 transition-all duration-300 ${isPending ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          Verify Code
          <ArrowRight size={16} strokeWidth={2} />
        </span>
        {isPending && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin text-black" size={18} strokeWidth={2.5} />
          </span>
        )}
      </button>

      <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-2">
        Didn't receive the code?
        <button
          onClick={onResend}
          className="text-[#00E599] hover:underline font-semibold transition-all"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}
