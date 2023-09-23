import { DataSource } from "typeorm";
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
export const AppDataSource = new DataSource({
  type: "mysql",
  host: EnvConfig.MYSQL_HOST,
  port: parseInt(EnvConfig.MYSQL_PORT, 10),
  username: EnvConfig.MYSQL_USER,
  password: EnvConfig.MYSQL_PASS,
  database: EnvConfig.MYSQL_NAME,
  entities: [],
  migrations: ["dist/infrastructure/db/migration/*.js"],
  synchronize: false,
  logging: false,
});
