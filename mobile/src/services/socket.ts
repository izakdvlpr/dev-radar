import socketio from "socket.io-client";

import { API_URL } from "../config";

import { IDev } from '../pages/Main'

const socket = socketio(API_URL, {
  autoConnect: false,
});

function subscribeToNewDevs(subcribeFunction: (dev: IDev) => void) {
  socket.on("new-dev", subcribeFunction);
}

function connect(latitude: number, longitude: number, techs: string) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };

  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect, subscribeToNewDevs };
