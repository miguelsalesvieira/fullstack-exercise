import { Injectable } from '@angular/core';
import { WebsocketMessage, WebsocketMessageType } from 'src/types';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket | null;
  private receivers: {
    type: WebsocketMessageType;
    callback: (message: WebsocketMessage) => void;
  }[];

  constructor(private environmentService: EnvironmentService) {
    this.receivers = [];
    this.socket = null;
    this.connect();
  }

  private connect(): void {
    this.socket = new WebSocket(this.environmentService.backendWebsocketUrl());

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Listen for ping messages and respond with pong
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const receiver = this.receivers.find((r) => r.type === message.type);
      if (receiver) {
        receiver.callback(message);
        return;
      }
      if (message.type === WebsocketMessageType.ERROR) {
        console.error(message.data);
      }
    };

    // Handle connection errors
    this.socket.onerror = (error) => {
      console.error(`WebSocket error: ${JSON.stringify(error)}`);
    };

    // Handle connection closure
    this.socket.onclose = () => {
      console.warn('WebSocket connection closed. Attempting to reconnect...');
      this.reconnect();
    };
  }

  private reconnect(): void {
    setTimeout(() => {
      this.connect();
    }, this.environmentService.intervals.reconnect);
  }

  public addReceiver(receiver: {
    type: WebsocketMessageType;
    callback: (message: WebsocketMessage) => void;
  }): void {
    if (!this.receivers.find((r) => r.type === receiver.type)) {
      this.receivers.push(receiver);
    }
  }

  public sendMessage(message: WebsocketMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket connection is not open');
    }
  }
}
