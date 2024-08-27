import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  @Input() hours: number = 0;
  @Input() minutes: number = 0;
  @Input() seconds: number = 0;

  hourStyle: { transform: string } = { transform: '' };
  minuteStyle: { transform: string } = { transform: '' };
  secondStyle: { transform: string } = { transform: '' };
  ticks: { style: { transform: string; width: string; height: string } }[] = [];

  ngOnInit(): void {
    this.generateTicks();
    this.updateClock();
  }

  ngOnChanges(): void {
    this.updateClock();
  }

  updateClock(): void {
    const hourDegrees = (this.hours % 12) * 30 + this.minutes * 0.5 + 90;
    const minuteDegrees = this.minutes * 6 + 90;
    const secondDegrees = this.seconds * 6 + 90;

    this.hourStyle = { transform: `rotate(${hourDegrees}deg)` };
    this.minuteStyle = { transform: `rotate(${minuteDegrees}deg)` };
    this.secondStyle = { transform: `rotate(${secondDegrees}deg)` };
  }

  generateTicks(): void {
    this.ticks = [];
    for (let i = 0; i < 60; i++) {
      const tickDegrees = i * 6;
      this.ticks.push({
        style: {
          transform: `rotate(${tickDegrees}deg) translateX(${
            i % 5 === 0 ? '650' : '1500'
          }%)`,
          width: i % 5 === 0 ? '7%' : '3%',
          height: i % 5 === 0 ? '2%' : '0.5%',
        },
      });
    }
  }
}
