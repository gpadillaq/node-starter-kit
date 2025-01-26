import { Express } from "express";

class Server {
  constructor(private readonly app: Express) {}

  async start(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
}

export { Server };
