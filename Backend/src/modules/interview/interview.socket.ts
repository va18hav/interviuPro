import { WebSocket, WebSocketServer } from "ws"
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import type { ClientResponse, ServerResponse } from "./interview.types"
import * as interviewController from './interview.controller'
import { sessions, cleanupSession } from "./interview.session"
import { IncomingMessage } from "http"

export const handleInterview = (wss: WebSocketServer) => {
    wss.on('connection', (socket: WebSocket, req: IncomingMessage) => {
        const sessionId = (req as any).sessionId as string
        sessions.set(sessionId, { socket })
        const cookies = cookie.parse(req.headers.cookie || '')
        const token = cookies.token
        if (!token) {
            socket.close(1008, 'Unauthorized')
            return
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }

        // Register the socket in the Map so service layer can find it
        sessions.set(sessionId, { socket })

        socket.on('message', async (data) => {
            const message: ClientResponse = JSON.parse(data.toString())
            await interviewController.handleMessage(sessionId, message, decoded.userId,)
        })
        socket.on('close', async () => {
            await cleanupSession(sessionId, 'disconnected')
        })
    })
}