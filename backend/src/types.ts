import { Request, Response } from 'express';
import { DTO } from './dtos';

export enum ControllerType {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
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

export enum WebsocketMessageType {
    PING = 'ping',
    GRID = 'grid',
    PAYMENT = 'payment',
    ERROR = 'error',
}

export interface WebsocketMessage {
    type: WebsocketMessageType;
    data: DTO;
}

export type Clock = {
    hours: number;
    minutes: number;
    seconds: number;
};

export type SavedBias = {
    bias: string;
    time: Date;
};
