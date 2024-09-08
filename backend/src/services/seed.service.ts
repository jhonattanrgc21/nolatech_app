import { User } from "../schemas/users.schema";
import { Employee } from "../schemas/employees.schema";
import { Feedback } from "../schemas/feedbacks.schema";
import { Evaluation } from "../schemas/evaluations.schema";
import { Role } from "../schemas/roles.schema";
import { Department } from "../schemas/departaments.schema";
import { Position } from "../schemas/positions.schema";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

export const seedDatabase = async () => {
  try {
    // Limpiar las colecciones antes de insertar nuevos datos
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Feedback.deleteMany({});
    await Evaluation.deleteMany({});
    await Role.deleteMany({});
    await Department.deleteMany({});
    await Position.deleteMany({});

    // Insertar roles
    const roles = [
      { name: "Admin" },
      { name: "Manager" },
      { name: "Employee" },
    ];
    const insertedRoles = await Role.insertMany(roles);
    console.log("Roles seeded successfully.");

    // Insertar departamentos
    const departments = [
      { name: "IT" },
      { name: "HR" },
      { name: "Finance" },
      { name: "Marketing" },
      { name: "Sales" },
    ];
    const insertedDepartments = await Department.insertMany(departments);
    console.log("Departments seeded successfully.");

    // Crear posiciones con departamentos asignados
    const positions = [
      { name: "Software Engineer", departmentId: insertedDepartments[0]._id },
      { name: "Frontend Developer", departmentId: insertedDepartments[0]._id },
      { name: "Backend Developer", departmentId: insertedDepartments[0]._id },
      { name: "HR Manager", departmentId: insertedDepartments[1]._id },
      { name: "Financial Analyst", departmentId: insertedDepartments[2]._id },
      { name: "Marketing Manager", departmentId: insertedDepartments[3]._id },
      { name: "Sales Manager", departmentId: insertedDepartments[4]._id },
    ];
    const insertedPositions = await Position.insertMany(positions);
    console.log("Positions seeded successfully.");

    // Crear usuarios con hash de contraseñas
    const salt = await bcrypt.genSalt(10);
    const users = [
      {
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", salt),
        roleId: insertedRoles[0]._id,
      },
      {
        email: "manager@example.com",
        password: await bcrypt.hash("manager123", salt),
        roleId: insertedRoles[1]._id,
      },
      {
        email: "employee@example.com",
        password: await bcrypt.hash("employee123", salt),
        roleId: insertedRoles[2]._id,
      },
    ];
    const insertedUsers = await User.insertMany(users);
    console.log("Users seeded successfully.");

    // Crear empleados asignando usuarios y posiciones
    const employees = [
      {
        userId: insertedUsers[0]._id, // Admin User
        firstName: "John",
        lastName: "Doe",
        positionId: insertedPositions[0]._id, // Software Engineer
        departmentId: insertedDepartments[0]._id, // IT
      },
      {
        userId: insertedUsers[1]._id, // Manager User
        firstName: "Jane",
        lastName: "Smith",
        positionId: insertedPositions[1]._id, // Frontend Developer
        departmentId: insertedDepartments[0]._id, // IT
      },
      {
        userId: insertedUsers[2]._id, // Employee User
        firstName: "Michael",
        lastName: "Johnson",
        positionId: insertedPositions[2]._id, // Backend Developer
        departmentId: insertedDepartments[0]._id, // IT
      },
    ];
    const insertedEmployees = await Employee.insertMany(employees);
    console.log("Employees seeded successfully.");

    // Crear evaluaciones
    const evaluations = [
      {
        employeeId: insertedEmployees[0]._id, // John Doe
        evaluatorId: insertedEmployees[1]._id, // Jane Smith
        score: 5,
        initDate: new Date(),
        feedbacks: [] as Types.ObjectId[],
      },
      {
        employeeId: insertedEmployees[1]._id, // Jane Smith
        evaluatorId: insertedEmployees[0]._id, // John Doe
        score: 4,
        initDate: new Date(),
        feedbacks: [] as Types.ObjectId[],
      },
    ];
    const insertedEvaluations = await Evaluation.insertMany(evaluations);
    console.log("Evaluations seeded successfully.");

    // Crear feedbacks y asignar a evaluaciones
    const feedbacks = [
      {
        evaluationId: insertedEvaluations[0]._id, // Evaluación de John Doe
        comments: "Great work on the project.",
      },
      {
        evaluationId: insertedEvaluations[1]._id, // Evaluación de Jane Smith
        comments: "Needs improvement on communication.",
      },
    ];
    const insertedFeedbacks = await Feedback.insertMany(feedbacks);

    // Asociar feedbacks a las evaluaciones
    insertedEvaluations[0].feedbacks.push(insertedFeedbacks[0]._id);
    insertedEvaluations[1].feedbacks.push(insertedFeedbacks[1]._id);
    await insertedEvaluations[0].save();
    await insertedEvaluations[1].save();

    console.log("Feedbacks seeded successfully.");
    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
