import RoomHeader from '../components/RoomHeader';
import AIAvatar from '../components/AIAvatar';
import AudioVisualizer from '../components/AudioVisualizer';
import TranscriptArea from '../components/TranscriptArea';
import RoomControls from '../components/RoomControls';

export default function Room() {
  return (
    <div className="h-screen bg-[#0B0F19] text-white font-sans p-4 md:p-6 flex items-center justify-center overflow-hidden">
      {/* Centered Main Card Container */}
      <div className="bg-[#111623] border border-gray-800 rounded-2xl p-6 md:p-8 max-w-6xl w-full h-[calc(100vh-48px)] max-h-[750px] shadow-2xl relative overflow-hidden flex flex-col justify-between">

        {/* Subtle decorative background gradient glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00E599]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header section */}
        <RoomHeader />

        {/* Workspace content area */}
        <div className="flex-1 flex flex-col justify-between items-center py-4 mt-4 overflow-hidden">
          {/* Central AI Avatar */}
          <AIAvatar />

          {/* WebGL Audio Visualizer */}
          <AudioVisualizer />

          {/* User & AI Transcript text */}
          <TranscriptArea />

          {/* Interrupt & Abandon Action Controls */}
          <RoomControls />
        </div>
      </div>
    </div>
  );
}
