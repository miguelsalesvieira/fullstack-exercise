import WebSocket from 'ws';
import { getPayments, handlePaymentMessage } from '../services/payments';
import { environment } from '../services/environment';
import { saveBiasTime, sendGrid } from '../services/grid';
import { CreateGridDto, WebsocketMessageDTO } from '../dtos';
import { WebsocketMessageType } from '../types';

let gridInterval: NodeJS.Timeout | null = null;

// Extend the WebSocket interface to include isAlive
export interface CustomWebSocket extends WebSocket {
    isAlive: boolean;
}

export function handleNewConnections(wss: WebSocket.Server) {
    wss.on('connection', (ws: CustomWebSocket) => {
        console.log('New client connected');

        // Add a custom property to track if the connection is alive
        ws.isAlive = true;

        // Send payments
        const payments = getPayments();
        console.log(`Sending ${payments.length} payments`);
        for (const payment of payments) {
            const sendMessage = JSON.stringify({
                type: 'payment',
                data: payment,
            });
            ws.send(sendMessage);
        }

        // When a pong is received, set isAlive to true
        ws.on('pong', () => {
            console.log('Pong received');
            ws.isAlive = true;
        });

        // Listen for messages from clients
        ws.on('message', (message) => {
            const messageObject = JSON.parse(message.toString());

            switch (messageObject.type) {
                case 'payment': {
                    console.log('Received payment message');
                    handlePaymentMessage(messageObject.data, wss, ws);
                    break;
                }
                case 'grid': {
                    console.log('Received grid message');
                    const newGrid = new CreateGridDto(messageObject.data);

                    if (!newGrid.valid()) {
                        console.error('Invalid CREATE grid data');
                        const sendData = new WebsocketMessageDTO({
                            type: WebsocketMessageType.ERROR,
                            data: 'Invalid grid data',
                        });
                        ws.send(JSON.stringify(sendData));
                        return;
                    }

                    const saved = saveBiasTime(messageObject.data.bias);

                    if (!saved) {
                        console.error('Trying to change bias too quickly');
                        const sendData = new WebsocketMessageDTO({
                            type: WebsocketMessageType.ERROR,
                            data: 'Please wait a few seconds before sending a new bias',
                        });
                        ws.send(JSON.stringify(sendData));
                        return;
                    }

                    if (gridInterval !== null) {
                        return;
                    }

                    // Start the grid interval
                    gridInterval = setInterval(() => {
                        sendGrid(wss);
                    }, environment.intervals.grid);
                    break;
                }
                default:
                    console.log(`Message from client: ${message}`);
            }
        });

        // When a client disconnects
        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

export function startHeartbeat(wss: WebSocket.Server): NodeJS.Timeout {
    return setInterval(() => {
        wss.clients.forEach((ws) => {
            const customWs = ws as CustomWebSocket; // Type assertion

            if (!customWs.isAlive) {
                return ws.terminate(); // Terminate the connection if no pong was received
            }

            customWs.isAlive = false; // Set isAlive to false and expect the client to respond with a pong
            customWs.ping(); // Send a ping to the client
        });
        console.log('Ping sent to all clients', wss.clients.size);
    }, environment.intervals.heartbeat);
}
