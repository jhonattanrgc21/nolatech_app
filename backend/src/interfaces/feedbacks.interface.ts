import { Document, Types } from "mongoose";

export interface IFeedback extends Document {
  _id: Types.ObjectId;
  evaluationId: Types.ObjectId;
  comments: string;
  score: number;
  createdAt?: Date;
  updatedAt?: Date;
}
