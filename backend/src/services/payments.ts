import { Payment } from "../types";
import { generateGridWithCode } from "./grid";

let payments: Payment[] = [];

export function getPayments(): Payment[] {
    return payments;
}

export function getPayment(
    name: string
): Payment | undefined {
    return payments.find(
        (payment) => payment.name === name
    );
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
    }
): Payment {
    if (getPayment(paymentValues.name)) {
        throw new Error("Payment already exists");
    }

    // Generate grid with code
    const { grid, code } = generateGridWithCode(
        gridValues.rows,
        gridValues.cols,
        gridValues.seconds,
        gridValues.bias
    );

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
