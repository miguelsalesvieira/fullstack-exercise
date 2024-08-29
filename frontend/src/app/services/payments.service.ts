import { Injectable } from '@angular/core';
import {
  CreatePaymentDto,
  GetPaymentDto,
  Payment,
  WebsocketMessage,
  WebsocketMessageType,
} from 'src/types';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  public payments: Payment[] = [];

  constructor(private websocketService: WebsocketService) {
    this.websocketService.addReceiver({
      type: WebsocketMessageType.PAYMENT,
      callback: (message: WebsocketMessage) => {
        if (message.type === WebsocketMessageType.PAYMENT) {
          const payment = new GetPaymentDto(message.data);
          if (payment.valid()) {
            this.addPayment(payment);
          }
        }
      },
    });
  }

  public sendPayment(payment: { name: string; amount: number }): void {
    const newPayment = new CreatePaymentDto(payment);
    if (!newPayment.valid()) {
      return;
    }

    this.websocketService.sendMessage({
      type: WebsocketMessageType.PAYMENT,
      data: newPayment,
    });
  }

  public addPayment(payment: Payment): void {
    if (!this.payments.find((p) => p.name === payment.name)) {
      this.payments.push(payment);
    }
  }
}
