import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-code',
  templateUrl: './live-code.component.html',
  styleUrls: ['./live-code.component.css'],
})
export class LiveCodeComponent {
  @Input() code0: number;
  @Input() code1: number;
  @Input() isLive: boolean;

  constructor() {
    this.code0 = 0;
    this.code1 = 0;
    this.isLive = false;
  }
}
