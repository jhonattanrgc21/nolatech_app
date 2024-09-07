import { Schema, model } from "mongoose";
import { IEvaluation } from "../interfaces/evaluations.interface";

const evaluationSchema = new Schema<IEvaluation>(
  {
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true},
    evaluator: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    feedbacks: [{ type: Schema.Types.ObjectId, ref: "Feedback" }],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Evaluation = model<IEvaluation>("Evaluation", evaluationSchema);
