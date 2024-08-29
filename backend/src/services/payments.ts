import WebSocket from 'ws';
import { Clock, Payment, WebsocketMessageType } from '../types';
import { generateGridWithCode, lastSavedBias } from './grid';
import { CreatePaymentDto, GetPaymentDto } from '../dtos/payments';
import { environment } from './environment';
import { WebsocketMessageDTO } from '../dtos/websocket';

let payments: Payment[] = [];

export function getPayments(): Payment[] {
    return payments;
}

export function getPayment(name: string): Payment | undefined {
    return payments.find((payment) => payment.name === name);
}

export function addPayment(
    paymentValues: {
        name: string;
        amount: number;
    },
    gridValues: {
        rows: number;
        cols: number;
        seconds: number;
        bias?: string;
    },
): Payment {
    if (getPayment(paymentValues.name)) {
        throw new Error('Payment already exists');
    }

    // Generate grid with code
    const { grid, code } = generateGridWithCode(gridValues.rows, gridValues.cols, gridValues.seconds, gridValues.bias);

    // Create payment
    const payment: Payment = {
        name: paymentValues.name,
        amount: paymentValues.amount,
        code,
        grid,
    };

    payments.push(payment);
    return payment;
}

export function deletePayments(): void {
    payments = [];
}

export function handlePaymentMessage(messageData: any, wss: WebSocket.Server, ws: WebSocket): void {
    const newPayment = new CreatePaymentDto(messageData);

    if (!newPayment.valid()) {
        console.error('Invalid payment data');
        return;
    }

    // Get current seconds
    const now = new Date();
    const clock: Clock = {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
    };

    try {
        // Add payment
        const paymentAdded = addPayment(
            { name: newPayment.name, amount: newPayment.amount },
            {
                rows: environment.grid.rows,
                cols: environment.grid.cols,
                seconds: clock.seconds,
                bias: lastSavedBias.bias,
            },
        );

        const payment = new GetPaymentDto(paymentAdded);
        const sendData = new WebsocketMessageDTO({
            type: WebsocketMessageType.PAYMENT,
            data: payment,
        });
        const sendMessage = JSON.stringify(sendData);

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(sendMessage);
            }
        });
    } catch (error: any) {
        ws.send(`Error adding payment: ${error.message}`);
    }
}
