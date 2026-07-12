import { Sparkles } from 'lucide-react';
import { SessionData } from '../../session/types/session.types';

interface AISummaryCardProps {
  sessionData: SessionData
}

export default function AISummaryCard({ sessionData }: AISummaryCardProps) {
  return (
    <div className="bg-[#111623] border border-gray-800/80 rounded-xl p-6 flex flex-col justify-start h-[280px] shadow-lg relative overflow-hidden group hover:border-gray-700/60 transition-all duration-300">
      {/* Glow background effect */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/8 transition-all duration-300" />
      
      {/* Title with Icon */}
      <div className="flex items-center gap-2 mb-4 shrink-0">
        <Sparkles size={14} className="text-[#00E599]" />
        <span className="text-[12px] font-extrabold text-gray-500 uppercase tracking-widest">
          AI Summary
        </span>
      </div>

      {/* Summary Paragraph */}
      <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
        <p className="text-[15px] text-gray-300 leading-relaxed font-normal">
          {sessionData.feedback.summary}
        </p>
      </div>
    </div>
  );
}

