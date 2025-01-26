import express from "express";

import { Server } from "./presentation/server";
import routes from "./routes";
import { envs } from "./config/envs";

const app = express();

app.use(express.json());
app.use(routes);

const server = new Server(app);

server.start(envs.PORT);
