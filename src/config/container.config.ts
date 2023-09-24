import "reflect-metadata";
import fs from "fs";
import path from "path";
import { container } from "tsyringe";
import { PostValidateAnomaly } from "../application/anomaly/usecases/postValidateAnomaly";
import { GetAnomalyStatistics } from "../application/anomaly/usecases/getAnomalyStatistics";
import { GetTest } from "../application/anomaly/usecases/getTest";

const repositoriesDir = path.join(
  __dirname,
  "../infrastructure/db/repositories"
);

const servicesDir = path.join(__dirname, "../services");

fs.readdirSync(repositoriesDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const repository = require(path.join(repositoriesDir, file));
    const repositoryName = Object.keys(repository)[0];
    container.register(repositoryName, {
      useClass: repository[repositoryName],
    });
  }
});

fs.readdirSync(servicesDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const service = require(path.join(servicesDir, file));
    const serviceName = Object.keys(service)[0];
    container.register(serviceName, {
      useClass: service[serviceName],
    });
  }
});

container.register("PostValidateAnomaly", { useClass: PostValidateAnomaly });
container.register("GetAnomalyStatistics", { useClass: GetAnomalyStatistics });
container.register("GetTest", { useClass: GetTest });

export { container };
