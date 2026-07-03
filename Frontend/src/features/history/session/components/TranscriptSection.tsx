import { AlertCircle, Bot, CircleArrowDown, CircleArrowUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useSessionTranscript } from '../hooks/sessionDataHook';
import { SessionTranscriptData } from '../../session/types/session.types';

export default function TranscriptSection() {

  const [showTranscript, setShowTranscript] = useState(false)
  const { transcript, isError, isLoading }
    : { transcript: SessionTranscriptData, isError: boolean, isLoading: boolean } = useSessionTranscript(showTranscript)
  return (
    <div className="w-full space-y-4">
      {/* Heading */}
      <div className='flex items-center justify-between'>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Transcript
        </h2>
        {showTranscript
          ? <CircleArrowUp
            onClick={() => { setShowTranscript(prev => !prev) }}
          />
          : <CircleArrowDown
            onClick={() => { setShowTranscript(prev => !prev) }}
          />}
      </div>

      {/* Thin line divider */}
      <div className="w-full h-px bg-gray-800/80 mb-6" />
      {isLoading && (
        <div className="flex items-center justify-center py-8 gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm font-mono">Loading transcript...</span>
        </div>
      )}
      {isError && (
        <div className="flex flex-col items-center justify-center py-8 gap-2 text-red-400">
          <AlertCircle size={20} />
          <p className="text-xs font-mono">Failed to load transcript data.</p>
        </div>
      )}

      {/* Dialogues list */}
      {showTranscript && transcript && <div className="space-y-6">
        {transcript.map((item, idx) => {
          const isAI = item.role === 'assistant';
          console.log(transcript)
          return (
            <div
              key={idx}
              className={`flex flex-col ${isAI ? 'items-start' : 'items-end'} w-full gap-2`}
            >
              {/* Header: Avatar + Sender Name */}
              <div className={`flex items-center gap-2.5 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Avatar */}
                {isAI ? (
                  <div className="w-6 h-6 rounded-full bg-[#111623] border border-gray-800 flex items-center justify-center shrink-0">
                    <Bot size={13} className="text-[#00E599]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#00E599]/15 border border-[#00E599]/30 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#00E599]">U</span>
                  </div>
                )}

                {/* Name */}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] md:max-w-[75%] p-4 rounded-xl text-[15px] leading-relaxed border ${isAI
                  ? 'bg-[#111623] border-gray-800 text-gray-300 rounded-tl-none'
                  : 'bg-[#132237]/80 border-[#223854] text-gray-200 rounded-tr-none'
                  }`}
              >
                <p className="font-normal">{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
}
