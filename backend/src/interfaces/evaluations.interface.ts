import { Types, Document } from "mongoose";

export interface IEvaluation extends Document {
  _id: Types.ObjectId;
  employeeId: Types.ObjectId;
  evaluatorId: Types.ObjectId;
  feedbacks?: Types.ObjectId[];
  score: number;
  initDate: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
