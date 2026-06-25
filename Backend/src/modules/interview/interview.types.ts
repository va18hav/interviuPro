//Client side types
export interface InterviewContext {
    userId: string,
    title: string,
    type: string,
    role: string,
    experience: string,
    skills: string,
    jobDescription: string | null,
    duration: number
}

export interface StartInterview {
    type: 'start_interview',
}

export interface CandidateMessage {
    type: 'candidate_audio',
    data: string
}

export interface EndInterview {
    type: 'end-interview'
}

export type ClientResponse = StartInterview | CandidateMessage | EndInterview

//Server side/AI response types

export interface AIChunk {
    type: 'ai-chunk',
    text: string
}

export interface AIResponseEnd {
    type: 'ai-end'
}

export interface InterviewEnded {
    type: 'interview-ended'
}

export interface ErrorMessage {
    type: 'error',
    message: string
}

export type ServerResponse = AIChunk | AIResponseEnd | InterviewEnded | ErrorMessage

// Conversation types

export interface ConversationEntry {
    role: 'user' | 'assistant',
    content: string
}

export type ConversationHistory = {
    history: ConversationEntry[]
}



