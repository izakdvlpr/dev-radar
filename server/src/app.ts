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
  .connect(
    "mongodb+srv://omnistack:omnistack@cluster0.9ur76.mongodb.net/week10?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("> Banco de dados conectado"));

app.use(cors());
app.use(express.json());
app.use(routes);

export default server;
