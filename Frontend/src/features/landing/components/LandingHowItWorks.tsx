import { useEffect, useRef, useState } from 'react';
import { Mic, Code, BarChart3, Settings, Layers, Volume2 } from 'lucide-react';

interface ProgressCircleProps {
  num: string;
  progress: number;
  isActive: boolean;
}

function ProgressCircle({ num, progress, isActive }: ProgressCircleProps) {
  const radius = 14;
  const halfCircumference = Math.PI * radius; // ~43.98
  const strokeDashoffset = halfCircumference - (halfCircumference * progress) / 100;

  return (
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      {/* SVG Ring */}
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 32 32">
        {/* Background track circle */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth="2"
        />
        {/* Symmetrical active progress (right half, clockwise) */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke={isActive || progress > 0 ? "white" : "transparent"}
          strokeWidth="2"
          strokeDasharray={`${halfCircumference} ${2 * halfCircumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: '16px 16px',
            transition: 'stroke-dashoffset 0.05s linear'
          }}
        />
        {/* Symmetrical active progress (left half, counter-clockwise) */}
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke={isActive || progress > 0 ? "white" : "transparent"}
          strokeWidth="2"
          strokeDasharray={`${halfCircumference} ${2 * halfCircumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transform: 'scaleX(-1) rotate(-90deg)',
            transformOrigin: '16px 16px',
            transition: 'stroke-dashoffset 0.05s linear'
          }}
        />
      </svg>
      {/* Step Number */}
      <span className={`text-xs font-mono font-bold relative z-10 transition-colors ${isActive || progress > 0 ? 'text-white' : 'text-gray-500'}`}>
        {num}
      </span>
    </div>
  );
}

export default function LandingHowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalScrollable = rect.height - viewportHeight;
      if (totalScrollable <= 0) return;

      // scrollProgress goes from 0 (top of section hits viewport top) to 1 (bottom of section hits viewport bottom)
      const progress = -rect.top / totalScrollable;
      const clamped = Math.max(0, Math.min(1, progress));
      setScrollProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const getCircleProgress = (idx: number) => {
    const start = (2 * idx) / 7;
    const end = (2 * idx + 1) / 7;
    if (scrollProgress <= start) return 0;
    if (scrollProgress >= end) return 100;
    return Math.round(((scrollProgress - start) / (end - start)) * 100);
  };

  const getLineProgress = (idx: number) => {
    const start = (2 * idx + 1) / 7;
    const end = (2 * idx + 2) / 7;
    if (scrollProgress <= start) return 0;
    if (scrollProgress >= end) return 100;
    return Math.round(((scrollProgress - start) / (end - start)) * 100);
  };

  const getActiveStepIndex = () => {
    if (scrollProgress >= 1) return 3;
    const segment = Math.floor(scrollProgress / (1 / 7));
    if (segment <= 1) return 0;
    if (segment <= 3) return 1;
    if (segment <= 5) return 2;
    return 3;
  };

  const activeStep = getActiveStepIndex();

  const steps = [
    {
      num: '1',
      title: 'Create an interview',
      desc: 'Enter your target role, title, experience level, and paste any job description to customize your interview setup.'
    },
    {
      num: '2',
      title: 'Choose a session type',
      desc: 'Select between Coding, System Design, or Behavioral STAR interview rounds depending on your practice goal.'
    },
    {
      num: '3',
      title: 'Interview live with AI',
      desc: 'Speak directly into your mic while the AI interviewer leads the session in real time.'
    },
    {
      num: '4',
      title: 'Review detailed feedback',
      desc: 'Get an instant performance scorecard with quantitative depth ratings, actionable tips, and full session transcripts.'
    }
  ];

  return (
    <div
      ref={containerRef}
      id="how-it-works"
      className="relative bg-black border-t border-white/5 h-[300vh]"
    >
      {/* Sticky Content Container locked to viewport height */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 overflow-hidden">

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">

          {/* Left Column: Title & Scroll Progress Steps */}
          <div className="lg:col-span-5 space-y-10 text-left">
            {/* Header */}
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight">
                How it <span className="text-[#00E599]">works</span>
              </h2>
            </div>

            {/* List of 4 progress steps */}
            <div className="space-y-0 pt-2 relative">
              {steps.map((s, idx) => {
                const isActive = activeStep === idx;
                const progress = getCircleProgress(idx);
                const lineProgress = getLineProgress(idx);
                const isLast = idx === steps.length - 1;

                return (
                  <div
                    key={idx}
                    className={`transition-all duration-300 flex items-start gap-4 relative z-10 pb-10 ${isActive ? 'opacity-100' : 'opacity-30'
                      }`}
                  >
                    {/* Vertical Connector Line - edge-to-edge alignment */}
                    {!isLast && (
                      <div className="absolute top-[33px] bottom-0 left-[15px] w-[2px] bg-transparent z-0 pointer-events-none">
                        <div
                          className="w-full bg-white transition-all duration-75"
                          style={{ height: `${lineProgress}%` }}
                        />
                      </div>
                    )}

                    <ProgressCircle
                      num={s.num}
                      progress={progress}
                      isActive={isActive}
                    />

                    <div className="space-y-1 pt-0.5 relative z-10">
                      <h3 className={`text-sm md:text-base font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {s.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 font-normal leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Card Panel */}
          <div className="hidden lg:block lg:col-span-7 h-[380px] rounded-2xl border border-white/10 bg-[#09090b] p-6 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] relative">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* STEP 1 VISUAL */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-zinc-950 ${activeStep === 0
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

            {/* STEP 2 VISUAL */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-zinc-950 ${activeStep === 1
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

            {/* STEP 3 VISUAL */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-[#0B0F19] ${activeStep === 2
                ? 'opacity-100 translate-y-0 scale-100 border-[#00E599]/40 shadow-[0_0_30px_rgba(0,229,153,0.1)]'
                : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
                }`}
            >
              <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <span className="text-xs font-mono font-bold text-[#00E599] flex items-center gap-2">
                  <Mic size={14} /> STEP 03: LIVE VOICE SESSION
                </span>
                <span className="text-[10px] font-mono text-[#00E599] flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" /> LIVE
                </span>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4 py-4 my-auto">
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

            {/* STEP 4 VISUAL */}
            <div
              className={`absolute inset-6 transition-all duration-500 ease-out flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-zinc-950 ${activeStep === 3
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
    </div>
  );
}
