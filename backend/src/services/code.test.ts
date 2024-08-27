import { describe, expect, test } from "@jest/globals";
import {
    getCharacter,
    getCode,
    separateDigits,
    validBias,
} from "./code";
import { Grid } from "../types";

describe("Code", () => {
    describe("separateDigits", () => {
        test("should separate digits", () => {
            expect(separateDigits(23)).toStrictEqual({
                digit0: 2,
                digit1: 3,
            });
        });
        test("should separate 1 digit numbers", () => {
            expect(separateDigits(4)).toStrictEqual({
                digit0: 0,
                digit1: 4,
            });
        });
        test("should separate 0", () => {
            expect(separateDigits(0)).toStrictEqual({
                digit0: 0,
                digit1: 0,
            });
        });
        test("should throw error on more than two digit numbers", () => {
            expect(() =>
                separateDigits(100)
            ).toThrowError();
        });
    });

    describe("getCharacter", () => {
        test("should get correct character", () => {
            const grid: Grid = [
                ["A", "B", "C"],
                ["D", "E", "F"],
            ];

            expect(getCharacter(grid, { x: 0, y: 0 })).toBe(
                "A"
            );
            expect(getCharacter(grid, { x: 1, y: 0 })).toBe(
                "B"
            );
            expect(getCharacter(grid, { x: 2, y: 0 })).toBe(
                "C"
            );
            expect(getCharacter(grid, { x: 0, y: 1 })).toBe(
                "D"
            );
            expect(getCharacter(grid, { x: 1, y: 1 })).toBe(
                "E"
            );
            expect(getCharacter(grid, { x: 2, y: 1 })).toBe(
                "F"
            );
        });

        test("should throw error if outside grid", () => {
            const grid: Grid = [
                ["A", "B", "C"],
                ["D", "E", "F"],
            ];
            expect(() =>
                getCharacter(grid, { x: 4, y: 4 })
            ).toThrowError();
            expect(() =>
                getCharacter(grid, { x: -4, y: 4 })
            ).toThrowError();
            expect(() =>
                getCharacter(grid, { x: 4, y: -4 })
            ).toThrowError();
            expect(() =>
                getCharacter(grid, { x: -4, y: -4 })
            ).toThrowError();
        });
    });

    describe("getCode", () => {
        const grid: Grid = [
            ["A", "B", "C"],
            ["D", "E", "F"],
            ["D", "A", "C"],
        ];

        test("should generate correct code if different", () => {
            expect(getCode(grid, "A", "E")).toStrictEqual({
                code0: 2,
                code1: 1,
            });
        });

        test("should generate correct code if equal", () => {
            expect(getCode(grid, "A", "A")).toStrictEqual({
                code0: 2,
                code1: 2,
            });
        });

        test("should return zero if not present", () => {
            expect(getCode(grid, "Z", "R")).toStrictEqual({
                code0: 0,
                code1: 0,
            });
        });

        test("should not return a code greater than 9", () => {
            const grid1: Grid = [
                ["A", "A", "A", "A"],
                ["A", "A", "A", "A"],
                ["A", "A", "A", "A"],
                ["A", "A", "A", "A"],
            ];
            expect(getCode(grid1, "A", "R")).toStrictEqual({
                code0: 8,
                code1: 0,
            });

            const grid2: Grid = [
                ["R", "R", "R", "R", "R", "R"],
                ["R", "R", "R", "R", "R", "R"],
                ["R", "R", "R", "R", "R", "R"],
                ["R", "R", "R", "R", "R", "R"],
                ["R", "R", "R", "R", "R", "R"],
                ["R", "R", "R", "R", "R", "R"],
            ];
            expect(getCode(grid2, "A", "R")).toStrictEqual({
                code0: 0,
                code1: 9,
            });
        });

        test("should throw error if not from alphabet", () => {
            expect(() =>
                getCode(grid, "LO", "R")
            ).toThrowError();
            expect(() =>
                getCode(grid, "L", "?")
            ).toThrowError();
        });
    });

    describe("validBias", () => {
        test("should accept uppercase alphabet letters", () => {
            expect(validBias("A")).toBe(true);
            expect(validBias("Z")).toBe(true);
        });
        test("should accept lowercase alphabet letters", () => {
            expect(validBias("a")).toBe(true);
            expect(validBias("b")).toBe(true);
        });
        test("should not accept empty string", () => {
            expect(validBias("")).toBe(false);
        });
        test("should not accept more than one character", () => {
            expect(validBias("aa")).toBe(false);
            expect(validBias("AA")).toBe(false);
            expect(validBias("aZ")).toBe(false);
            expect(validBias("Az")).toBe(false);
        });
    });
});
