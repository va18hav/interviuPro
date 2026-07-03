import { useSession } from "../context/SessionContext";

export default function AudioVisualizer() {
  const barCount = 45;
  const { aiSpeaking, userSpeaking, generatingFeedback } = useSession()
  if (generatingFeedback) return null;

  const isActive = aiSpeaking || userSpeaking;
  const waveColor = aiSpeaking ? 'bg-[#00E599]' : userSpeaking ? 'bg-[#38BDF8]' : 'bg-gray-800';

  return (
    <div className={`w-full max-w-2xl mx-auto flex items-center justify-center gap-1 relative select-none transition-all duration-500 ${isActive ? 'h-16 mb-2' : 'h-6 mb-0'}`}>
      {/* Self-contained keyframe animations for the GPU-accelerated wave effect */}
      <style>{`
        @keyframes wave-pulse {
          0%, 100% {
            transform: scaleY(0.12);
            opacity: 0.35;
          }
          50% {
            transform: scaleY(1.0);
            opacity: 1;
          }
        }
        .animate-bar {
          animation: wave-pulse 1.2s ease-in-out infinite;
          transform-origin: center;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Edge fading overlays to blend the wave edges into the card container */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#111623] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#111623] to-transparent pointer-events-none z-10" />

      {/* The Waveform */}
      <div className="flex items-center justify-center gap-1.5 h-full w-full px-8">
        {Array.from({ length: barCount }).map((_, i) => {
          // Shape envelope: middle bars are taller, outer bars are shorter
          const mid = barCount / 2;
          const distFromMid = Math.abs(i - mid);
          const maxScale = Math.max(0.15, 1.0 - (distFromMid / mid) * 0.75);

          // Custom organic delay and duration variations
          const delay = (Math.sin(i * 0.35) * 0.6).toFixed(2);
          const duration = (0.9 + Math.cos(i * 0.25) * 0.3).toFixed(2);

          return (
            <div
              key={i}
              className={`w-1 ${waveColor} rounded-full ${isActive ? 'animate-bar' : ''}`}
              style={{
                height: `${maxScale * 60}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                transform: isActive ? undefined : 'scaleY(0.08)',
                opacity: isActive ? undefined : 0.15,
                transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, background-color 0.5s ease-in-out'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
