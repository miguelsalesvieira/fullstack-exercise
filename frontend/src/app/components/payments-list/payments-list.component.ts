import { Component, Input, OnInit } from '@angular/core';
import { Payment } from 'src/types';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css'],
})
export class PaymentsListComponent {
  @Input() payments: Payment[] = [];

  constructor() {}
}
