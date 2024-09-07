import { Document, Types } from "mongoose";

export interface IPosition extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
