interface AIAvatarProps {
  statusText?: string;
  isSpeaking?: boolean;
}

export default function AIAvatar({ 
  statusText = "AI IS SPEAKING", 
  isSpeaking = true 
}: AIAvatarProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-2">
      {/* Orb Wrapper with Outer Glowing Ring */}
      <div className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 ${
        isSpeaking 
          ? 'shadow-[0_0_50px_rgba(0,229,153,0.3)] border-2 border-[#00E599]' 
          : 'shadow-[0_0_20px_rgba(74,81,102,0.15)] border-2 border-gray-700'
      }`}>
        
        {/* Glowing Pulse Aura (rendered behind orb) */}
        {isSpeaking && (
          <div className="absolute inset-0 rounded-full bg-[#00E599]/10 animate-ping" />
        )}
        
        {/* The Glassmorphic 3D Metallic Orb */}
        <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] border border-white/10 flex items-center justify-center">
          
          {/* Internal diagonal specular highlight */}
          <div className="absolute top-1 left-2 w-12 h-6 bg-gradient-to-b from-white/20 to-transparent rounded-full rotate-[-25deg] blur-[1px]" />
          
          {/* Inner radial gradient shadow for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,transparent_50%,rgba(0,0,0,0.8)_95%)]" />
          
          {/* Futuristic subtle glowing core lines */}
          <div className={`absolute w-[80%] h-[80%] rounded-full border border-[#00E599]/20 transition-transform duration-[10s] linear infinite ${isSpeaking ? 'animate-spin' : ''}`} />
          <div className={`absolute w-[60%] h-[60%] rounded-full border border-dashed border-[#00E599]/10 transition-transform duration-[15s] linear infinite ${isSpeaking ? 'animate-spin-reverse' : ''}`} />
          
          {/* Centered dark reflection core */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-black to-slate-900 shadow-inner flex items-center justify-center">
            <span className="text-[#00E599]/40 text-[10px] font-black tracking-widest uppercase">AI</span>
          </div>
        </div>
      </div>

      {/* Pill Badge */}
      <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-800 bg-[#0B0F19] text-[10px] font-extrabold tracking-widest text-[#00E599] uppercase select-none shadow-sm">
        <span className={`w-1.5 h-1.5 rounded-full bg-[#00E599] ${isSpeaking ? 'animate-pulse' : 'opacity-60'}`} />
        <span>{statusText}</span>
      </div>
    </div>
  );
}
