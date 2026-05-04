import http from "http";
import expresss from "express";
import path from "node:path";
import { Server } from "socket.io";
import { publisher, subscriber, redis } from "./redisConnection.js";
import 'dotenv/config'

const CHECK_SIZE = 500;
const CHECKBOX_STATE_KEY = "checkbox-state:v1";

const rateLimitingHashMap = new Map();


async function main() {
  const app = expresss();
  const server = http.createServer(app);

  const PORT = process.env.PORT ?? 3000;

  const io = new Server();
  io.attach(server);

  await subscriber.subscribe("internal-server:checkbox:change");

  subscriber.on("message", (channel, message) => {
    if (channel === "internal-server:checkbox:change") {
      const { index, checked } = JSON.parse(message);
      // state.checkbox[index] = checked;
      io.emit("server:checkbox:change", { index, checked });
    }
  });

  io.on("connection", (Socket) => {

    Socket.on("client:checkbox:change", async (data) => {

      const lastOperationTime = rateLimitingHashMap.get(Socket.id);
      const rateLimiter = await redis.get(`rate-limiting:${Socket.id}`)

      if(lastOperationTime){
        const timeElapsed = Date.now() - lastOperationTime;
        if(timeElapsed < 5.5 * 1000){
            Socket.emit('server:error', {error: 'Please wait'})
            return;
        }
      }
      await redis.set(`rate-limiting:${Socket.id}`, Date.now())


      const existingState = await redis.get(CHECKBOX_STATE_KEY);
      if (existingState) {
        const remoteData = JSON.parse(existingState);
        remoteData[data.index] = data.checked;
        await redis.set(CHECKBOX_STATE_KEY, JSON.stringify(remoteData));
      } else {
        await redis.set(
          CHECKBOX_STATE_KEY,
          JSON.stringify(new Array(CHECK_SIZE).fill(false)),
        );
      }

      await publisher.publish(
        "internal-server:checkbox:change",
        JSON.stringify(data),
      );
    });
  });

  app.use(expresss.static(path.resolve("./public")));

  app.get("/health", (req, res) => {
    return res.status(200).json({ message: true });
  });

  app.get("/checkboxes", async (req, res) => {
    const existingState = await redis.get(CHECKBOX_STATE_KEY);
    if (existingState) {
      const remoteData = JSON.parse(existingState);
      return res.json({ checkboxes: remoteData });
    }
    return res.json({ checkboxes: new Array(CHECK_SIZE).fill(false) });
  });

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
