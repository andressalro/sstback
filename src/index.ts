import { ServerConfig } from "./config/server.config";
import EnvConfig from "./config/env.config";
import {
  devMiddleware,
  prodMiddleware,
} from "./middleware/errorHandling.middleware";
import cors from "cors";
import helmet from "helmet";

async function main(): Promise<void> {
  const PORT = EnvConfig.PORT || 3000;

  const errorHandlingMiddleware: any =
    EnvConfig.NODE_ENV === "development" ? devMiddleware : prodMiddleware;

  const server = new ServerConfig({
    port: PORT,
    routers: [],
    middlewares: [errorHandlingMiddleware, cors(), helmet()],
  });
  server.listen();
}

main();
