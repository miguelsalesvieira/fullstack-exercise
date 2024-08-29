import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import {
  Clock,
  Code,
  CreateGridDto,
  GetGridDto,
  Grid,
  WebsocketMessage,
  WebsocketMessageType,
} from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  public grid: Grid;
  public clock: Clock;
  public code: Code;

  public isLive: boolean = false;
  public bias: string = '';
  public sendBias: string = '';

  constructor(private websocketService: WebsocketService) {
    this.grid = [];
    this.clock = { hours: 0, minutes: 0, seconds: 0 };
    this.code = { code0: 0, code1: 0 };

    this.websocketService.addReceiver({
      type: WebsocketMessageType.GRID,
      callback: (message: WebsocketMessage) => {
        if (message.type === WebsocketMessageType.GRID) {
          const data = new GetGridDto(message.data);
          if (data.valid()) {
            this.grid = data.grid;
            this.clock = data.clock;
            this.code = data.code;
            this.isLive = true;
          }
        }
      },
    });
  }

  start(): void {
    this.sendBias = this.bias;
    const data = new CreateGridDto({ bias: this.sendBias });
    if (!data.valid()) {
      return;
    }

    this.websocketService.sendMessage({
      type: WebsocketMessageType.GRID,
      data: data,
    });
  }

  public setBias(bias: string): void {
    this.bias = bias;
  }
}
