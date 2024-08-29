import express from 'express';
import cors from 'cors';
import WebSocket from 'ws';
import { addRoutes } from './controllers';
import { environment } from './services/environment';
import { handleNewConnections, startHeartbeat } from './services/websocket';

// Create an Express application
export const app = express();
app.use(
    express.json(),
    cors({
        origin: `${environment.frontend.host}:${environment.frontend.port}`,
    }),
);

// Add routes to the Express application
addRoutes(app);

// Start the WEBSOCKET server
const wss = new WebSocket.Server({
    host: environment.backend.websocket.host,
    port: environment.backend.websocket.port,
});
console.log(`WS   server is running on ws://${environment.backend.websocket.host}:${environment.backend.websocket.port}`);

// Handle new WebSocket connections
handleNewConnections(wss);

// Periodically check for alive clients (Heartbeat mechanism)
const heartbeatInterval = startHeartbeat(wss);

// Start the HTTP server
app.listen(environment.backend.http.port, () => {
    console.log(`HTTP server is running on ${environment.backend.http.host}:${environment.backend.http.port}`);
});

// Close the interval and WebSocket server when the application is closed
app.on('close', () => {
    clearInterval(heartbeatInterval);
    wss.close();
});
