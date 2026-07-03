import { createContext, useContext } from "react"

export interface SessionContextType {
    remainingSeconds: number
    aiMessage: string;
    endSession: () => void;
    abandonSession: () => void;
    micON: boolean;
    toggleMic: () => void;
    generatingFeedback: boolean
    aiSpeaking: boolean
    userSpeaking: boolean
    isInitializing: boolean
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined)

export const useSession = () => {
    const context = useContext(SessionContext)
    if (context === undefined) {
        throw new Error('useSession must be used within a session provider')
    }
    return context
}
