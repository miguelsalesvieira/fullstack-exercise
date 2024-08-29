import { Express } from 'express';
import { Controller } from '../types';
import { gridGet } from './grid';
import { paymentsGet, paymentsPost } from './payments';

export const routes: Controller[] = [gridGet, paymentsGet, paymentsPost];

export function addRoutes(app: Express) {
    routes.forEach((route) => {
        app[route.type](route.path, route.func);
    });
}
