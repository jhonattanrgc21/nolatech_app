import { Schema, model } from "mongoose";
import { IPosition } from "../interfaces/positions.interface";

const positionSchema = new Schema<IPosition>(
  {
    name: { type: String, trim: true, required: true, unique: true },
    description: { type: String, trim: true },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  { timestamps: true }
);

export const Position = model<IPosition>("Position", positionSchema);
