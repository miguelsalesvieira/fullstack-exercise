import settings from "../../../settings.json";

export const environment = {
    backend: {
        host: settings.backend.host,
        port: settings.backend.port,
    },
    frontend: {
        host: settings.frontend.host,
        port: settings.frontend.port,
    },
    grid: {
        rows: settings.grid.rows,
        cols: settings.grid.cols,
    },
};
