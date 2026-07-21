import { useEffect, useRef, useState } from 'react';
import { Mic, Code, BarChart3, Settings, Layers, Volume2 } from 'lucide-react';

export default function LandingHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [step0Ref, step1Ref, step2Ref, step3Ref];

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let minDistance = Infinity;

      refs.forEach((ref, idx) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const stepCenter = rect.top + rect.height / 2;
          const dist = Math.abs(stepCenter - viewportCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });

      setActiveStep(closestIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Create an interview',
      desc: 'Enter your target role, title, experience level, and paste any job description to customize your interview setup.'
    },
    {
      num: '02',
      title: 'Choose a session type',
      desc: 'Select between Coding, System Design, or Behavioral STAR interview rounds depending on your practice goal.'
    },
    {
      num: '03',
      title: 'Interview live with AI',
      desc: 'Speak directly into your mic while the AI interviewer leads the session in real time.'
    },
    {
      num: '04',
      title: 'Review detailed feedback',
      desc: 'Get an instant performance scorecard with quantitative depth ratings, actionable tips, and full session transcripts.'
    }
  ];

  return (
    <section id="how-it-works" className="relative bg-black px-6 font-sans select-none border-t border-white/5 py-24 min-h-[220vh]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Full-width Section Title */}
        <div className="text-left space-y-3 max-w-3xl">
          <span className="text-xs font-mono font-bold text-[#00E599] uppercase tracking-widest">HOW IT WORKS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Simple 4-step <span className="text-[#00E599]">interview process</span>
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Left Column: Scrolling Steps */}
          <div className="lg:col-span-5 space-y-32 py-12">
            {steps.map((s, idx) => {
              const isActive = activeStep === idx;
              const stepRef = idx === 0 ? step0Ref : idx === 1 ? step1Ref : idx === 2 ? step2Ref : step3Ref;

              return (
                <div
                  key={idx}
                  ref={stepRef}
                  className={`transition-all duration-300 space-y-3 text-left ${
                    isActive ? 'opacity-100 translate-x-1' : 'opacity-25'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                        isActive
                          ? 'bg-[#00E599] text-black shadow-[0_0_15px_rgba(0,229,153,0.4)]'
                          : 'bg-zinc-900 text-gray-500 border border-white/10'
                      }`}
                    >
                      {s.num}
                    </span>
                    <h3 className={`text-lg sm:text-xl font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 font-normal leading-relaxed pl-11">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual Card */}
          <div className="hidden lg:block lg:col-span-7 sticky top-32 h-[380px] rounded-2xl border border-white/10 bg-[#09090b] p-6 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)]">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* STEP 1 VISUAL: Create an Interview */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-zinc-950 ${
                activeStep === 0
                  ? 'opacity-100 translate-y-0 scale-100 border-[#00E599]/40 shadow-[0_0_30px_rgba(0,229,153,0.1)]'
                  : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono font-bold text-[#00E599] flex items-center gap-2">
                  <Settings size={14} /> STEP 01: CREATE INTERVIEW
                </span>
                <span className="text-[10px] font-mono text-gray-500">CUSTOM SETUP</span>
              </div>
              
              <div className="space-y-3 text-left">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Role & Title</label>
                    <div className="p-2 rounded bg-zinc-900 border border-white/5 text-xs text-white font-bold">Full Stack Engineer</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Experience</label>
                    <div className="p-2 rounded bg-zinc-900 border border-white/5 text-xs text-white font-bold">5+ Years (Senior)</div>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Job Description</label>
                  <div className="p-2.5 rounded bg-black border border-white/5 text-[11px] text-gray-400 font-mono">
                    "Looking for an engineer experienced with distributed systems, REST APIs, and microservices..."
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-500 text-left border-t border-white/5 pt-2">
                Configures AI interviewer rubric to your target role
              </div>
            </div>

            {/* STEP 2 VISUAL: Choose Session Type */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-zinc-950 ${
                activeStep === 1
                  ? 'opacity-100 translate-y-0 scale-100 border-[#00E599]/40 shadow-[0_0_30px_rgba(0,229,153,0.1)]'
                  : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-2">
                  <Layers size={14} /> STEP 02: CHOOSE SESSION TYPE
                </span>
                <span className="text-[10px] font-mono text-gray-500">SELECT ROUND</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-left">
                <div className="p-3 rounded-lg border border-[#00E599]/40 bg-[#00E599]/5 space-y-1.5 cursor-pointer">
                  <Code size={16} className="text-[#00E599]" />
                  <div className="text-xs font-bold text-white">Coding</div>
                  <div className="text-[9px] text-gray-400 font-mono">Data Structures & Algo</div>
                </div>
                <div className="p-3 rounded-lg border border-white/10 bg-zinc-900 space-y-1.5 opacity-60">
                  <Settings size={16} className="text-blue-400" />
                  <div className="text-xs font-bold text-white">System Design</div>
                  <div className="text-[9px] text-gray-400 font-mono">Architecture & Scale</div>
                </div>
                <div className="p-3 rounded-lg border border-white/10 bg-zinc-900 space-y-1.5 opacity-60">
                  <Mic size={16} className="text-purple-400" />
                  <div className="text-xs font-bold text-white">Behavioral</div>
                  <div className="text-[9px] text-gray-400 font-mono">STAR Method Mocks</div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-500 text-left border-t border-white/5 pt-2">
                Tailors session format and live workspace components
              </div>
            </div>

            {/* STEP 3 VISUAL: Clean Avatar + Waveform Only */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-[#0B0F19] ${
                activeStep === 2
                  ? 'opacity-100 translate-y-0 scale-100 border-[#00E599]/40 shadow-[0_0_30px_rgba(0,229,153,0.1)]'
                  : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
              }`}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-[#00E599] flex items-center gap-2">
                  <Mic size={14} /> STEP 03: LIVE VOICE SESSION
                </span>
                <span className="text-[10px] font-mono text-[#00E599] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" /> LIVE
                </span>
              </div>

              {/* Clean AI Avatar + Audio Waveform */}
              <div className="flex flex-col items-center justify-center space-y-4 py-4 my-auto">
                {/* AI Avatar Sphere */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-gray-700 overflow-hidden relative z-10 shadow-[0_0_25px_rgba(0,229,153,0.25)]">
                    <img
                      alt="AI Avatar"
                      className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6BAvlA2rgvPzK2ZBqWZi0QxWAq-Qs9gbU7bpuhGb5ULCSvvcemeQLey7iliwnXMnaYWGCkqnlbDnrbwkqLC6khaW17G11ytuQdC1WfYtHgclSr4FwzvijhhWlxI-Fkks2kcGqjbgTzk4RiVOSbf9NvGelD4lZcYH6LhBPaMa0QnAR9iW1zy0H0XacFJ6NHaUPGRzy4w5EhmKbfEEHlhJ3uiIwQtM9DC1uvyTdHmOzz0Qy37CHYGN8yB4dh_4nSLKx4E9p0d21qA"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full animate-ping bg-[#00E599]/20 border border-[#00E599]/40 pointer-events-none" />
                </div>

                {/* Borderless Waveform */}
                <div className="flex items-center justify-center gap-1.5 h-8 w-64">
                  {[4, 8, 14, 22, 28, 18, 10, 15, 24, 30, 16, 9, 14, 20, 12, 6].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#00E599] rounded-full animate-pulse"
                      style={{
                        height: `${h}px`,
                        animationDelay: `${i * 0.06}s`
                      }}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00E599]/20 bg-[#00E599]/10 text-[10px] font-mono font-bold text-[#00E599]">
                  <Volume2 size={11} className="animate-pulse" />
                  <span>AI INTERVIEWER SPEAKING</span>
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-500 text-left border-t border-gray-800 pt-2">
                Real-time voice dialogue session
              </div>
            </div>

            {/* STEP 4 VISUAL: Review Detailed Feedback */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-zinc-950 ${
                activeStep === 3
                  ? 'opacity-100 translate-y-0 scale-100 border-[#00E599]/40 shadow-[0_0_30px_rgba(0,229,153,0.15)]'
                  : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-mono font-bold text-[#00E599] flex items-center gap-2">
                  <BarChart3 size={14} /> STEP 04: DETAILED FEEDBACK
                </span>
                <span className="text-xs font-bold text-[#00E599] bg-[#00E599]/10 px-2.5 py-0.5 rounded-full border border-[#00E599]/30">
                  SCORE: 92/100
                </span>
              </div>

              <div className="space-y-2.5 text-left">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-300 font-semibold">
                    <span>Technical Accuracy</span>
                    <span className="text-[#00E599]">94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-[#00E599] w-[94%]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-300 font-semibold">
                    <span>Communication Clarity</span>
                    <span className="text-blue-400">90%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[90%]" />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-black border border-white/5 text-[11px] text-gray-400">
                  <span className="text-[#00E599] font-bold">Feedback Summary:</span> Clear verbal walk-through of time complexity. Practice stating edge cases prior to implementation.
                </div>
              </div>

              <div className="text-[10px] font-mono text-gray-500 text-left border-t border-white/5 pt-2">
                Scored metrics, AI feedback summary, and full transcripts
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
