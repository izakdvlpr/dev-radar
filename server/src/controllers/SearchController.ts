import { Request, Response } from "express";

import Dev from "../models/Dev";
import parseStringAsArray from "../utils/parseStringAsArray";

export default class SearchController {
  async index(request: Request, response: Response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs });
  }
}
