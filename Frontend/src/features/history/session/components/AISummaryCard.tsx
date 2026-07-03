import { Sparkles } from 'lucide-react';
import { SessionData } from '../../session/types/session.types';

interface AISummaryCardProps {
  sessionData: SessionData
}

export default function AISummaryCard(
  { sessionData }: AISummaryCardProps) {
  return (
    <div className="bg-[#111623] border border-gray-800 rounded-xl overflow-y-auto no-scrollbar p-6 flex flex-col justify-start h-[240px] shadow-sm">
      {/* Title with Icon */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-[#00E599]" />
        <span className="text-[20px] font-bold text-gray-500 uppercase tracking-widest">
          AI Summary
        </span>
      </div>

      {/* Summary Paragraph */}
      <p className="text-[16px] text-gray-300 leading-relaxed font-normal">
        {sessionData.feedback.summary}
      </p>
    </div>
  );
}
