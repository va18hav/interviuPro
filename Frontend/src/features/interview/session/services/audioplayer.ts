// audioPlayer.ts

let audioContext: AudioContext | null = null;
let nextPlayTime = 0;
let playbackEndTimeout: ReturnType<typeof setTimeout> | null = null;

export const initializePlayer = (onPlaybackEnd?: () => void) => {
    audioContext = new (window.AudioContext)({
        sampleRate: 24000
    });

    nextPlayTime = 0;

    return (base64: string) => {
        if (!audioContext) return;

        // Base64 -> Int16
        const binaryString = atob(base64);

        const bytes = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        const int16Array = new Int16Array(bytes.buffer);

        // Int16 -> Float32
        const float32Array = new Float32Array(int16Array.length);

        for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768;
        }

        // Create AudioBuffer
        const audioBuffer = audioContext.createBuffer(
            1,
            float32Array.length,
            24000
        );

        audioBuffer.getChannelData(0).set(float32Array);

        // Schedule playback
        const source = audioContext.createBufferSource();

        source.buffer = audioBuffer;
        source.connect(audioContext.destination);

        const currentTime = audioContext.currentTime;

        if (nextPlayTime < currentTime) {
            nextPlayTime = currentTime;
        }

        source.start(nextPlayTime);

        nextPlayTime += audioBuffer.duration;

        // Track when play queue runs dry
        if (onPlaybackEnd) {
            if (playbackEndTimeout) {
                clearTimeout(playbackEndTimeout);
            }
            const delayMs = (nextPlayTime - currentTime) * 1000;
            playbackEndTimeout = setTimeout(() => {
                onPlaybackEnd();
                playbackEndTimeout = null;
            }, delayMs);
        }
    };
};

export const stopPlayer = async () => {
    if (playbackEndTimeout) {
        clearTimeout(playbackEndTimeout);
        playbackEndTimeout = null;
    }

    if (!audioContext) return;

    await audioContext.close();

    audioContext = null;
    nextPlayTime = 0;
};
