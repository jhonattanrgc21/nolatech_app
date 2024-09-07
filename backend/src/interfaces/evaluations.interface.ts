import { Types, Document } from "mongoose";

export interface IEvaluation extends Document {
  _id: Types.ObjectId;
  employee: Types.ObjectId;
  evaluator: Types.ObjectId;
  feedbacks: Types.ObjectId[];
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
