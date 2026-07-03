import { JsonValue } from "@prisma/client/runtime/client"

export interface CreateInterviewContext {
    userId: string,
    title: string,
    role: string,
    experience: string,
    skills: string[]
    jobDescription: string | null,
}

export interface FetchInterviewContext {
    userId: string,
    title: string,
    role: string,
    experience: string,
    skills: JsonValue
    jobDescription: string | null,
}







