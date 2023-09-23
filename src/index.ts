import { ServerConfig } from "./config/server.config";
import EnvConfig from "./config/env.config";
import cors from "cors";
import helmet from "helmet";
import { RouterV1 } from "./interface/v1";

async function main(): Promise<void> {
  const PORT = EnvConfig.PORT || 3000;
  const server = new ServerConfig({
    port: PORT,
    routers: [RouterV1],
    middlewares: [cors(), helmet()],
  });
  server.listen();
}

main();
