import { CheckCircle, AlertTriangle, ArrowRight, Sparkles, Bookmark } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
      {/* Left Column - Strengths & Next Steps */}
      <div className="lg:col-span-7 flex flex-col gap-6 w-full">
        {/* Strengths Card */}
        <div className="bg-[#111623] border border-gray-800/80 rounded-xl p-6 shadow-md relative overflow-hidden group hover:border-gray-700/60 transition-all duration-300">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/8 transition-all duration-300" />
          
          <div className="flex items-center gap-2.5 mb-5 shrink-0 border-b border-gray-800/80 pb-3">
            <CheckCircle size={16} className="text-[#00E599]" />
            <span className="text-[12px] font-extrabold text-[#00E599] uppercase tracking-widest">
              Strengths & Highlights
            </span>
          </div>
          
          <ul className="space-y-4">
            {sessionData.feedback.strengths.map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start group/item">
                <span className="text-[#00E599] text-[12px] select-none mt-0.5 transform group-hover/item:translate-x-1 transition-transform duration-200">▶</span>
                <p className="text-[14px] text-gray-300 leading-relaxed font-normal">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps Card */}
        <div className="bg-[#111623] border border-gray-800/80 rounded-xl p-6 shadow-md relative overflow-hidden group hover:border-gray-700/60 transition-all duration-300">
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/8 transition-all duration-300" />
          
          <div className="flex items-center gap-2.5 mb-5 shrink-0 border-b border-gray-800/80 pb-3">
            <ArrowRight size={16} className="text-emerald-400" />
            <span className="text-[12px] font-extrabold text-emerald-400 uppercase tracking-widest">
              Actionable Next Steps
            </span>
          </div>
          
          <ul className="space-y-4">
            {sessionData.feedback.nextStep.map((item, idx) => (
              <li key={idx} className="flex gap-3 items-start group/item">
                <div className="w-4 h-4 rounded border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center mt-0.5 shrink-0 group-hover/item:border-emerald-500/60 transition-colors duration-200">
                  <Sparkles size={8} className="text-[#00E599]" />
                </div>
                <p className="text-[14px] text-gray-300 leading-relaxed font-normal">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column - Focus Areas */}
      <div className="lg:col-span-5 w-full">
        <div className="bg-[#111623] border border-gray-800/80 rounded-xl p-6 shadow-md relative overflow-hidden group hover:border-gray-700/60 transition-all duration-300 flex flex-col">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/8 transition-all duration-300" />
          
          <div className="flex items-center gap-2.5 mb-5 shrink-0 border-b border-gray-800/80 pb-3">
            <AlertTriangle size={16} className="text-rose-400" />
            <span className="text-[12px] font-extrabold text-rose-400 uppercase tracking-widest">
              Focus Areas & Recommendations
            </span>
          </div>
          
          <div className="space-y-4 flex-1">
            {sessionData.feedback.focusAreas.map((area, idx) => {
              return (
                <div key={idx} className="space-y-3 bg-[#131929]/50 border border-gray-800/50 rounded-lg p-4 group/box hover:bg-[#131929]/80 transition-colors duration-200">
                  <h4 className="text-[15px] font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 shadow-sm" />
                    {area.topic}
                  </h4>
                  
                  {area.whatWentWrong && (
                    <div className="bg-rose-950/10 border-l-2 border-rose-500/50 p-2.5 rounded-r text-[13px] text-rose-200/90 leading-relaxed">
                      <span className="font-bold text-rose-400 text-[10px] uppercase tracking-wider block mb-0.5">Where you struggled:</span>
                      {area.whatWentWrong}
                    </div>
                  )}
                  
                  {area.whatToStudy && area.whatToStudy.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                        <Bookmark size={10} /> Recommended to Study:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {area.whatToStudy.map((study, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-gray-900 border border-gray-800 text-[10px] text-gray-300 font-medium hover:border-gray-700 transition-colors duration-200">
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
      </div>
    </div>
  );
}

