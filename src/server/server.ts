import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());

let messages: string[] = [];

wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected');
    ws.send(JSON.stringify({ type: 'messages', payload: messages }));
    ws.on('message', (message: string) => {
        messages = messages.concat(message);

        wss.clients.forEach((client: { readyState: number; send: (arg0: string) => void; }) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'message', payload: message }));
            }
        });
    });
});

server.listen(5173, () => {
    console.log('Server started on port 5173');
});
