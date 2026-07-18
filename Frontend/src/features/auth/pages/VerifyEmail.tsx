import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SendOtpStep from '../components/SendOtpStep';
import EnterOtpStep from '../components/EnterOtpStep';
import SuccessStep from '../components/SuccessStep';
import { Loader2 } from 'lucide-react';
import { useVerifyEmail, useSendOtp, useGetUser } from '../hooks/authHook';

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'send' | 'otp' | 'success'>('send');

  const { user, fetchingUser } = useGetUser();
  const { verify, verifying } = useVerifyEmail();
  const { resend, sending } = useSendOtp();

  // Redirect if already verified
  useEffect(() => {
    if (user && user.isEmailVerified) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Auto-redirect simulation in success state
  useEffect(() => {
    if (step === 'success') {
      const timer = setTimeout(() => {
        navigate('/onboarding');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  const handleSend = () => {
    resend(undefined, {
      onSuccess: () => {
        setStep('otp');
      }
    });
  };

  const handleVerify = (code: string) => {
    verify(code, {
      onSuccess: () => {
        setStep('success');
      }
    });
  };

  const handleResend = () => {
    resend();
  };

  if (fetchingUser) {
    return (
      <div className="flex min-h-screen w-full bg-[#0B0F19] text-white justify-center items-center font-sans">
        <Loader2 className="animate-spin text-[#00E599]" size={36} strokeWidth={2.5} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-[#0B0F19] text-white font-sans">
      {/* RIGHT PANEL */}
      <div className="flex w-full flex-col justify-center items-center p-8 relative">
        <div className="mb-6 flex flex-col items-center gap-2 select-none">
          <img src="/logo.png" alt="Interviu Logo" className="h-12 w-auto" />
          <h2 className="text-xl font-bold tracking-tight text-white font-inter">
            Interv<span className="text-[#00E599]">i</span>u
          </h2>
        </div>
        <div className="w-full max-w-md bg-[#111827]/40 border border-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative overflow-hidden transition-all duration-300">

          {/* Subtle neon glowing accent inside the card */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00E599]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Render isolated steps */}
          {step === 'send' && (
            <SendOtpStep
              onSend={handleSend}
              isPending={sending}
            />
          )}

          {step === 'otp' && (
            <EnterOtpStep
              onVerify={handleVerify}
              onBack={() => setStep('send')}
              isPending={verifying}
              onResend={handleResend}
            />
          )}

          {step === 'success' && (
            <SuccessStep
              onComplete={() => navigate('/onboarding')}
            />
          )}

        </div>

        {/* Footer */}
        <div className="absolute bottom-8 flex gap-6 text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
          <span className="text-gray-700">•</span>
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
        </div>
      </div>
    </div>
  );
}
