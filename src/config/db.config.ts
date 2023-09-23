import { AppDataSource } from "../infrastructure/db/data-source";

export const connectDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};
