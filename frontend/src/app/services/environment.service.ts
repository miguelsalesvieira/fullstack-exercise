import { Injectable } from '@angular/core';

import settings from '../../../../settings.json';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  public backend: { host: string; port: number } = {
    host: settings.backend.host,
    port: settings.backend.port,
  };
  public refreshRate: number = settings.timers.refresh;

  constructor() {}

  backendUrl(): string {
    return `${this.backend.host}:${this.backend.port}`;
  }
}
