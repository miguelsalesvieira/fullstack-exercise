import { Request, Response } from "express";
import { Controller, ControllerType } from "../types";
import { generateGrid } from "../services/grid";
import {
    getCharacter,
    getCode,
    separateDigits,
    validBias,
} from "../services/code";
import { environment } from "../services/environment";

let bias = "";

export const gridGet: Controller = {
    path: "/grid",
    type: ControllerType.GET,
    func: (req: Request, res: Response) => {
        // Get current seconds
        const now = new Date();
        const clock = {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };

        // Generate grid
        const grid = generateGrid(
            environment.grid.rows,
            environment.grid.cols,
            bias
        );

        // Get the grid's characters from the seconds
        const { digit0, digit1 } = separateDigits(
            clock.seconds
        );
        const character1 = getCharacter(grid, {
            x: digit0,
            y: digit1,
        });
        const character2 = getCharacter(grid, {
            x: digit1,
            y: digit0,
        });

        // Get the code for the characters
        const code = getCode(grid, character1, character2);

        res.json({
            grid,
            code,
            clock,
        });
    },
};

export const gridPost: Controller = {
    path: "/grid",
    type: ControllerType.POST,
    func: (req: Request, res: Response) => {
        const newBias = req.body.bias;
        if (!newBias) {
            res.json({ bias: "" });
            return;
        }
        if (validBias(newBias)) {
            bias = newBias;
            res.json({ bias });
        } else {
            res.status(400).json({
                error: "Invalid bias",
                bias,
            });
        }
    },
};
