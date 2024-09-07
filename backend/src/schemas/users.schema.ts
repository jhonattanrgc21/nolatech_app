import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/users.interface";

const userSchema = new Schema<IUser>(
  {
    username: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
