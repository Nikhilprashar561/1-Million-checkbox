import http from "node:http";

import "dotenv/config";
import { createExpress } from "./app/app.js";
import { config } from "./app/utils/config.js";

async function main() {
  try {
    const PORT: number = config.port;

    const server = http.createServer(createExpress());

    server.listen(PORT, () => {
      console.log(`Server is running on ${config.server_url}`);
    });
  } catch (error) {
    console.log("Error starting server:", error);
    throw error;
  }
}

main();
