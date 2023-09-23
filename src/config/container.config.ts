import "reflect-metadata"; // Importante: requerido por Tsyringe
import { container } from "tsyringe";
import { PostValidateAnomaly } from "../application/anomaly/usecases/postValidateAnomaly";
import { GetAnomalyStatistics } from "../application/anomaly/usecases/getAnomalyStatistics";

container.register("PostValidateAnomaly", { useClass: PostValidateAnomaly });
container.register("GetAnomalyStatistics", { useClass: GetAnomalyStatistics });

export { container };
