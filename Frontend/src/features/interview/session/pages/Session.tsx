import RoomHeader from '../components/SessionHeader';
import AIAvatar from '../components/AIAvatar';
import AudioVisualizer from '../components/AudioVisualizer';
import TranscriptArea from '../components/TranscriptArea';
import RoomControls from '../components/SessionControls';
import CodeEditor from '../components/CodeEditor';
import { useParams } from 'react-router-dom';
import { SessionProvider } from '../context/SessionProvider';
import { useGetMetaData } from '../hooks/getMetadata';
import { RoundType } from '../types/session.types';
import { useState, useEffect } from 'react';
import { Terminal, MessageSquare } from 'lucide-react';

// The AI panel — avatar + visualizer + transcript + controls
function AiPanel() {
  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex-1 flex flex-col justify-center gap-4 items-center py-4 overflow-hidden">
        <AIAvatar />
        <AudioVisualizer />
        <TranscriptArea />
        <RoomControls />
      </div>
    </div>
  )
}

function RoomContent() {
  const { title, roundType, isPending } = useGetMetaData()
  const isCodingRound = roundType === RoundType.TECHNICAL_CODING

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [activeTab, setActiveTab] = useState<'editor' | 'assistant'>('assistant')

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className={`h-screen bg-[#0B0F19] text-white font-sans flex items-center justify-center overflow-hidden
      ${isMobile ? 'p-0' : 'p-4 md:p-6'}`}>

      <div className={`bg-[#111623] relative overflow-hidden shadow-2xl flex flex-col
        ${isMobile
          ? 'w-full h-full p-4 rounded-none border-none'
          : `border border-gray-800 rounded-2xl p-6 md:p-8 w-full
             ${isCodingRound
               ? 'max-w-[1600px] h-[calc(100vh-48px)]'
               : 'max-w-7xl h-[calc(100vh-48px)] max-h-[750px] justify-between'
             }`
        }`}>

        {/* Decorative gradients */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <RoomHeader title={title} titleLoading={isPending} />

        {isCodingRound ? (
          isMobile ? (
            /* ── Mobile/Tablet Coding Round Tabbed Layout ── */
            <div className="flex-1 flex flex-col min-h-0 mt-4 gap-4 overflow-hidden">
              {/* Tab Selector */}
              <div className="flex bg-[#0B0F19] border border-gray-800/80 rounded-lg p-1 shrink-0">
                <button
                  onClick={() => setActiveTab('assistant')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all rounded
                    ${activeTab === 'assistant'
                      ? 'text-white bg-[#1A2235] border border-gray-700 shadow-sm'
                      : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                  <MessageSquare size={14} />
                  <span>Assistant</span>
                </button>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold transition-all rounded
                    ${activeTab === 'editor'
                      ? 'text-white bg-[#1A2235] border border-gray-700 shadow-sm'
                      : 'text-gray-400 hover:text-gray-300'
                    }`}
                >
                  <Terminal size={14} />
                  <span>Code Editor</span>
                </button>
              </div>

              {/* Tab Panels */}
              <div className="flex-1 min-h-0 overflow-hidden relative flex flex-col">
                {activeTab === 'editor' ? (
                  <div className="w-full h-full overflow-hidden rounded-xl">
                    <CodeEditor />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col overflow-hidden">
                    <AiPanel />
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ── Desktop Two-panel layout for coding rounds ── */
            <div className="flex-1 flex gap-4 mt-4 overflow-hidden min-h-0">
              {/* Left: Code Editor */}
              <div className="flex-[55] min-w-0 overflow-hidden rounded-xl">
                <CodeEditor />
              </div>

              {/* Divider */}
              <div className="w-px bg-gray-800/60 shrink-0" />

              {/* Right: AI Panel */}
              <div className="flex-[45] min-w-0 flex flex-col overflow-hidden">
                <AiPanel />
              </div>
            </div>
          )
        ) : (
          /* ── Centered layout for non-coding rounds (adapts vertically) ── */
          <div className="flex-1 flex flex-col justify-center gap-6 lg:gap-8 items-center py-4 mt-4 overflow-hidden max-w-2xl mx-auto w-full">
            <AIAvatar />
            <AudioVisualizer />
            <TranscriptArea />
            <RoomControls />
          </div>
        )}
      </div>
    </div>
  )
}

export default function Room() {
  const { interviewId, sessionId } = useParams()
  const { roundType } = useGetMetaData()

  if (!interviewId || !sessionId) {
    return <div className="text-white p-6">Invalid session URL.</div>
  }

  return (
    <SessionProvider interviewId={interviewId} sessionId={sessionId} roundType={roundType ?? null}>
      <RoomContent />
    </SessionProvider>
  );
}

