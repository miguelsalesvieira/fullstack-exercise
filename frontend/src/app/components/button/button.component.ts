import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label: string;
  @Output() onClick = new EventEmitter<void>();

  constructor() {
    this.label = 'Button';
  }

  handleOnClick() {
    this.onClick.emit();
  }
}
