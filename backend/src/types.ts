import { Request, Response } from "express";

export enum ControllerType {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
}

export type Controller = {
    path: string;
    type: ControllerType;
    func: (req: Request, res: Response) => void;
};

export type Grid = string[][];

export type Code = {
    code0: number;
    code1: number;
};

export type Payment = {
    name: string;
    amount: number;
    code: Code;
    grid: Grid;
};
