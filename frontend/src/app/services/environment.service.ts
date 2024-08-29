import { Injectable } from '@angular/core';

import settings from '../../../../settings.json';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public backend: {
    http: { host: string; port: number };
    websocket: { host: string; port: number };
  } = {
    http: {
      host: settings.backend.http.host,
      port: settings.backend.http.port,
    },
    websocket: {
      host: settings.backend.websocket.host,
      port: settings.backend.websocket.port,
    },
  };
  public intervals: {
    grid: number;
    reconnect: number;
  } = {
    grid: settings.intervals.grid,
    reconnect: settings.intervals.reconnect,
  };

  constructor() {}

  backendHttpUrl(): string {
    return `${this.backend.http.host}:${this.backend.http.port}`;
  }

  backendWebsocketUrl(): string {
    return `ws://${this.backend.websocket.host}:${this.backend.websocket.port}`;
  }
}
