import { Mic, MicOff } from 'lucide-react';
import { useSession } from '../context/SessionContext';

export default function RoomControls() {

  const { micON, toggleMic, abandonSession, generatingFeedback } = useSession()
  const Icon = micON ? Mic : MicOff

  if (generatingFeedback) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 mt-4 pb-2 text-[#00E599]">
        <span className="text-xs font-bold tracking-widest uppercase animate-pulse">
          Analyzing interview performance...
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4 pb-2">
      {/* Interrupt Button */}
      <button
        onClick={toggleMic}
        className="flex items-center justify-center gap-2.5 px-8 py-3 rounded-md border border-gray-700/60 hover:border-gray-600 bg-gray-900/40 hover:bg-gray-900/80 text-gray-300 hover:text-white text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-sm"
      >
        <Icon size={14} className={`${micON ? 'text-[#00E599]' : 'text-red-400'}`} />
        <span>Mic</span>
      </button>

      {/* Abandon Session Button */}
      <button
        onClick={abandonSession}
        className="text-[10px] font-black tracking-wider text-gray-500 hover:text-rose-400 transition-colors uppercase underline-offset-4 hover:underline"
      >
        Abandon Session
      </button>
    </div>
  );
}
