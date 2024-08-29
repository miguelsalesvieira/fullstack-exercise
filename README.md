# Fullstack Exercise

A simple fullstack system exercise made using `Node` and `Angular`.

## Getting started

To run the whole application in `development` mode, simply start the frontend application by running:

```bash
npm run dev:frontend # or yarn dev:frontend
```

and then start the server with:

```bash
npm run dev:backend # or yarn dev:backend
```

## Testing

You can run all the front end unit test by with:

```bash
npm run test:frontend # or yarn test:frontend
```

and for the backend:

```bash
npm run test:backend # or yarn test:backend
```

## Production

> [!WARNING]  
> This feature is not implemented. It is missing the architecture to change the values for production.

To run the system in production, firt build everything by running:

```bash
npm run build:frontend # or yarn build:frontend
npm run build:backend # or yarn build:backend
```

This will create a `dist` folder with all the built code to run in production.

To serve the files, simply run:

```bash
npm run start:frontend # or yarn start:frontend
npm run start:backend # or yarn start:backend
```

## Settings

You can change all of the system's setting in the `settings.json` file.

| Property               | Description                                                                        |
| ---------------------- | ---------------------------------------------------------------------------------- |
| backend.http.host      | Host URL for the backend using HTTP                                                |
| backend.http.port      | Port for the backend using HTTP                                                    |
| backend.websocket.host | Host URL for the backend using Websockets                                          |
| backend.websocket.port | Port for the backend using Websockets                                              |
| frontend.host          | Host URL for the frontend                                                          |
| frontend.port          | Port for the frontend                                                              |
| grid.cols              | Number of columns for the grid generation                                          |
| grid.rows              | Number of rows for the grid generation                                             |
| intervals.reconnect    | Time interval for the frontend to reconnect to the backend (in milliseconds)       |
| intervals.heartbeat    | Time interval for the backend to check for alive clients (in milliseconds)         |
| intervals.grid         | Time interval to generate and send grid to all connected clients (in milliseconds) |
| intervals.bias         | Time interval to allow to change the grid's bias (in milliseconds)                 |

## Architecture

How the system is structured

```
project
│   README.md
│   settings.json
│   package.json
│
└─── frontend
│   │   ...
│   └─── src
│       │ ...
│       └─── app
│           │ components -> folder to store all the frontend components
│           │ pages -> folder for all the frontend pages
│           │ services -> responsible for the logic to communicate with the backend
│           │ ...
│
└─── backend
    │   ...
    └─── src
        │ controllers -> responsible for all the HTTP requests to the server
        │ dtos -> responsible for handling the data types and parsing between frontend and backend
        │ services -> responsible for handling all of the internal business logic.
        │ types.ts -> stores all of the types available in the system
        │ ...

```

## Tech Stack

A list of all the technologies used in building this system.

-   `Angular` : framework for the frontend application.
-   `Tailwind`: CSS post process tool for facilitating stylings.
-   `Node`: Runtime for the backend.
-   `Express`: Framework to create server application.
-   `Jest`: Testing framework to handle all the system's testing.
-   `WS`: Library to create websocket connections.
-   `CORS`: Library to handle the CORS for the requests.

## Missing features

Some features were not possible to be implemented due to lack of time:

-   Add environment variables for development and production.
-   Dockerize the frontend and backend and create docker compose files to facilitate the CI/CD
-   Create pipeline by using github actions to first run all the unit test on different machines and versions. Only if the tests passed, then we would run the docker compose files to deploy everything correctly.
