import { useEffect, useRef, useState } from "react";

export default function TranscriptArea() {

  const [candidateResponse, setCandidateresponse] = useState('')
  const [aiResponse, setAIResponse] = useState('')
  const audioContextRef = useRef<AudioContext | null>(null)
  const nextPlayTimeRef = useRef<number>(0)
  const socketRef = useRef<WebSocket | null>(null)

  // Microphone recording refs
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioInputContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000
      });
      audioInputContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioCtx.destination);

      processor.onaudioprocess = (e) => {
        const float32Data = e.inputBuffer.getChannelData(0);
        const int16Data = new Int16Array(float32Data.length);
        for (let i = 0; i < float32Data.length; i++) {
          let s = Math.max(-1, Math.min(1, float32Data[i]));
          int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        const uint8Array = new Uint8Array(int16Data.buffer);
        let binary = '';
        for (let i = 0; i < uint8Array.byteLength; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }
        const base64Audio = window.btoa(binary);

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(JSON.stringify({
            type: 'candidate_audio',
            data: base64Audio
          }));
        }
      };

      console.log("Microphone recording started!");
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioInputContextRef.current) {
      audioInputContextRef.current.close();
      audioInputContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    console.log("Microphone recording stopped!");
  };

  const handleSubmit = () => {
    setAIResponse('')
    const socket = socketRef.current
    if (socket) {
      socket.send(JSON.stringify({
        type: 'candidate_message',
        text: candidateResponse
      }))
    }
    setCandidateresponse('')

    // Resume AudioContext securely during user interaction
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
  }

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/session/0afd7dde-11c4-411b-a692-0101dfcb7c22")
    socketRef.current = socket
    // Initialize the AudioContext
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 24000
    });
    audioContextRef.current = audioCtx;
    nextPlayTimeRef.current = 0;

    const base64ToFloat32Array = (base64: string) => {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const int16Array = new Int16Array(bytes.buffer)

      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }
      return float32Array;
    }

    const playAudioChunk = (float32Data: Float32Array) => {
      if (!audioContextRef.current) return;

      // Change 44100 to 24000 here as well!
      const audioBuffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
      audioBuffer.getChannelData(0).set(float32Data)

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);

      let nextPlayTime = nextPlayTimeRef.current;
      const currentTime = audioContextRef.current.currentTime;

      if (nextPlayTime < currentTime) {
        nextPlayTime = currentTime;
      }

      source.start(nextPlayTime);
      nextPlayTimeRef.current = nextPlayTime + audioBuffer.duration;
    };

    socket.onopen = () => {
      console.log('Connected!')
      socket.send(JSON.stringify({
        type: 'start_interview',
        interviewId: '0b242e2e-3596-41e8-91e0-ba6ea2417db6'
      }))
    }

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.type === 'ai-chunk') {
        setAIResponse(prev => prev + message.text)
      } else if (message.type === 'tts-chunk') {
        const float32Data = base64ToFloat32Array(message.audio);
        playAudioChunk(float32Data);
        console.log(message)
      }
    }

    socket.onclose = () => {
      console.log('Socket Disconnected!')
    }

    return () => {
      socket.close()
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      console.log('socket closed')
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto text-center px-4 mb-2">
      {/* Candidate Transcript (Italicized, Muted Text) */}
      <div className="relative">
        {/* <p className="text-sm md:text-base italic text-gray-400 font-medium leading-relaxed">
          {candidateText}
        </p> */}
        <input
          type="text"
          onChange={(e) => {
            setCandidateresponse(e.target.value)
          }}
          className='text-sm md:text-base italic text-gray-400 font-medium leading-relaxed'
          value={candidateResponse}
        />
        <button
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button className="ml-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition" onClick={startRecording}>
          Start Mic
        </button>
        <button className="ml-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition" onClick={stopRecording}>
          Stop Mic
        </button>
      </div>

      {/* AI Transcript (Bold, Dynamic High-Contrast Question) */}
      {/* <div className="relative">
        <p className="text-lg md:text-2xl text-white font-extrabold leading-snug tracking-normal px-2">
          {aiResponse}
        </p>
      </div> */}
    </div>)
}
