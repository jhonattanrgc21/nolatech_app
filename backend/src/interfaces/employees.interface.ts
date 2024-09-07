import { Document, Types } from "mongoose";

export interface IEmployee extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  firstName: string;
  lastName: string;
  position: Types.ObjectId;
  department: Types.ObjectId;
  evaluations: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
