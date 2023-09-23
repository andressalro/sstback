import { DataSource } from "typeorm";
import EnvConfig from "../../config/env.config";
import { ErrorHandler } from "../../utils/errorHandler";
import { Anomaly } from "./entity/Anomaly";

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
  entities: [Anomaly],
  migrations: ["dist/infrastructure/db/migration/*.js"],
  synchronize: false,
  logging: true,
});
