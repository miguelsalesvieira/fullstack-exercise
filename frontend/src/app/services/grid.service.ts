import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root',
})
export class GridService {
  public grid: string[][] = [];
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public code: string = '00';
  public isLive: boolean = false;
  public bias: string = '';
  public sendBias: string = '';
  private interval: NodeJS.Timeout | null = null;

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {}

  start(): void {
    this.sendBias = this.bias;
    this.getValues();
    if (this.interval !== null) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.getValues();
    }, this.environmentService.refreshRate);
  }

  private getValues(): void {
    this.http
      .get(`${this.environmentService.backendUrl()}/grid?bias=${this.sendBias}`)
      .subscribe({
        next: (data: any) => {
          this.grid = data.grid;
          this.hours = data.clock.hours;
          this.minutes = data.clock.minutes;
          this.seconds = data.clock.seconds;
          this.code = `${data.code.code0}${data.code.code1}`;
          this.isLive = true;
        },
        error: (error: any) => {
          console.error(error);
          this.isLive = false;
          if (this.interval !== null) clearInterval(this.interval);
        },
      });
  }

  public setBias(bias: string): void {
    this.bias = bias;
  }
}
