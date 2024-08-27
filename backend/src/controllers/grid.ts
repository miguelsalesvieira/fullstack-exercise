import { Request, Response } from "express";
import { Controller, ControllerType } from "../types";
import { generateGridWithCode } from "../services/grid";
import { validBias } from "../services/code";
import { environment } from "../services/environment";

export const gridGet: Controller = {
    path: "/grid",
    type: ControllerType.GET,
    func: (req: Request, res: Response) => {
        const bias = req.query.bias as string | undefined;

        // Check if bias is valid if it exists
        if (bias && !validBias(bias)) {
            res.status(400).send("Invalid bias");
            return;
        }

        // Get current seconds
        const now = new Date();
        const clock = {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };

        // Generate grid with code
        const { grid, code } = generateGridWithCode(
            environment.grid.rows,
            environment.grid.cols,
            clock.seconds,
            bias
        );

        res.json({
            grid,
            code,
            clock,
        });
    },
};
