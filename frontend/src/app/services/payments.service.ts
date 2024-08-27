import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { Payment } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  public observable: Observable<Payment[]>;
  public payments: Payment[] = [];

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService
  ) {
    this.observable = this.http.get<Payment[]>(
      `${this.environmentService.backendUrl()}/payments`
    );
    this.observable.subscribe({
      next: (data: Payment[]) => {
        console.log(data);
        this.payments = data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  public addPayment(payment: { name: string; amount: number }): void {
    this.http
      .post<Payment>(
        `${this.environmentService.backendUrl()}/payments`,
        payment
      )
      .subscribe({
        next: (data: Payment) => {
          this.payments.push(data);
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }
}
