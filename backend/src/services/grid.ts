import { Grid } from "../types";
import { validBias } from "./code";

export function generateRandomLetter(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[
        Math.floor(Math.random() * letters.length)
    ];
}

export function generateGrid(
    rows: number,
    cols: number,
    bias?: string
): Grid {
    const grid = [];
    const totalCells = rows * cols;

    if (bias) {
        if (!validBias(bias)) {
            throw new Error("Invalid bias");
        }

        const biasedCellCount = Math.floor(
            totalCells * 0.2
        ); // 20% of total cells
        const letters = [];

        // Add biased letters (20% of the grid)
        for (let i = 0; i < biasedCellCount; i++) {
            letters.push(bias.toUpperCase());
        }

        // Add random letters to fill the rest of the grid (80% of the grid)
        for (let i = biasedCellCount; i < totalCells; i++) {
            letters.push(generateRandomLetter());
        }

        // Shuffle the letters array to randomize the position of the biased letters
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [
                letters[j],
                letters[i],
            ];
        }

        // Create the grid by assigning letters to cells
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(letters[i * cols + j]);
            }
            grid.push(row);
        }
    } else
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(generateRandomLetter());
            }
            grid.push(row);
        }

    return grid;
}
