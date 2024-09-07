import { Types, Document } from 'mongoose';

export interface IDepartment extends Document {
  _id: Types.ObjectId; 
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}