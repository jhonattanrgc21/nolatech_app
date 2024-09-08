import { Document, Types } from "mongoose";

export interface IFeedback extends Document {
  _id: Types.ObjectId;
  evaluationId: Types.ObjectId;
  comments: string;
  createdAt?: Date;
  updatedAt?: Date;
}
