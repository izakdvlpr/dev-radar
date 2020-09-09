import socketio, { Server } from "socket.io";
import http from "http";

import parseStringAsArray from "./utils/parseStringAsArray";
import calculateDistance from "./utils/calculateDistance";
import { IDevSchema } from "./models/Dev";

let io: Server;

interface IConnection {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  techs: any;
}

const connections: IConnection[] = [];

function setupWebsocket(server: http.Server) {
  io = socketio(server);

  io.on("connection", (socket) => {
    const { latitude, longitude, techs } = socket.handshake.query;

    connections.push({
      id: socket.id,
      coordinates: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });
  });
}

function findConnections(
  coordinates: {
    latitude: number;
    longitude: number;
  },
  techs: string | any[]
) {
  return connections.filter((connection) => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some((item: any) => techs.includes(item))
    );
  });
}

function sendMessage(to: any[], message: string | symbol, data: IDevSchema) {
  to.forEach((connection: { id: string }) => {
    io.to(connection.id).emit(message, data);
  });
}

export { setupWebsocket, findConnections, sendMessage };
