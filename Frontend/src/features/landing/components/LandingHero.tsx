import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LandingHero() {
  const [isPlaying, setIsPlaying] = useState(true);

  // Exact waveform bar logic from session AudioVisualizer.tsx
  const barCount = 35;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-10 px-6 bg-black text-center font-sans select-none overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#00E599]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
        
        {/* Session Page AI Avatar & Waveform Unit */}
        <div className="flex flex-col items-center justify-center my-1 cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
          
          {/* 1. Session Page AI Avatar */}
          <div className="relative mb-3 group">
            <div className="w-16 h-16 rounded-full bg-slate-800/40 border border-gray-800 overflow-hidden relative z-10 shadow-[0_0_20px_rgba(0,229,153,0.15)] group-hover:scale-105 transition-transform duration-300">
              <img
                alt="AI Avatar"
                className="w-full h-full object-cover opacity-85 mix-blend-luminosity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6BAvlA2rgvPzK2ZBqWZi0QxWAq-Qs9gbU7bpuhGb5ULCSvvcemeQLey7iliwnXMnaYWGCkqnlbDnrbwkqLC6khaW17G11ytuQdC1WfYtHgclSr4FwzvijhhWlxI-Fkks2kcGqjbgTzk4RiVOSbf9NvGelD4lZcYH6LhBPaMa0QnAR9iW1zy0H0XacFJ6NHaUPGRzy4w5EhmKbfEEHlhJ3uiIwQtM9DC1uvyTdHmOzz0Qy37CHYGN8yB4dh_4nSLKx4E9p0d21qA"
              />
            </div>
            {/* Glowing ring when active */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full animate-ping bg-[#00E599]/10 border border-[#00E599]/30 z-0 pointer-events-none" />
            )}
          </div>

          {/* 2. Borderless AudioVisualizer Waveform */}
          <div className="w-72 sm:w-80 h-14 flex items-center justify-center gap-1 relative overflow-hidden px-4">
            <style>{`
              @keyframes hero-wave-pulse {
                0%, 100% {
                  transform: scaleY(0.15);
                  opacity: 0.4;
                }
                50% {
                  transform: scaleY(1.0);
                  opacity: 1;
                }
              }
              .animate-hero-bar {
                animation: hero-wave-pulse 1.2s ease-in-out infinite;
                transform-origin: center;
                will-change: transform, opacity;
              }
            `}</style>

            {/* Edge fading overlays */}
            <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />

            {/* The Waveform Bars */}
            <div className="flex items-center justify-center gap-1.5 h-full w-full">
              {Array.from({ length: barCount }).map((_, i) => {
                const mid = barCount / 2;
                const distFromMid = Math.abs(i - mid);
                const maxScale = Math.max(0.2, 1.0 - (distFromMid / mid) * 0.7);
                const delay = (Math.sin(i * 0.35) * 0.6).toFixed(2);
                const duration = (0.9 + Math.cos(i * 0.25) * 0.3).toFixed(2);

                return (
                  <div
                    key={i}
                    className={`w-1 bg-[#00E599] rounded-full ${isPlaying ? 'animate-hero-bar' : ''}`}
                    style={{
                      height: `${maxScale * 36}px`,
                      animationDelay: `${delay}s`,
                      animationDuration: `${duration}s`,
                      transform: isPlaying ? undefined : 'scaleY(0.1)',
                      opacity: isPlaying ? undefined : 0.2,
                      transition: 'transform 0.4s ease, opacity 0.4s ease'
                    }}
                  />
                );
              })}
            </div>
          </div>

        </div>

        {/* Hero Title & Subtext (Significantly smaller, matching LiveKit typography) */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-[1.15]">
            Practice coding, system design, and behavioral interviews <span className="text-[#00E599] font-normal">out loud</span>
          </h1>

          <p className="text-gray-400 text-xs sm:text-sm font-normal max-w-lg mx-auto leading-relaxed">
            Interviu is an AI mock interviewer that listens to your verbal explanations, reviews your code live, and gives actionable feedback.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-2">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00E599] hover:bg-[#00c985] text-black font-bold text-xs sm:text-sm rounded-lg transition-all shadow-[0_0_20px_rgba(0,229,153,0.2)] hover:shadow-[0_0_25px_rgba(0,229,153,0.35)] w-full sm:w-auto hover:-translate-y-0.5 duration-200"
          >
            <span>Start practice free</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#features"
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg border border-white/10 hover:border-white/20 bg-zinc-950/60 hover:bg-zinc-900 text-white font-semibold text-xs sm:text-sm transition-all w-full sm:w-auto hover:-translate-y-0.5 duration-200"
          >
            <span>Explore features</span>
          </a>
        </div>

      </div>
    </section>
  );
}
