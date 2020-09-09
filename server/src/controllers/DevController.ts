import axios from "axios";
import { Request, Response } from "express";

import Dev from "../models/Dev";

import parseStringAsArray from "../utils/parseStringAsArray";

import { findConnections, sendMessage } from "../websocket";

export default class DevController {
  async index(request: Request, response: Response) {
    const devs = await Dev.find();

    return response.json(devs);
  }

  async store(request: Request, response: Response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  }
}
