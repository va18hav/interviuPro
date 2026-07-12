export interface StartInterview {
    type: 'start_interview',
}

export interface CandidateMessage {
    type: 'candidate_audio',
    data: string
}

export interface EndInterview {
    type: 'end_interview'
}

export type ClientResponse = StartInterview | CandidateMessage | EndInterview

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

export interface ConversationEntry {
    role: 'user' | 'assistant',
    content: string
}

export type ConversationHistory = ConversationEntry[]

export enum RoundType {
    TECHNICAL_CODING = 'Technical/Coding',
    SYSTEM_DESIGN = 'System Design',
    BEHAVIORAL = 'Behavioral'
}

