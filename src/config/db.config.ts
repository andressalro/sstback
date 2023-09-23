import { Sequelize } from "sequelize";
import EnvConfig from "./env.config";
import { ErrorHandler } from "../utils/errorHandler";

if (
  !EnvConfig.MYSQL_NAME ||
  !EnvConfig.MYSQL_USER ||
  !EnvConfig.MYSQL_PASS ||
  !EnvConfig.MYSQL_HOST ||
  !EnvConfig.MYSQL_PORT
) {
  throw new ErrorHandler(
    "Missing environment variables for the database connection"
  );
}

export const sequelize = new Sequelize(
  EnvConfig.MYSQL_NAME,
  EnvConfig.MYSQL_USER,
  EnvConfig.MYSQL_PASS,
  {
    host: EnvConfig.MYSQL_HOST,
    dialect: "mysql",
    port: parseInt(EnvConfig.MYSQL_PORT, 10),
    logging: EnvConfig.NODE_ENV === "production" ? false : console.log,
  }
);

export const connectDb = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
  } catch (error: any) {
    throw new ErrorHandler(error.message);
  }
};
