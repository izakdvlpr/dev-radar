import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";

import routes from "./routes";
import { setupWebsocket } from "./websocket";

const app = express();
const server = new http.Server(app);

setupWebsocket(server);

mongoose
  .connect(String(process.env.MONGO_URL), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("> Banco de dados conectado"));

app.use(cors());
app.use(express.json());
app.use(routes);

export default server;
