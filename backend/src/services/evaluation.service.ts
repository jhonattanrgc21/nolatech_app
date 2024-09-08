import { Types } from "mongoose";
import { Employee } from "../schemas/employees.schema";
import { Evaluation } from "../schemas/evaluations.schema";
import { Feedback } from "../schemas/feedbacks.schema";

// Función para validar la existencia de un empleado
const validateEmployeeExists = async (employeeId: string) => {
  const employee = await Employee.findById(employeeId).exec();
  if (!employee) {
    throw { status: 400, message: "Error, el empleado no está registrado" };
  }
};

// Función para crear feedbacks
const createFeedbacks = async (feedbacks: any[], evaluationId: Types.ObjectId) => {
  const feedbackIds = [];
  for (const feedback of feedbacks) {
    const newFeedback = await Feedback.create({
      ...feedback,
      evaluationId,
    });
    feedbackIds.push(newFeedback._id);
  }
  return feedbackIds;
};

// Función para actualizar feedbacks existentes
const updateFeedbacks = async (feedbacks: any[], evaluationId: Types.ObjectId) => {
  const feedbackIds = [];
  for (const feedback of feedbacks) {
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedback._id, {
      comments: feedback.comments,
    }, { new: true }).exec();
    if (updatedFeedback) {
      feedbackIds.push(updatedFeedback._id);
    }
  }
  return feedbackIds;
};

export const create = async (data: any) => {
  try {
    // Validar existencia de empleado y evaluador
    await validateEmployeeExists(data.employeeId);
    await validateEmployeeExists(data.evaluatorId);

    // Crear evaluación
    const evaluation = new Evaluation({
      ...data,
      feedbacks: [], // Inicialmente sin feedbacks
    });
    const savedEvaluation = await evaluation.save();

    // Crear feedbacks y asociarlos con la evaluación
    if (data.feedbacks) {
      const feedbackIds = await createFeedbacks(data.feedbacks, savedEvaluation._id);
      savedEvaluation.feedbacks = feedbackIds;
      await savedEvaluation.save();
    }

    return savedEvaluation;
  } catch (error: any) {
    throw { status: 500, message: error.message || "Error al registrar la evaluación" };
  }
};

export const findById = async (id: string) => {
  try {
    return await Evaluation.findById(id)
      .populate("employeeId")
      .populate("evaluatorId")
      .populate("feedbacks")
      .exec();
  } catch (error) {
    throw { status: 500, message: "Error al obtener la evaluación" };
  }
};

export const update = async (id: string, updateData: any) => {
  try {

    // Actualizar la evaluación
    const evaluation = await findById(id);
    if (!evaluation) {
      throw { status: 404, message: "Evaluación no encontrada" };
    }

    // Validar existencia de empleado y evaluador
    if(updateData.employeeId) await validateEmployeeExists(updateData.employeeId);
    if(updateData.evaluatorId) await validateEmployeeExists(updateData.evaluatorId);
    

    // Actualizar campos de la evaluación
    Object.assign(evaluation, updateData);

    // Crear feedbacks nuevos y actualizar feedbacks existentes
    let feedbackIds = [];
    if (updateData.feedbacks) {
      const feedbacksToUpdate = updateData.feedbacks.filter((fb: any) => fb._id);
      const feedbacksToCreate = updateData.feedbacks.filter((fb: any) => !fb._id);

      feedbackIds = [
        ...(await updateFeedbacks(feedbacksToUpdate, evaluation._id)),
        ...(await createFeedbacks(feedbacksToCreate, evaluation._id)),
      ];

      // Actualizar feedbacks en la evaluación
      evaluation.feedbacks = feedbackIds;
    }

    await evaluation.save();

    return evaluation;
  } catch (error: any) {
    throw { status: 500, message: error.message || "Error al actualizar la evaluación" };
  }
};