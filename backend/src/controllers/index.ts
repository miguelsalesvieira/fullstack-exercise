import { Express } from "express";
import { Controller } from "../types";
import { gridGet, gridPost } from "./grid";

export const routes: Controller[] = [gridGet, gridPost];

export function addRoutes(app: Express) {
    routes.forEach((route) => {
        app[route.type](route.path, route.func);
    });
}
