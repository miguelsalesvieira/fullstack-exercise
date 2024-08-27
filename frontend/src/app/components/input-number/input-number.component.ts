import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
})
export class InputNumberComponent {
  @Input() value: number;
  @Input() label: string;
  @Input() placeholder: string;

  @Output() onChange = new EventEmitter<number>();

  constructor() {
    this.value = 0;
    this.label = 'Input';
    this.placeholder = 'Placeholder';
  }

  handleOnChange(event: Event) {
    if (event && event.target)
      this.onChange.emit(Number((event.target as HTMLInputElement).value));
  }
}
