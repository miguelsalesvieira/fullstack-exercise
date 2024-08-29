import { Component, OnInit } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';

@Component({
  selector: 'app-payments-page',
  templateUrl: './payments-page.component.html',
  styleUrls: ['./payments-page.component.css'],
})
export class PaymentsPageComponent {
  public paymentName: string = '';
  public paymentAmount: number = 0;

  constructor(public readonly paymentsService: PaymentsService) {}

  handleOnChangeName(name: string) {
    this.paymentName = name;
  }

  handleOnChangeAmount(amount: number) {
    this.paymentAmount = amount;
  }

  handleOnClickAdd() {
    if (this.paymentName === '' || this.paymentAmount === 0) {
      console.error('Invalid input');
      return;
    }

    this.paymentsService.sendPayment({
      name: this.paymentName,
      amount: this.paymentAmount,
    });
    this.paymentName = '';
    this.paymentAmount = 0;
  }
}
