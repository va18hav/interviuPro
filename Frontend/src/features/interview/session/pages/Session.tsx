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

// The AI panel — avatar + visualizer + transcript + controls
function AiPanel() {
  return (
    <div className="flex flex-col justify-between h-full">
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

  return (
    <div className="h-screen bg-[#0B0F19] text-white font-sans p-4 md:p-6 flex items-center justify-center overflow-hidden">
      <div className={`bg-[#111623] border border-gray-800 rounded-2xl p-6 md:p-8 w-full shadow-2xl relative overflow-hidden
        ${isCodingRound
          ? 'max-w-[1600px] h-[calc(100vh-48px)] flex flex-col'
          : 'max-w-7xl h-[calc(100vh-48px)] max-h-[750px] flex flex-col justify-between'
        }`}>

        {/* Decorative gradients */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <RoomHeader title={title} titleLoading={isPending} />

        {isCodingRound ? (
          /* ── Two-panel layout for coding rounds ── */
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
        ) : (
          /* ── Original centered layout for all other rounds ── */
          <div className="flex-1 flex flex-col justify-center gap-4 items-center py-4 mt-4 overflow-hidden">
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

