import { useState } from 'react';
import Step1Profile from './components/Step1Profile';
import Step2Resume from './components/Step2Resume';
import Step3Success from './components/Step3Success';


export default function Onboarding() {
  // Simple local state just for UI previewing. 
  // You can replace this with your actual state management later.
  const [currentStep, setCurrentStep] = useState(1);

  // Helper to render the correct step component
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Profile onNext={() => setCurrentStep(2)} />;
      case 2:
        return <Step2Resume />;
      case 3:
        return <Step3Success />;
    }
  };

  // Helper text for the top progress bar based on step
  const getStepText = () => {
    if (currentStep === 1) return 'STEP 01: PROFILE & SKILLS';
    if (currentStep === 2) return 'STEP 02: RESUME';
    return '';
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans flex flex-col items-center pt-8 pb-20">

      {/* Interviu Logo */}
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight">
          Interviu<span className="text-[#00E599]">.</span>
        </h2>
      </div>

      <div className="relative w-full max-w-2xl px-6">
        {/* Progress Bar Area */}
        <div className="mb-4">
          {currentStep < 3 && (
            <div className="flex justify-between items-end mb-4">
              <span className="text-[10px] font-bold text-[#00E599] uppercase tracking-[0.2em]">{getStepText()}</span>
              {/* <button className="absolute top-0 right-0 text-xm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                I'll do this later <span className="text-lg leading-none">→</span>
              </button> */}
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

        {/* Temporary UI Controls (Just for you to preview steps) */}
        <div className="fixed bottom-4 right-4 flex gap-2 bg-gray-900 p-2 rounded-lg border border-gray-800">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
          >
            Prev Step
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}
            className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded text-gray-300"
          >
            Next Step
          </button>
        </div>

      </div>
    </div>
  );
}
