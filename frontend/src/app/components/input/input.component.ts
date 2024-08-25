import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label: string;
  @Input() placeholder: string;

  @Output() onChange = new EventEmitter<string>();

  constructor() {
    this.label = 'Input';
    this.placeholder = 'Placeholder';
  }

  handleOnChange(event: Event) {
    if (event && event.target)
      this.onChange.emit((event.target as HTMLInputElement).value);
  }
}
