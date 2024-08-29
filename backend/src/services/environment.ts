import settings from '../../../settings.json';

export const environment = {
    backend: {
        http: {
            host: settings.backend.http.host,
            port: settings.backend.http.port,
        },
        websocket: {
            host: settings.backend.websocket.host,
            port: settings.backend.websocket.port,
        },
    },
    frontend: {
        host: settings.frontend.host,
        port: settings.frontend.port,
    },
    grid: {
        rows: settings.grid.rows,
        cols: settings.grid.cols,
    },
    intervals: {
        grid: settings.intervals.grid,
        heartbeat: settings.intervals.heartbeat,
        bias: settings.intervals.bias,
    },
};
