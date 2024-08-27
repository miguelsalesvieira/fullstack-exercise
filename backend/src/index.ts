import express from "express";
import cors from "cors";
import { addRoutes } from "./controllers";
import { environment } from "./services/environment";

export const app = express();
app.use(
    express.json(),
    cors({
        origin: `${environment.frontend.host}:${environment.frontend.port}`,
    })
);
addRoutes(app);

// Start the server
app.listen(environment.backend.port, () => {
    console.log(
        `Server is running on ${environment.backend.host}:${environment.backend.port}`
    );
});
