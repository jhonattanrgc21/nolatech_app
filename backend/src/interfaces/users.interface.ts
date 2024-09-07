import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Manager" | "Employee";
  createdAt?: Date;
  updatedAt?: Date;
}
