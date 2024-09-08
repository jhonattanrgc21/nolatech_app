import { Schema, model } from "mongoose";
import { IFeedback } from "../interfaces/feedbacks.interface";

const feedbackSchema = new Schema<IFeedback>(
  {
    evaluationId: {
      type: Schema.Types.ObjectId,
      ref: "Evaluation",
      required: true,
    },
    comments: { type: String, trim: true, required: true },
    score: { type: Number, trim: true, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
