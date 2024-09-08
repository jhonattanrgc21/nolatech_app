import { Document, Types } from "mongoose";

export interface IPosition extends Document {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  departmentId: Types.ObjectId; 
  createdAt?: Date;
  updatedAt?: Date;
}
