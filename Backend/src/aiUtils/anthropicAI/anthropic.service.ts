import Anthropic from '@anthropic-ai/sdk'
import { FeedbackData } from './types'
import { AppError } from '../../utils/appError'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const callAI = async (systemPrompt: string) => {
    try {
        const feedbackData = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 3000,
            messages: [{
                role: 'user',
                content: systemPrompt
            }]
        })
        const raw = feedbackData.content.find(block => block.type === 'text');
        if (!raw || raw.type !== 'text') throw new Error('No text block in response');
        const feedback = JSON.parse(raw.text);
        return feedback
    } catch (error) {
        console.log(error)
    }
}