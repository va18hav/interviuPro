import { useSession } from "../context/SessionContext";

export default function AIAvatar() {
  const { aiSpeaking, userSpeaking, isInitializing, generatingFeedback } = useSession();

  // Determine which visual state we are in:
  // 1. Initializing -> AI avatar + pulsing blue-gray ring + "Connecting" badge
  // 2. AI Speaking -> AI avatar + pulsing green ring + "AI is speaking" badge
  // 3. User Speaking -> User avatar + pulsing sky-blue ring + "Candidate speaking" badge
  // 4. Listening (Idle) -> User avatar (plain) + no rings + no badge
  // 5. Generating Feedback -> AI avatar + no rings + no badge

  const isUserAvatar = userSpeaking || (!isInitializing && !aiSpeaking && !generatingFeedback);

  let pulseRingClass = "";
  let badgeColor = "";
  let dotColor = "";
  let statusText = "";

  if (generatingFeedback) {
    // Static AI avatar, no rings, no badge
  } else if (isInitializing) {
    pulseRingClass = "absolute inset-0 rounded-full animate-ping bg-[#38BDF8]/5 border border-[#38BDF8]/20 z-0 pointer-events-none";
    badgeColor = "border-[#38BDF8]/20 text-[#38BDF8]";
    dotColor = "bg-[#38BDF8] animate-pulse";
    statusText = "Connecting";
  } else if (aiSpeaking) {
    pulseRingClass = "absolute inset-0 rounded-full animate-ping bg-[#00E599]/10 border border-[#00E599]/30 z-0 pointer-events-none";
    badgeColor = "border-[#00E599]/20 text-[#00E599]";
    dotColor = "bg-[#00E599] animate-pulse shadow-[0_0_8px_rgba(0,229,153,0.8)]";
    statusText = "AI is speaking";
  } else if (userSpeaking) {
    pulseRingClass = "absolute inset-0 rounded-full animate-ping bg-[#38BDF8]/10 border border-[#38BDF8]/30 z-0 pointer-events-none";
    badgeColor = "border-[#38BDF8]/20 text-[#38BDF8]";
    dotColor = "bg-[#38BDF8] animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]";
    statusText = "Candidate speaking";
  }

  const showBadge = statusText !== "";
  const showPulse = pulseRingClass !== "";

  return (
    <div className="flex flex-col items-center justify-center mb-2">
      {/* Orb Wrapper with Outer Glowing Ring */}
      <div className={`relative ${showBadge ? 'mb-4' : 'mb-0'}`}>
        {isUserAvatar ? (
          // Candidate Avatar (3D metallic sphere with sky-blue veins)
          <div className="w-[80px] h-[80px] rounded-full bg-slate-800/40 border border-gray-800 overflow-hidden relative z-10">
            <img
              alt="Candidate Avatar"
              className="w-full h-full object-cover opacity-85 hue-rotate-[150deg] saturate-[1.8] brightness-[1.05]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6BAvlA2rgvPzK2ZBqWZi0QxWAq-Qs9gbU7bpuhGb5ULCSvvcemeQLey7iliwnXMnaYWGCkqnlbDnrbwkqLC6khaW17G11ytuQdC1WfYtHgclSr4FwzvijhhWlxI-Fkks2kcGqjbgTzk4RiVOSbf9NvGelD4lZcYH6LhBPaMa0QnAR9iW1zy0H0XacFJ6NHaUPGRzy4w5EhmKbfEEHlhJ3uiIwQtM9DC1uvyTdHmOzz0Qy37CHYGN8yB4dh_4nSLKx4E9p0d21qA"
            />
          </div>
        ) : (
          // AI Avatar
          <div className="w-[80px] h-[80px] rounded-full bg-slate-800/40 border border-gray-800 overflow-hidden relative z-10">
            <img
              alt="AI Avatar"
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh6BAvlA2rgvPzK2ZBqWZi0QxWAq-Qs9gbU7bpuhGb5ULCSvvcemeQLey7iliwnXMnaYWGCkqnlbDnrbwkqLC6khaW17G11ytuQdC1WfYtHgclSr4FwzvijhhWlxI-Fkks2kcGqjbgTzk4RiVOSbf9NvGelD4lZcYH6LhBPaMa0QnAR9iW1zy0H0XacFJ6NHaUPGRzy4w5EhmKbfEEHlhJ3uiIwQtM9DC1uvyTdHmOzz0Qy37CHYGN8yB4dh_4nSLKx4E9p0d21qA"
            />
          </div>
        )}

        {/* Pulsing Glow Ring */}
        {showPulse && <div className={pulseRingClass} />}
      </div>

      {/* Pill Status Badge */}
      {showBadge && (
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#0B0F19] text-[10px] font-extrabold tracking-widest uppercase select-none shadow-sm transition-all duration-300 ${badgeColor}`}>
          <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${dotColor}`} />
          <span>{statusText}</span>
        </div>
      )}
    </div>
  );
}
