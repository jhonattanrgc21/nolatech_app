// controllers/evaluations.controller.ts
import { Request, Response } from "express";
import { create, findById, update } from "../services/evaluation.service";

export const createEvaluation = async (req: Request, res: Response) => {
  try {
    const evaluation = await create(req.body);
    res.status(201).json({evaluation});
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const getEvaluationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evaluation = await findById(id);
    res.status(200).json({message: 'Registro creado con exito', evaluation});
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const updateEvaluation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedEvaluation = await update(id, req.body);
    res.status(200).json({message: 'Registro actualizado con exito', updatedEvaluation});
  } catch (error: any) {
    res.status(error.status || 500).json({ message: error.message });
  }
};