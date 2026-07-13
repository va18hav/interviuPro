import { GoogleGenAI, Modality } from '@google/genai';
import { WebSocket } from 'ws';
import { sessions } from '../../modules/session/session.js';
import { cacheHistory, getCacheSession, updateGeminiToken } from '../../modules/session/session.redis.js';

// 1. Initialize the Google GenAI Client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export const setupGeminiConnection = async (sessionId: string, systemPrompt: string) => {
    let retries = 0
    let aiTranscriptBuffer = ''
    let currentGeminiSession: any = null
    let audioBuffer: any[] = []
    let isReconnecting = false
    let isDurationUp = false
    let resumeHandle: string | null = null

    const userSession = sessions.get(sessionId)
    const userSocket = userSession?.socket
    const isUserConnected = () => {
        const userSession = sessions.get(sessionId)
        return userSession?.socket?.readyState === WebSocket.OPEN
    }

    const cacheSession = await getCacheSession(sessionId)

    //send data utility function
    const sendData = (payload: object) => {
        userSocket?.send(JSON.stringify(payload))
    }

    const proxySession = {
        sendRealtimeInput: (inputData: string | object) => {
            if (isReconnecting) {
                // Only buffer audio during reconnect — code text updates during
                // reconnect are skipped (stale snapshots are harmless to miss)
                if ((inputData as any).audio) {
                    audioBuffer.push(inputData)
                }
            }
            else if (currentGeminiSession) {
                currentGeminiSession.sendRealtimeInput(inputData)
            }
        },
        close: () => {
            if (cacheSession) {
                if (cacheSession?.duration <= (cacheSession?.elapsedSeconds) / 60) isDurationUp = true
            }
            if (currentGeminiSession && typeof currentGeminiSession.close === 'function') {
                currentGeminiSession.close()
            }
        }
    }


    const connectToGemini = async () => {
        const model = 'gemini-3.1-flash-live-preview';
        const config: any = {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: {
                        'voiceName': 'Kore'
                    }
                },
                languageCode: 'en-IN'
            },
            inputAudioTranscription: {},
            outputAudioTranscription: {},
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            }
        }
        if (resumeHandle) {
            config.sessionResumption = { handle: resumeHandle }
        }
        currentGeminiSession = await ai.live.connect({
            model: model,
            config: config,
            callbacks: {
                onopen: () => {
                    console.log(resumeHandle ? 'Resumed Previous connection' : 'Connected to gemini API');
                    isReconnecting = false
                    while (audioBuffer.length > 0) {
                        const queuedMessage = audioBuffer.shift()
                        currentGeminiSession.sendRealtimeInput(queuedMessage)
                    }
                },

                onmessage: async (response: any) => {
                    // console.log(response)
                    const content = response.serverContent;
                    const sessionResumption = response.sessionResumptionUpdate
                    const pushTranscript = async (role: 'user' | 'assistant', content: string) => {
                        await cacheHistory(sessionId, { role, content })
                    }
                    if (response.goAway) {
                        console.log('Go away signal received')
                        isReconnecting = true
                        if (currentGeminiSession.close) {
                            currentGeminiSession.close()
                        }
                        connectToGemini()
                        return
                    }

                    if (content?.modelTurn?.parts) {
                        for (const part of content.modelTurn.parts) {
                            if (part.inlineData) {
                                // This is the raw base64 audio data
                                const audioData = part.inlineData.data;
                                // Send it straight to the frontend to be played
                                if (isUserConnected()) {
                                    sendData({ type: 'tts-chunk', audio: audioData })
                                }
                            }
                        }
                    }

                    if (content?.outputTranscription) {
                        if (isUserConnected()) {
                            sendData({ type: 'ai-chunk', text: content.outputTranscription.text })
                        }
                        aiTranscriptBuffer += content.outputTranscription.text
                    }

                    const flushAITranscript = async () => {
                        if (!aiTranscriptBuffer.trim()) return;
                        await pushTranscript('assistant', aiTranscriptBuffer.trim());
                        aiTranscriptBuffer = '';
                    };

                    if (content?.interrupted) await flushAITranscript()

                    if (content?.turnComplete) await flushAITranscript()

                    if (content?.inputTranscription) {
                        const userText = content.inputTranscription.text;
                        // Filter out non-English/non-Latin script hallucinations (caused by background noise/static)
                        const hasNonEnglishScript = /[^\p{Script=Latin}\p{Number}\p{Punctuation}\p{Separator}\p{Symbol}]/u.test(userText);
                        if (userText.trim() && !hasNonEnglishScript) {
                            await pushTranscript('user', userText.trim());
                        }
                    }


                    if (cacheSession && sessionResumption?.resumable && sessionResumption?.newHandle) {
                        resumeHandle = response.sessionResumptionUpdate.newHandle as string
                        await updateGeminiToken(sessionId, resumeHandle)
                    }
                },
                onerror: (e: any) => {
                    console.error('❌ Gemini Error:', e.message)
                    if (isUserConnected()) sendData({ type: 'ai-error', text: 'Gemini Error' })
                },
                onclose: (e: any) => {
                    console.log('Gemini Connection Closed:', e.reason)
                    const MAX_RETRIES = 5

                    if (!isUserConnected()) {
                        console.log('Session ended beacuse user disconnected')
                        return
                    }

                    if (isDurationUp) {
                        console.log('Interview duration is up')
                        return
                    }

                    if (isReconnecting) return

                    if (retries < MAX_RETRIES) {
                        retries++
                        const delay = Math.pow(2, retries - 1) * 1000
                        isReconnecting = true
                        sendData({ type: 'ai-reconnect', text: `⚠️ Gemini dropped unexpectedly. Retrying (${retries}/${MAX_RETRIES}) in ${delay}ms...` })
                        setTimeout(() => {
                            connectToGemini()
                        }, delay)
                    }
                    else {
                        isReconnecting = false
                        console.log('❌ Max retries reached. Connection failed.')
                        sendData({ type: 'ai-reconnect-end', text: 'Lost connection to AI interviewer.' })
                    }
                },
            }
        })
    }
    try {
        await connectToGemini();
        return proxySession;
    } catch (error) {
        console.error("❌ Fatal Error starting Gemini:", error);
        sendData({ type: 'ai-error', text: 'Failed to start AI interviewer.' })
        // Close the socket so the frontend knows it's dead
        userSocket?.close(1011, "Internal AI Error");
        return null;
    }
}

