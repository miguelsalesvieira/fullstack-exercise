import { describe, expect, test } from "@jest/globals";
import { validBias } from "./code";
import { generateGrid, generateRandomLetter } from "./grid";

describe("Grid", () => {
    describe("generateRandomLetter", () => {
        test("should generate random letter", () => {
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            expect(letters).toContain(
                generateRandomLetter()
            );
        });
    });

    describe("generateGrid", () => {
        test("should have correct length", () => {
            const grid = generateGrid(10, 3);
            expect(grid).toHaveLength(10);
            expect(grid[0]).toHaveLength(3);
            expect(grid[1]).toHaveLength(3);
        });

        test("should contain only alphabet letters", () => {
            const grid = generateGrid(10, 10);
            grid.forEach((row) => {
                row.forEach((cell) => {
                    expect(validBias(cell)).toBe(true);
                });
            });
        });

        test("should contain 20% of bias", () => {
            const size = 10;
            const grid = generateGrid(size, size, "A");
            grid.forEach((row) => {
                row.forEach((cell) => {
                    expect(validBias(cell)).toBe(true);
                });
            });

            const biasedCellCount = Math.floor(
                size * size * 0.2
            );
            const biasCount = grid
                .flat()
                .filter((cell) => cell === "A").length;

            expect(biasCount).toBeGreaterThanOrEqual(
                biasedCellCount
            );
        });
    });
});
