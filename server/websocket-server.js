const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8084 });

const clients = new Set();

server.on('connection', (ws) => {
    clients.add(ws);
    console.log('New client connected');

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            broadcastMessage(parsedMessage, ws);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log('Client disconnected');
    });
});

function broadcastMessage(message, sender) {
    clients.forEach(client => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

console.log('WebSocket server running on port 8084');