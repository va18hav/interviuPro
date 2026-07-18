import { useEffect, useState } from 'react';
import Step1Profile from '../components/Step1Profile';
import Step2Resume from '../components/Step2Resume';
import Step3Success from '../components/Step3Success';
import Step1ProfileSkeleton from '../components/Step1ProfileSkeleton';
import { useGetProfileData } from '../hooks/profileDataHook';


export default function Onboarding() {

  const [currentStep, setCurrentStep] = useState(1);
  const { firstName, onboardingStep1, onboardingStep2, loadingProfileData } = useGetProfileData()

  useEffect(() => {
    if (onboardingStep1 && onboardingStep2) {
      const timer = setTimeout(() => setCurrentStep(3), 0);
      return () => clearTimeout(timer);
    } else if (onboardingStep1) {
      const timer = setTimeout(() => setCurrentStep(2), 0);
      return () => clearTimeout(timer);
    }
  }, [onboardingStep1, onboardingStep2]);

  const renderStep = () => {
    if (loadingProfileData) {
      return <Step1ProfileSkeleton />;
    }
    switch (currentStep) {
      case 1:
        return <Step1Profile onNext={() => setCurrentStep(2)} />;
      case 2:
        return <Step2Resume onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />;
      case 3:
        return <Step3Success firstName={firstName} />;
    }
  };

  // Helper text for the top progress bar based on step
  const getStepText = () => {
    if (loadingProfileData || currentStep === 1) return 'STEP 01: PROFILE & SKILLS';
    if (currentStep === 2) return 'STEP 02: RESUME';
    return '';
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col items-center pt-8 pb-20">

      {/* Interviu Logo */}
      <div className="mb-6 flex flex-col items-center gap-2 select-none">
        <img src="/logo.png" alt="Interviu Logo" className="h-10 w-auto" />
        <h2 className="text-xl font-bold tracking-tight">
          Interv<span className="text-[#00E599]">i</span>u
        </h2>
      </div>

      <div className="relative w-full max-w-2xl px-6">
        {/* Progress Bar Area */}
        <div className="mb-4">
          {currentStep < 3 && (
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-bold text-[#00E599] uppercase tracking-[0.2em]">{getStepText()}</span>
            </div>
          )}

          <div className={`flex gap-2 ${currentStep === 3 ? 'justify-center max-w-sm mx-auto' : ''}`}>
            {/* Bar 1 */}
            <div className={`h-1 flex-1 rounded-full ${currentStep >= 1 ? 'bg-[#00E599]' : 'bg-gray-800'}`}></div>
            {/* Bar 2 */}
            <div className={`h-1 flex-1 rounded-full ${currentStep >= 2 ? 'bg-[#00E599]' : 'bg-gray-800'}`}></div>
            {/* Bar 3 */}
            <div className={`h-1 flex-1 rounded-full ${currentStep >= 3 ? 'bg-[#00E599]' : 'bg-gray-800'}`}></div>
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

      </div>
    </div>
  );
}
