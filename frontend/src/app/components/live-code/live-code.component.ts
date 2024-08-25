import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-code',
  templateUrl: './live-code.component.html',
  styleUrls: ['./live-code.component.css'],
})
export class LiveCodeComponent implements OnInit {
  @Input() code: number;
  @Input() isLive: boolean;

  constructor() {
    this.code = 0;
    this.isLive = false;
  }

  ngOnInit(): void {}
}
