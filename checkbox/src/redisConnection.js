import { Redis } from "ioredis";

function redisConnection() {
  return new Redis({
    host: "localhost",
    port: "6379",
  });
}

const redis = redisConnection();

const publisher = redisConnection();

const subscriber = redisConnection();

export { redis, publisher, subscriber };
