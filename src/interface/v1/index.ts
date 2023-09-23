import { Router } from "express";
import registerAnomalyRoutes from "./anomaly.routes";

const router = Router();

registerAnomalyRoutes(router);

interface RouterConfig {
  baseUrl: string;
  router: Router;
}

export const RouterV1: RouterConfig = {
  baseUrl: "/api/v1",
  router,
};
