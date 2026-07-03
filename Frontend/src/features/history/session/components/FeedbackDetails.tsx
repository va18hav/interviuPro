import { CheckCircle, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { SessionData } from '../../session/types/session.types';

interface FeedbackSectionProps {
  sessionData: SessionData
}

export default function FeedbackDetails({
  sessionData
}: FeedbackSectionProps) {
  if (!sessionData.feedback) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
      {/* Strengths Card */}
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-5 flex flex-col max-h-[300px] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={14} className="text-[#00E599]" />
          <span className="text-[20px] font-bold text-gray-500 uppercase tracking-widest">
            Strengths
          </span>
        </div>
        <ul className="overflow-y-auto no-scrollbar space-y-4 flex-1">
          {sessionData.feedback.strengths.map((item, idx) => (
            <li key={idx} className="flex gap-2.5 items-start">
              <span className="text-[#00E599] text-[10px] select-none mt-1">▶</span>
              <p className="text-[15px] text-gray-300 leading-relaxed font-normal">{item}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Focus Areas Card */}
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-5 flex flex-col max-h-[300px] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={14} className="text-rose-500" />
          <span className="text-[20px] font-bold text-gray-500 uppercase tracking-widest">
            Focus Areas
          </span>
        </div>
        <div className="space-y-4 flex-1 overflow-y-auto no-scrollbar max-h-[300px] pr-1">
          {sessionData.feedback.focusAreas.map((area, idx) => {
            return (
              <div key={idx} className="space-y-2 border-b border-gray-800/50 pb-3 last:border-0 last:pb-0">
                <h4 className="text-[15px] font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                  {area.topic}
                </h4>
                {area.whatWentWrong && (
                  <p className="text-[15px] text-rose-300/80 leading-relaxed pl-3 font-normal">
                    <span className="font-semibold text-rose-400">Issue:</span> {area.whatWentWrong}
                  </p>
                )}
                {area.whatToStudy && area.whatToStudy.length > 0 && (
                  <div className="pl-3 space-y-1">
                    <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider block">Recommended Study:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {area.whatToStudy.map((study, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded bg-gray-800/80 border border-gray-700/50 text-[10px] text-gray-300 font-medium">
                          {study}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Next Steps Card */}
      <div className="bg-[#111623] border border-gray-800 rounded-xl p-5 flex flex-col max-h-[300px] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight size={14} className="text-emerald-400" />
          <span className="text-[20px] font-bold text-gray-500 uppercase tracking-widest">
            Next Steps
          </span>
        </div>
        <ul className="no-scrollbar overflow-y-auto space-y-4 flex-1">
          {sessionData.feedback.nextStep.map((item, idx) => (
            <li key={idx} className="flex gap-2.5 items-start">
              <Sparkles size={12} className="text-[#00E599] mt-1 shrink-0" />
              <p className="text-[15px] text-gray-300 leading-relaxed font-normal">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
