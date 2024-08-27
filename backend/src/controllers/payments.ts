import { Request, Response } from "express";
import { Controller, ControllerType } from "../types";
import {
    addPayment,
    getPayments,
} from "../services/payments";
import { environment } from "../services/environment";

export const paymentsGet: Controller = {
    path: "/payments",
    type: ControllerType.GET,
    func: (req: Request, res: Response) => {
        const payments = getPayments();
        res.json(payments);
    },
};

export const paymentsPost: Controller = {
    path: "/payments",
    type: ControllerType.POST,
    func: (req: Request, res: Response) => {
        const { name, amount, bias } = req.body;
        if (!name || !amount) {
            res.status(400).send(
                "Name and amount are required"
            );
            return;
        }

        // Get current seconds
        const now = new Date();
        const clock = {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };

        try {
            // Add payment
            const payment = addPayment(
                { name, amount },
                {
                    rows: environment.grid.rows,
                    cols: environment.grid.cols,
                    seconds: clock.seconds,
                    bias,
                }
            );

            res.json(payment);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    },
};
