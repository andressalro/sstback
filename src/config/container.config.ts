import "reflect-metadata";
import fs from "fs";
import path from "path";
import { container } from "tsyringe";
import { PostValidateAnomaly } from "../application/anomaly/usecases/postValidateAnomaly";
import { GetAnomalyStatistics } from "../application/anomaly/usecases/getAnomalyStatistics";

const repositoriesDir = path.join(
  __dirname,
  "../infrastructure/db/repositories"
);

fs.readdirSync(repositoriesDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const repository = require(path.join(repositoriesDir, file));
    const repositoryName = Object.keys(repository)[0];
    container.register(repositoryName, {
      useClass: repository[repositoryName],
    });
  }
});

container.register("PostValidateAnomaly", { useClass: PostValidateAnomaly });
container.register("GetAnomalyStatistics", { useClass: GetAnomalyStatistics });

export { container };
