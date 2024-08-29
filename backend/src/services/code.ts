import { Code, Grid } from '../types';

export function getCode(grid: Grid, character1: string, character2: string): Code {
    if (!validBias(character1) || !validBias(character2)) throw new Error('Invalid character');

    let count0 = 0,
        count1 = 0;
    for (let i = 0; i < grid.length; i++) {
        const line = grid[i];
        for (let j = 0; j < line.length; j++) {
            const value = grid[i][j];
            if (value === character1) count0++;
            if (value === character2) count1++;
        }
    }

    let finalCount0 = count0;
    let divideCount0 = 1;
    while (finalCount0 > 9) {
        finalCount0 = Math.floor(count0 / divideCount0);
        divideCount0++;
    }

    let finalCount1 = count1;
    let divideCount1 = 1;
    while (finalCount1 > 9) {
        finalCount1 = Math.floor(count1 / divideCount1);
        divideCount1++;
    }

    return {
        code0: finalCount0,
        code1: finalCount1,
    };
}

export function getCharacter(grid: Grid, position: { x: number; y: number }): string {
    if (position.x < 0 || position.y < 0) {
        throw new Error('Invalid position.');
    }
    if (position.y >= grid.length) {
        throw new Error('Invalid position.');
    }
    if (position.x >= grid[position.y].length) {
        throw new Error('Invalid position.');
    }
    return grid[position.y][position.x];
}

export function separateDigits(number: number): {
    digit0: number;
    digit1: number;
} {
    if (number > 99) {
        throw new Error('Input must be a two-digit number.');
    }

    const digit0 = Math.floor(number / 10);
    const digit1 = number % 10;

    return { digit0, digit1 };
}

export function validBias(bias: string): boolean {
    if (bias === '' || bias === undefined) return true;
    if (bias.length !== 1) return false;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.includes(bias.toUpperCase());
}
