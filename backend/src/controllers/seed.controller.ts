import { Request, Response } from "express";
import { seedDatabase } from "../services/seed.service";

export const seed = async (req: Request, res: Response) => {
  try {
    await seedDatabase();
    res.status(200).json({ message: "Database seeded successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error seeding database" });
  }
};
