import { Schema, model } from "mongoose";
import { IEvaluation } from "../interfaces/evaluations.interface";

const evaluationSchema = new Schema<IEvaluation>(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true},
    evaluatorId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
    score: { type: Number, trim: true, min: 1, max: 5, required: true },
    initDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export const Evaluation = model<IEvaluation>("Evaluation", evaluationSchema);
