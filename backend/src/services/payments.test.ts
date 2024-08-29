import { describe, expect, test } from '@jest/globals';
import { addPayment, deletePayments, getPayments } from './payments';
import { Payment } from '../types';

const mockPaymentValues = {
    name: 'Netflix',
    amount: 10,
};

const mockGridValues = {
    rows: 3,
    cols: 3,
    seconds: 10,
    bias: '',
};

describe('Payments', () => {
    test('should add a payment', () => {
        expect(() => addPayment(mockPaymentValues, mockGridValues)).not.toThrowError();
    });
    test('should have the correct number of payments', () => {
        expect(getPayments().length).toBe(1);
    });
    test('should have the correct payment', () => {
        const payment = getPayments()[0];
        expect(payment.name).toBe(mockPaymentValues.name);
        expect(payment.amount).toBe(mockPaymentValues.amount);
        expect(payment.grid).toHaveLength(mockGridValues.rows);
        expect(payment.grid[0]).toHaveLength(mockGridValues.cols);
    });
    test('should not be able to add same payment name', () => {
        expect(() => addPayment(mockPaymentValues, mockGridValues)).toThrowError();
    });
    test('should delete payments', () => {
        expect(deletePayments()).toBeUndefined();
    });
    test('should have no payments', () => {
        expect(getPayments().length).toBe(0);
    });
});
