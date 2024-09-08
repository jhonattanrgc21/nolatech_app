import { Document, Types } from "mongoose";

export interface IEmployee extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  positionId: Types.ObjectId;
  departmentId: Types.ObjectId;
  evaluations?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
