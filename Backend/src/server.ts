import { WebSocketServer } from 'ws'
import app from './app'
import http from 'http'
import { handleInterview } from './modules/interview/interview.socket'

const server = http.createServer(app)

// Use noServer mode so we control which upgrade requests reach the WSS
const wss = new WebSocketServer({ noServer: true })
handleInterview(wss)

server.on('upgrade', (req, socket, head) => {
    const { pathname } = new URL(req.url ?? '', `http://${req.headers.host}`)

    // Only accept WebSocket connections on /session/:sessionId
    const match = pathname.match(/^\/session\/([^/]+)$/)
    if (!match) {
        socket.destroy()
        return
    }

    const sessionId = match[1]

    wss.handleUpgrade(req, socket, head, (ws) => {
        // Attach sessionId to the request so the handler can read it
        ;(req as any).sessionId = sessionId
        wss.emit('connection', ws, req)
    })
})

server.listen(3000, () => {
    console.log('The server and websocket server are running on port 3000')
})