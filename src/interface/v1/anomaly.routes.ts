import { Router, Request, Response, NextFunction } from "express";
import { container } from "../../config/container.config";
import { AnomalyController } from "../../application/anomaly/anomaly.controller";

const anomalyController = container.resolve(AnomalyController);

const registerAnomalyRoutes = (router: Router): void => {
  router.get(
    "/stats",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.json(await anomalyController.getAnomalyStatistics(req, res));
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/validate-anomaly",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.json(await anomalyController.postValidateAnomaly(req, res));
      } catch (error) {
        next(error);
      }
    }
  );
};

export default registerAnomalyRoutes;
