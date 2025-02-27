import { RedisStore, instrument } from "@socket.io/admin-ui";
import { Server } from "socket.io";
import { redis } from "./redis";

export function instrumentServer(io: Server) {
  instrument(io, {
    auth: {
      type: "basic",
      username: process.env.INSTRUMENT_USERNAME,
      password: process.env.INSTRUMENT_PASSWORD,
    },
    namespaceName: "admin",
    mode: process.env.NODE_ENV,
    store: new RedisStore(redis),
  });
}
