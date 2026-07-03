import { Timer } from 'lucide-react';
import { useSession } from '../context/SessionContext';

interface RoomHeaderProps {
  title: string
  titleLoading: boolean
}

export default function RoomHeader({ title, titleLoading }: RoomHeaderProps) {

  const { endSession, remainingSeconds, generatingFeedback } = useSession()

  const formatTime = (seconds: number | null) => {
    if (seconds === null || seconds === undefined) return '--:--'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-800 pb-4">
      {/* Left: Brand Logo */}
      <div className="flex items-center gap-1.5 select-none font-inter">
        <span className="text-xl font-extrabold tracking-tight text-white">
          interviu
        </span>
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
      </div>
      {/* Center: Interview Type */}
      <h2 className="text-sm font-semibold tracking-wider text-[#00E599] uppercase">
        {titleLoading ? 'loading...' : title}
      </h2>

      {/* Right: Status and End Button */}
      <div className="flex items-center gap-4">
        {/* Timer Box */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#00E599]/30 bg-[#00E599]/5 text-xs font-bold text-[#00E599]">
          <Timer size={14} className="animate-spin-slow" />
          <span className="font-mono tracking-wider">{formatTime(remainingSeconds)}</span>
        </div>

        {/* End Interview Button */}
        {!generatingFeedback && (
          <button
            onClick={endSession}
            className="px-4 py-1.5 rounded-md border border-rose-500/40 hover:border-rose-500/80 bg-rose-500/5 hover:bg-rose-500/10 text-[10px] font-black tracking-widest text-rose-400 hover:text-rose-300 uppercase transition-all">
            End Interview
          </button>
        )}
      </div>
    </div>
  );
}
