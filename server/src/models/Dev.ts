import { Schema, model, Document } from "mongoose";

import PointSchema, { IPointSchema } from "./utils/PointSchema";

export interface IDevSchema extends Document {
  name: string;
  github_username: string;
  bio: string;
  avatar_url: string;
  techs: string[];
  location: IPointSchema;
}

const DevSchema = new Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
});

export default model<IDevSchema>("Dev", DevSchema);
