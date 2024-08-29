import { validBias } from '../services/code';
import { Clock, Code, Grid } from '../types';

export class CreateGridDto {
    public bias: string;

    constructor(data: any) {
        this.bias = data.bias;
    }

    valid(): boolean {
        return validBias(this.bias);
    }
}

export class GetGridDto {
    public grid: Grid;
    public clock: Clock;
    public code: Code;

    constructor(data: any) {
        this.grid = data.grid;
        this.clock = data.clock;
        this.code = data.code;
    }

    valid(): boolean {
        return (
            this.grid.length > 0 &&
            this.grid.every((row) => row.length > 0) &&
            this.grid.every((row) => row.every((cell) => typeof cell === 'string')) &&
            typeof this.clock === 'object' &&
            typeof this.clock.hours === 'number' &&
            this.clock.hours >= 0 &&
            this.clock.hours < 24 &&
            typeof this.clock.minutes === 'number' &&
            this.clock.minutes >= 0 &&
            this.clock.minutes < 60 &&
            typeof this.clock.seconds === 'number' &&
            this.clock.seconds >= 0 &&
            this.clock.seconds < 60 &&
            typeof this.code === 'object' &&
            typeof this.code.code0 === 'number' &&
            this.code.code0 >= 0 &&
            this.code.code0 < 10 &&
            typeof this.code.code1 === 'number' &&
            this.code.code1 >= 0 &&
            this.code.code1 < 10
        );
    }
}
