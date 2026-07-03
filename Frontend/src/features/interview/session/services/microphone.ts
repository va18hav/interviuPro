// const startRecording = async () => {
let processor: ScriptProcessorNode | null = null;
let audioContext: AudioContext | null = null;
let mediaStream: MediaStream | null = null

export const startRecording = async (onaudioChunk: (chunk: string, isSpeaking: boolean) => void) => {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioContext = new (window.AudioContext)({
        sampleRate: 16000
    })
    const source = audioContext.createMediaStreamSource(mediaStream)
    processor = audioContext.createScriptProcessor(4096, 1, 1)
    source.connect(processor)
    processor.connect(audioContext.destination)
    processor.onaudioprocess = (e) => {
        const float32Data = e.inputBuffer.getChannelData(0)
        let sum = 0
        for (let i = 0; i < float32Data.length; i++) {
            sum += float32Data[i] * float32Data[i]
        }
        const rms = Math.sqrt(sum / float32Data.length)
        const isSpeaking = rms > 0.025
        const int16Data = new Int16Array(float32Data.length)
        for (let i = 0; i < float32Data.length; i++) {
            const s = Math.max(-1, Math.min(1, float32Data[i]))
            int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
        }
        const uint8Array = new Uint8Array(int16Data.buffer)
        let binary = ''
        for (let i = 0; i < uint8Array.byteLength; i++) {
            binary += String.fromCharCode(uint8Array[i])
        }
        const base64Audio = window.btoa(binary)
        onaudioChunk(base64Audio, isSpeaking)
    }
}

export function stopRecording() {

    if (processor) {
        processor.disconnect();
        processor = null;
    }

    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }

    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
}


