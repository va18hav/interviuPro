import { MicOff } from 'lucide-react';

interface RoomControlsProps {
  onInterrupt?: () => void;
  onAbandon?: () => void;
}

export default function RoomControls({
  onInterrupt,
  onAbandon
}: RoomControlsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4 pb-2">
      {/* Interrupt Button */}
      <button
        onClick={onInterrupt}
        className="flex items-center justify-center gap-2.5 px-8 py-3 rounded-md border border-gray-700/60 hover:border-gray-600 bg-gray-900/40 hover:bg-gray-900/80 text-gray-300 hover:text-white text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-sm"
      >
        <MicOff size={14} className="text-[#00E599]" />
        <span>Interrupt</span>
      </button>

      {/* Abandon Session Button */}
      <button
        onClick={onAbandon}
        className="text-[10px] font-black tracking-wider text-gray-500 hover:text-rose-400 transition-colors uppercase underline-offset-4 hover:underline"
      >
        Abandon Session
      </button>
    </div>
  );
}
