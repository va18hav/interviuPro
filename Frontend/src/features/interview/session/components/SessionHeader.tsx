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
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between border-b border-gray-800 pb-3">
      {/* Row 1: Logo + Timer + End button */}
      <div className="flex items-center justify-between w-full">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2 select-none font-inter">
          <img src="/logo.png" alt="Interviu Logo" className="h-7 w-auto" />
          <span className="text-xl font-extrabold tracking-tight text-white">
            interv<span className="text-[#00E599]">i</span>u
          </span>
        </div>

        {/* Right: Timer + End Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Timer Box */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#00E599]/30 bg-[#00E599]/5 text-xs font-bold text-[#00E599]">
            <Timer size={13} className="animate-spin-slow" />
            <span className="font-mono tracking-wider">{formatTime(remainingSeconds)}</span>
          </div>

          {/* End Interview Button */}
          {!generatingFeedback && (
            <button
              onClick={endSession}
              className="px-3 py-1.5 rounded-md border border-rose-500/40 hover:border-rose-500/80 bg-rose-500/5 hover:bg-rose-500/10 text-[10px] font-black tracking-widest text-rose-400 hover:text-rose-300 uppercase transition-all whitespace-nowrap">
              End Interview
            </button>
          )}
        </div>
      </div>

      {/* Row 2: Interview title (mobile only; inline on desktop) */}
      <h2 className="text-xs font-semibold tracking-wider text-[#00E599] uppercase lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        {titleLoading ? 'loading...' : title}
      </h2>
    </div>
  );
}
