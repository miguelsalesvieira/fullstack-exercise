import { DTO } from '.';
import { Code, Grid, Payment } from '../types';

export class CreatePaymentDto {
    public name: string;
    public amount: number;

    constructor(data: any) {
        this.name = data.name;
        this.amount = data.amount;
    }

    valid(): boolean {
        return typeof this.name === 'string' && this.name !== '' && typeof this.amount === 'number' && this.amount > 0;
    }
}

export class GetPaymentDto implements Payment, DTO {
    public name: string;
    public amount: number;
    public code: Code;
    public grid: Grid;

    constructor(data: any) {
        this.name = data.name;
        this.amount = data.amount;
        this.code = data.code;
        this.grid = data.grid;
    }

    valid(): boolean {
        return (
            typeof this.name === 'string' &&
            this.name !== '' &&
            typeof this.amount === 'number' &&
            this.amount > 0 &&
            typeof this.code === 'object' &&
            typeof this.code.code0 === 'number' &&
            this.code.code0 > 0 &&
            this.code.code0 < 10 &&
            typeof this.code.code1 === 'number' &&
            this.code.code1 > 0 &&
            this.code.code1 < 10 &&
            this.grid.length > 0 &&
            this.grid.every((row) => row.length > 0) &&
            this.grid.every((row) => row.every((cell) => typeof cell === 'string'))
        );
    }
}
