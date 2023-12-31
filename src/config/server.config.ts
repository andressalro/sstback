import Express, { Request, Response, NextFunction } from "express";
import EnvConfig from "./env.config";
import { RequestHandler } from "express-serve-static-core";
import { NotFoundError } from "../utils/notFoundError";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "js-yaml";
import {
  devMiddleware,
  prodMiddleware,
} from "../middleware/errorHandling.middleware";

interface Router {
  baseUrl: string;
  router: Express.Router;
}

interface ServerConfigOptions {
  port: number | string;
  middlewares?: Express.RequestHandler[];
  routers?: Router[];
}
export class ServerConfig {
  private app: Express.Application;

  constructor(options: ServerConfigOptions) {
    const { port, middlewares, routers } = options;
    this.app = Express();
    this.app.set("env", EnvConfig.NODE_ENV);
    this.app.set("port", port);
    this.registerJSONMiddleware();
    this.registerSwagger();

    middlewares?.forEach((middleware) => {
      this.registerMiddleware(middleware);
    });

    routers?.forEach(({ baseUrl, router }) => {
      this.registerRouter({ baseUrl, router });
    });

    this.app.get("/", (req, res, next) => {
      res.json({
        message: "Server working",
      });
    });

    this.registerMiddleware(
      (req: Request, res: Response, next: NextFunction) => {
        const err = new NotFoundError("Not Found", 404);
        next(err);
      }
    );
    this.registerErrorHandling();
  }

  get port() {
    return this.app.get("port");
  }

  set port(number) {
    this.app.set("port", number);
  }

  registerMiddleware(middleware: RequestHandler) {
    this.app.use(middleware);
    return this;
  }

  registerRouter(options: Router) {
    const { baseUrl, router } = options;
    this.app.use(baseUrl, router);
    return this;
  }

  registerJSONMiddleware() {
    this.registerMiddleware(Express.json({ limit: "30mb" }));
    return this;
  }

  registerSwagger() {
    const swaggerDocument = yaml.load(
      fs.readFileSync("./swagger.yaml", "utf8")
    );

    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument as any)
    );
  }

  registerErrorHandling() {
    const errorHandlingMiddleware: any =
      EnvConfig.NODE_ENV === "development" ? devMiddleware : prodMiddleware;

    this.registerMiddleware(errorHandlingMiddleware);
    return this;
  }

  async listen(): Promise<void> {
    try {
      this.app.listen(this.port, () => {
        console.log(`Listening on port: ${this.port}`);
      });
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }
  }
}
