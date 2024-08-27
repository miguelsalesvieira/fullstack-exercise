import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-code',
  templateUrl: './live-code.component.html',
  styleUrls: ['./live-code.component.css'],
})
export class LiveCodeComponent {
  @Input() code: string;
  @Input() isLive: boolean;

  constructor() {
    this.code = '00';
    this.isLive = false;
  }
}
