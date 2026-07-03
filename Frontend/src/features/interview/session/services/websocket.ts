export const connectToSocket = (sessionId: string) => {
    return new WebSocket(`ws://localhost:3000/session/${sessionId}`)
}

// useEffect(() => {
//   const socket = new WebSocket("ws://localhost:3000/session/94177d70-d73e-4573-a4ab-91ba07527854")
//   socketRef.current = socket
//   // Initialize the AudioContext
//   const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
//     sampleRate: 24000
//   });
//   audioContextRef.current = audioCtx;
//   nextPlayTimeRef.current = 0;

//   const base64ToFloat32Array = (base64: string) => {
//     const binaryString = atob(base64);
//     const bytes = new Uint8Array(binaryString.length);
//     for (let i = 0; i < binaryString.length; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }
//     const int16Array = new Int16Array(bytes.buffer)

//     const float32Array = new Float32Array(int16Array.length);
//     for (let i = 0; i < int16Array.length; i++) {
//       float32Array[i] = int16Array[i] / 32768.0;
//     }
//     return float32Array;
//   }

//   const playAudioChunk = (float32Data: Float32Array) => {
//     if (!audioContextRef.current) return;

//     // Change 44100 to 24000 here as well!
//     const audioBuffer = audioContextRef.current.createBuffer(1, float32Data.length, 24000);
//     audioBuffer.getChannelData(0).set(float32Data)

//     const source = audioContextRef.current.createBufferSource();
//     source.buffer = audioBuffer;
//     source.connect(audioContextRef.current.destination);

//     let nextPlayTime = nextPlayTimeRef.current;
//     const currentTime = audioContextRef.current.currentTime;

//     if (nextPlayTime < currentTime) {
//       nextPlayTime = currentTime;
//     }

//     source.start(nextPlayTime);
//     nextPlayTimeRef.current = nextPlayTime + audioBuffer.duration;
//   };

//   socket.onopen = () => {
//     console.log('Connected!')
//     socket.send(JSON.stringify({
//       type: 'start_interview',
//       interviewId: '0b242e2e-3596-41e8-91e0-ba6ea2417db6'
//     }))
//   }

//   socket.onmessage = (event) => {
//     const message = JSON.parse(event.data)
//     if (message.type === 'ai-chunk') {
//       setAIResponse(prev => prev + message.text)
//     } else if (message.type === 'tts-chunk') {
//       const float32Data = base64ToFloat32Array(message.audio);
//       playAudioChunk(float32Data);
//       console.log(message)
//     }
//   }

//   socket.onclose = () => {
//     console.log('Socket Disconnected!')
//   }

//   return () => {
//     socket.close()
//     if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
//       audioContextRef.current.close();
//     }
//     console.log('socket closed')
//   }
// }, [])