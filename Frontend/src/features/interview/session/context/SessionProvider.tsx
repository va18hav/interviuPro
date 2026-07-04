import { useEffect, useRef, useState, ReactNode } from "react"
import { startRecording, stopRecording } from "../services/microphone"
import { initializePlayer, stopPlayer } from "../services/audioplayer"
import { connectToSocket } from "../services/websocket"
import { SessionContext } from "./SessionContext"
import { useGenerateFeedback } from "../hooks/generateFeedback"
import { useNavigate } from "react-router-dom"

export const SessionProvider = ({ children, interviewId, sessionId }: { children: ReactNode, interviewId: string, sessionId: string }) => {
    const navigate = useNavigate()
    const { generateFeedback } = useGenerateFeedback()

    const hasEndedRef = useRef(false)
    const isAbandonedRef = useRef(false)
    const socketRef = useRef<WebSocket | null>(null)
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null)
    const playChunkRef = useRef<((chunk: string) => void) | null>(null)
    const [generatingFeedback, setGeneratingFeedback] = useState(false)
    const [aiMessage, setAiMessage] = useState('')
    const [aiSpeaking, setAiSpeaking] = useState(false)
    const [userSpeaking, setUserSpeaking] = useState(false)
    const [isInitializing, setIsInitializing] = useState(true)
    const [micON, setMicON] = useState(true)
    const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const endSession = () => {
        if (hasEndedRef.current || isAbandonedRef.current) return
        hasEndedRef.current = true
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: 'end_interview'
            }))
        }
        stopRecording()
        stopPlayer()
        setGeneratingFeedback(true)
        generateFeedback({
            interviewId,
            sessionId
        })
    }

    const abandonSession = () => {
        isAbandonedRef.current = true
        stopRecording()
        stopPlayer()
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) socketRef.current.close()
        navigate('/dashboard')
    }

    const flushTranscript = (message: string) => {
        const newLength = aiMessage.length + message.length
        if (newLength > 200) {
            setAiMessage('')
        }
        else {
            setAiMessage(prev => prev + message)
        }
    }

    const handleAudioChunk = (audioChunk: string, isSpeaking: boolean) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            if (isSpeaking) {
                setAiSpeaking(false) // User speech interrupts AI
                setAiMessage('') // Clear transcript when user speaks
                if (silenceTimeoutRef.current) {
                    clearTimeout(silenceTimeoutRef.current)
                    silenceTimeoutRef.current = null
                }
                setUserSpeaking(true)
            } else {
                if (!silenceTimeoutRef.current && userSpeaking) {
                    silenceTimeoutRef.current = setTimeout(() => {
                        setUserSpeaking(false)
                        silenceTimeoutRef.current = null
                    }, 1000)
                }
            }

            socketRef.current.send(JSON.stringify({
                type: 'candidate_audio',
                data: audioChunk
            }))
        }
    }

    const toggleMic = () => {
        if (micON) {
            stopRecording()
            setMicON(false)
        }
        if (!micON) {
            startRecording(handleAudioChunk)
            setMicON(true)
        }
    }

    // Active frontend countdown timer synced with backend duration
    useEffect(() => {
        if (remainingSeconds === null || remainingSeconds <= 0 || generatingFeedback) {
            return
        }

        const intervalId = setInterval(() => {
            setRemainingSeconds(prev => {
                if (prev !== null && prev > 0) {
                    return prev - 1
                }
                return prev
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [remainingSeconds === null, generatingFeedback])

    useEffect(() => {
        const socket = connectToSocket(sessionId)
        socketRef.current = socket

        playChunkRef.current = initializePlayer(() => {
            setAiSpeaking(false)
        })

        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'start_interview'
            }))
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            switch (message.type) {
                case 'tts-chunk':
                    setIsInitializing(false)
                    setUserSpeaking(false)
                    setAiSpeaking(true)
                    playChunkRef.current?.(message.audio)
                    break;
                case 'ai-chunk':
                    flushTranscript(message.text)
                    break;
                case 'timer-info':
                    setRemainingSeconds(message.data)
                    break;
            }
        }

        startRecording(handleAudioChunk)

        return () => {
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current)
            }
            endSession()
        }

    }, [sessionId])

    const value = {
        remainingSeconds,
        aiMessage,
        endSession,
        abandonSession,
        generatingFeedback,
        micON,
        toggleMic,
        aiSpeaking,
        userSpeaking,
        isInitializing
    }
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}
