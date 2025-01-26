import { Express } from "express";
import { buildLogger } from "../config";

class Server {
  constructor(private readonly app: Express) {}

  async start(port: number) {
    const logger = buildLogger("server.ts");

    this.app.listen(port, () => {
      logger.log(`Server running at http://localhost:${port}`);
    });
  }
}

export { Server };
