import {
  createAdapter as createRedisAdapter,
  createShardedAdapter as createRedisShardedAdapter,
} from "@socket.io/redis-adapter";
import { createAdapter as createRedisStreamsAdapter } from "@socket.io/redis-streams-adapter";
import type { ServerOptions } from "socket.io";
import { client, pubClient, subClient } from "./redis";

let adapter: ServerOptions["adapter"] | undefined;

switch (process.env.ADAPTER) {
  case "redis":
    adapter = createRedisAdapter(pubClient, subClient);
    break;
  case "redis-sharded":
    adapter = createRedisShardedAdapter(pubClient, subClient);
    break;
  case "redis-streams":
    adapter = createRedisStreamsAdapter(client);
    break;
  default:
    adapter = undefined;
    break;
}

export { adapter };
